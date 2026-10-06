import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {
  CATEGORY_NEED,
  CATEGORY_WANT,
  RECURRING_KINDS,
  TYPE_EXPENSE,
  TYPE_INCOME,
} from '../Constants';
import {formatDateDayMedium, formatDateMonth} from '../utils/dates';
import expensesReducer from './reducers/expensesReducer';

/**
 * Interface to the bare-bones AsyncStorage store.
 */
class Storage {
  async clear() {
    return AsyncStorage.clear();
  }

  async set(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log('error storing value: ', key, value, e);
    }
  }

  async setObject(key, object) {
    try {
      // Need to serialize objects before storing.
      await this.set(key, JSON.stringify(object));
    } catch (e) {
      console.log('error storing object: ', key, object, e);
    }
  }

  async get(key) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('error reading store value: ', key, e);
    }
  }

  async getAllKeys() {
    return AsyncStorage.getAllKeys();
  }

  async getObject(key, reducer = undefined) {
    try {
      const value = await this.get(key);
      if (value === null) {
        return null;
      }
      let parsedValue = JSON.parse(value);
      if (reducer !== undefined) {
        parsedValue = reducer(parsedValue);
      }
      return parsedValue;
    } catch (e) {
      console.log('error reading store object: ', key, e);
    }
  }
}

const store = new Storage();

/**
 * Implementation of the interactions specific to this application.
 */
class StorageInterface {
  /**
   * Empties the whole store.
   * @returns {Promise<*>}
   */
  async clearAll() {
    return store.clear();
  }
  /**
   * Adds an expense/income to the list of items for the same date that exist in the
   * store. Maintains descending temporal ordering on the items for a given date.
   * @param entry {object} - Details of the expense to save.
   * @returns {Promise<void>}
   */
  async addEntry(entry) {
    const date = entry.date; // native JS date.
    // Convert native date to storage key for the month.
    const monthKey = formatDateMonth(date);
    const dateKey = formatDateDayMedium(date);
    // Get the data that exists for this month.
    const monthData = await store.getObject(monthKey);
    let newMonthData = _.cloneDeep(monthData) || {};
    if (_.isNull(monthData)) {
      newMonthData[dateKey] = [entry];
    } else {
      const existingDateEntries = _.orderBy(monthData[dateKey] || [], 'date');
      const insertionIndex = _.sortedIndexBy(existingDateEntries, entry, 'date');
      existingDateEntries.splice(insertionIndex, 0, entry);
      newMonthData[dateKey] = _.orderBy(existingDateEntries, 'date', ['desc']);
    }
    return store.setObject(monthKey, newMonthData);
  }

  /**
   * Given an expense/income, remove that entry from the store.
   *
   * @param entry
   * @returns {Promise<void>}
   */
  async removeEntry(entry) {
    if (_.isUndefined(entry)) {
      return;
    }
    const date = entry.date; // native JS date.
    // Convert native date to storage key for the month.
    const monthKey = formatDateMonth(date);
    const dateKey = formatDateDayMedium(date);
    // Get the data that exists for this month.
    const monthData = await store.getObject(monthKey);
    let newMonthData = _.cloneDeep(monthData) || {};
    const existingDateEntries = monthData[dateKey] || [];
    _.remove(existingDateEntries, e => e.date === date);
    newMonthData[dateKey] = existingDateEntries;
    return store.setObject(monthKey, newMonthData);
  }

  /**
   * Given an expense/income, store it in the store and remove the previous version. Identifies entries
   * uniquely based on their native JS date field, because I find it unlikely two entries
   * can have the same millisecond precision creation date.
   *
   * @param entry
   * @returns {Promise<void>}
   */
  async editEntry(entry) {
    await this.removeEntry(entry);
    // Add the updated entry to the store.
    return this.addEntry(entry);
  }

  /**
   * Returns the expense/income entries for the month represented by the given date.
   *
   * @param date {Date} - a native javascript date to pull the entries for.
   * @returns {Promise<void>}
   */
  async getEntriesForMonth(date) {
    const monthKey = formatDateMonth(date);
    return store.getObject(monthKey, expensesReducer);
  }

  /**
   * Serializes every month and the recurring items into a JSON backup string.
   *
   * @returns {Promise<string>}
   */
  async exportAll() {
    const keys = _.filter(await store.getAllKeys(), isMonthKey);
    const months = {};
    for (const key of keys) {
      months[key] = await store.getObject(key);
    }
    return JSON.stringify({
      app: BACKUP_APP,
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      months,
      recurring: await this.getRecurring(),
    });
  }

  /**
   * Parses a backup string produced by exportAll, throwing if it isn't a valid backup.
   *
   * @param json {string}
   * @returns {{months: object, recurring: object|null}} - recurring is null for version 1 backups.
   */
  parseBackup(json) {
    let backup;
    try {
      backup = JSON.parse(json);
    } catch (e) {
      throw new Error('Not valid JSON.');
    }
    if (
      !_.isPlainObject(backup) ||
      backup.app !== BACKUP_APP ||
      !_.includes(SUPPORTED_BACKUP_VERSIONS, backup.version)
    ) {
      throw new Error('Not a budget app backup.');
    }
    if (!_.isPlainObject(backup.months) || !_.every(_.keys(backup.months), isMonthKey)) {
      throw new Error('Backup has malformed month data.');
    }
    _.forEach(backup.months, month => {
      if (!_.isPlainObject(month)) {
        throw new Error('Backup has malformed month data.');
      }
      _.forEach(month, entries => {
        if (!_.isArray(entries) || !_.every(entries, isValidEntry)) {
          throw new Error('Backup has malformed entries.');
        }
      });
    });
    const recurring = backup.recurring ?? null;
    if (recurring !== null && !isValidRecurringConfig(recurring)) {
      throw new Error('Backup has malformed recurring items.');
    }
    return {months: backup.months, recurring};
  }

  /**
   * Merges a parsed backup into the store. Entries and recurring items already present are skipped,
   * nothing is ever removed.
   *
   * @param backup {object} - Output of parseBackup.
   * @returns {Promise<{entries: number, recurring: number}>} - The number of each added.
   */
  async importBackup({months, recurring}) {
    const entries = await this.importMonths(months);
    if (recurring === null) {
      return {entries, recurring: 0};
    }
    const config = await this.getRecurring();
    const existingIds = new Set(_.map(config.items, 'id'));
    const newItems = _.reject(recurring.items, i => existingIds.has(i.id));
    _.forEach(recurring.applied, (ids, monthKey) => {
      config.applied[monthKey] = _.union(config.applied[monthKey] || [], ids);
    });
    await store.setObject(RECURRING_KEY, {...config, items: [...config.items, ...newItems]});
    return {entries, recurring: newItems.length};
  }

  async importMonths(months) {
    let added = 0;
    for (const [monthKey, backupMonth] of _.toPairs(months)) {
      const existingMonth = (await store.getObject(monthKey)) || {};
      const existingDates = new Set(
        _.flatMap(_.values(existingMonth), entries => _.map(entries, 'date')),
      );
      const newMonth = _.cloneDeep(existingMonth);
      _.forEach(backupMonth, (entries, dateKey) => {
        const newEntries = _.reject(entries, e => existingDates.has(e.date));
        if (_.isEmpty(newEntries)) {
          return;
        }
        added += newEntries.length;
        newMonth[dateKey] = _.orderBy([...(newMonth[dateKey] || []), ...newEntries], 'date', [
          'desc',
        ]);
      });
      await store.setObject(monthKey, newMonth);
    }
    return added;
  }

  /**
   * @returns {Promise<{items: object[], applied: Object<string, string[]>}>} - applied maps a
   * 'YYYY-MM' month to the ids of items already added (or skipped) that month.
   */
  async getRecurring() {
    return (await store.getObject(RECURRING_KEY)) || {items: [], applied: {}};
  }

  /**
   * Creates or updates a recurring item. Doesn't touch entries already added from it.
   *
   * @param item {{id?: string, kind: string, description: string, amount: number, day: number}}
   * @returns {Promise<object>} - The saved item, with its id.
   */
  async saveRecurringItem(item) {
    const config = await this.getRecurring();
    const saved = {...item, id: item.id || newId()};
    const index = _.findIndex(config.items, {id: saved.id});
    if (index === -1) {
      config.items.push(saved);
    } else {
      config.items[index] = saved;
    }
    await store.setObject(RECURRING_KEY, config);
    return saved;
  }

  async deleteRecurringItem(id) {
    const config = await this.getRecurring();
    _.remove(config.items, {id});
    return store.setObject(RECURRING_KEY, config);
  }

  /**
   * Marks an item as already handled for the month of the given date, so it isn't added then.
   */
  async skipRecurringForMonth(id, date = new Date()) {
    const config = await this.getRecurring();
    const monthKey = recurringMonthKey(date);
    config.applied[monthKey] = _.union(config.applied[monthKey] || [], [id]);
    return store.setObject(RECURRING_KEY, config);
  }

  async unskipRecurringForMonth(id, date = new Date()) {
    const config = await this.getRecurring();
    const monthKey = recurringMonthKey(date);
    config.applied[monthKey] = _.without(config.applied[monthKey] || [], id);
    return store.setObject(RECURRING_KEY, config);
  }

  /**
   * Adds every recurring item whose day has arrived this month and that hasn't been added (or
   * skipped) this month yet. Only ever touches the current month. Concurrent calls share one run so
   * items can't be added twice.
   *
   * @returns {Promise<number>} - The number of entries added.
   */
  applyRecurring(now = new Date()) {
    if (!this.applyingRecurring) {
      this.applyingRecurring = this.applyRecurringNow(now).finally(() => {
        this.applyingRecurring = null;
      });
    }
    return this.applyingRecurring;
  }

  async applyRecurringNow(now) {
    const config = await this.getRecurring();
    const monthKey = recurringMonthKey(now);
    const applied = config.applied[monthKey] || [];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const due = _.filter(
      config.items,
      i => !_.includes(applied, i.id) && Math.min(i.day, lastDay) <= now.getDate(),
    );
    for (const item of due) {
      const day = Math.min(item.day, lastDay);
      const date = await this.unusedEntryDate(new Date(now.getFullYear(), now.getMonth(), day));
      await this.addEntry({
        date,
        ...KIND_FIELDS[item.kind],
        amount: item.amount,
        description: item.description,
        recurringId: item.id,
      });
      applied.push(item.id);
    }
    config.applied = _.pickBy(
      {...config.applied, [monthKey]: applied},
      (_ids, key) => key >= recurringMonthKey(moment(now).subtract(1, 'month')),
    );
    await store.setObject(RECURRING_KEY, config);
    return due.length;
  }

  /**
   * Entries are identified by their ISO date, so bump the milliseconds until it's unique.
   */
  async unusedEntryDate(date) {
    const month = (await store.getObject(formatDateMonth(date))) || {};
    const taken = new Set(_.flatMap(_.values(month), entries => _.map(entries, 'date')));
    const candidate = new Date(date);
    while (taken.has(candidate.toISOString())) {
      candidate.setMilliseconds(candidate.getMilliseconds() + 1);
    }
    return candidate.toISOString();
  }
}

const BACKUP_APP = 'com.budgetapp';
const BACKUP_VERSION = 2;
const SUPPORTED_BACKUP_VERSIONS = [1, 2];
const RECURRING_KEY = 'recurring';

const KIND_FIELDS = {
  need: {type: TYPE_EXPENSE, category: CATEGORY_NEED},
  want: {type: TYPE_EXPENSE, category: CATEGORY_WANT},
  income: {type: TYPE_INCOME},
};

const recurringMonthKey = date => moment(date).format('YYYY-MM');

const newId = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

const isMonthKey = key => moment(key, 'MMM YYYY', true).isValid();

const isValidEntry = e =>
  _.isPlainObject(e) &&
  _.isString(e.date) &&
  !_.isNaN(Date.parse(e.date)) &&
  _.includes([TYPE_INCOME, TYPE_EXPENSE], e.type) &&
  (_.isNumber(e.amount) || _.isNull(e.amount));

const isValidRecurringItem = i =>
  _.isPlainObject(i) &&
  _.isString(i.id) &&
  _.includes(RECURRING_KINDS, i.kind) &&
  _.isString(i.description) &&
  _.isNumber(i.amount) &&
  _.isInteger(i.day) &&
  i.day >= 1 &&
  i.day <= 31;

const isValidRecurringConfig = r =>
  _.isPlainObject(r) &&
  _.isArray(r.items) &&
  _.every(r.items, isValidRecurringItem) &&
  _.isPlainObject(r.applied) &&
  _.every(r.applied, ids => _.isArray(ids) && _.every(ids, _.isString));

const si = new StorageInterface();
// Singleton interface.
export default si;
