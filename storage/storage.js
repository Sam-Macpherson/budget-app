import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
   * Adds an expense to the list of items for the same date that exist in the
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
    let newMonthData = {};
    if (_.isNull(monthData)) {
      newMonthData[dateKey] = [entry];
    } else {
      const existingDateEntries = monthData[dateKey] || [];
      newMonthData[dateKey] = [entry, ...existingDateEntries];
    }
    return store.setObject(monthKey, newMonthData);
  }

  /**
   * Returns the expense/income entries for the month represented by the given date.
   * @param date {Date} - a native javascript date to pull the entries for.
   * @returns {Promise<void>}
   */
  async getEntriesForMonth(date) {
    const monthKey = formatDateMonth(date);
    return store.getObject(monthKey, expensesReducer);
  }
}

const si = new StorageInterface();
// Singleton interface.
export default si;
