/**
 * Persist data in JSON format in to local storage via key value pairs
 * @param {*} key Key for the data set
 * @param {*} value Value of the data to be stored
 */
 const persistToStorage = (key, value) => {
  if (typeof window !== 'undefined' && localStorage !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * Retrieve data from the local storage, if date does not exist in
 * local storage, a default value may be passed and returned instead.
 * @param {*} key Key used to retrieve data
 * @param {*} defaultValue Default value to be returned if no value found
 */
const retrieveFromStorage = (key, defaultValue = null) => {
  let storage = null;

  if (typeof window !== 'undefined' && localStorage !== 'undefined') {
    storage = JSON.parse(localStorage.getItem(key));
  }

  if (storage) {
    return storage;
  }

  if (defaultValue && !storage) {
    return defaultValue;
  }

  if (!defaultValue && !storage) {
    return null;
  }
};

export { persistToStorage, retrieveFromStorage };
