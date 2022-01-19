import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.log('parsed value before reducer', parsedValue);
      if (reducer !== undefined) {
        parsedValue = reducer(parsedValue);
        console.log('parsed value after reducer', parsedValue);
      }
      return parsedValue;
    } catch (e) {
      console.log('error reading store object: ', key, e);
    }
  }
}
const store = new Storage();

export default store;
