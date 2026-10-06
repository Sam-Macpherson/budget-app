import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {TYPE_EXPENSE, TYPE_INCOME} from '../Constants';
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
   * Serializes every month in the store into a JSON backup string.
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
    });
  }

  /**
   * Parses a backup string produced by exportAll, throwing if it isn't a valid backup.
   *
   * @param json {string}
   * @returns {object} - The month data keyed by month key.
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
      backup.version !== BACKUP_VERSION
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
    return backup.months;
  }

  /**
   * Merges backup month data into the store. Entries already present (same date) are skipped,
   * nothing is ever removed.
   *
   * @param months {object} - Output of parseBackup.
   * @returns {Promise<number>} - The number of entries added.
   */
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
}

const BACKUP_APP = 'com.budgetapp';
const BACKUP_VERSION = 1;

const isMonthKey = key => moment(key, 'MMM YYYY', true).isValid();

const isValidEntry = e =>
  _.isPlainObject(e) &&
  _.isString(e.date) &&
  !_.isNaN(Date.parse(e.date)) &&
  _.includes([TYPE_INCOME, TYPE_EXPENSE], e.type) &&
  (_.isNumber(e.amount) || _.isNull(e.amount));

const si = new StorageInterface();
// Singleton interface.
export default si;
