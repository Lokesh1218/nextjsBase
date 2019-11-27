var isLocalStorageSupported = localStorageTest();
var TruebilStorage = {};
const window = typeof window !== 'undefined' ? window : {};

TruebilStorage.setItem = function(key, value) {
  if (typeof key === 'undefined' || typeof value === 'undefined') {
    console.error("Uncaught TypeError: Failed to execute 'setItem' on 'Storage': 2 arguments required");
  } else {
      if (isLocalStorageSupported) {
        return localStorage.setItem(key, value);
      } else {
        // Use Trubil Local Storage
        var truebilStorage = {};
        truebilStorage[key] = value;
        window.name = JSON.stringify(truebilStorage);
        return true;
      }
  }  
};

TruebilStorage.getItem = function(key) {
  if (typeof key === 'undefined') {
    console.error("Uncaught TypeError: Failed to execute 'getItem' on 'Storage': 1 arguments required");
  } else {
    if (isLocalStorageSupported) {
      return localStorage.getItem(key);
    } else {
      // Use Trubil Local Storage
      var truebilStorage = {};
      return typeof truebilStorage[key] === "undefined" ? null : truebilStorage[key];
    }
  }  
};

TruebilStorage.hasOwnProperty = function(key) {
  if (typeof key === 'undefined') {
    console.error("Uncaught TypeError: Failed to execute 'getItem' on 'Storage': 1 arguments required");
  } else {
    if (isLocalStorageSupported) {
      return localStorage.hasOwnProperty(key);
    } else {
      return false;
    }
  }  
};

TruebilStorage.removeItem = function(key) {
  if (typeof key === 'undefined') {
    console.error("Uncaught TypeError: Failed to execute 'removeItem' on 'Storage': 1 arguments required");
  } else {
    if (isLocalStorageSupported) {
      return localStorage.removeItem(key);
    } else {
      // Use Trubil Local Storage
      var truebilStorage = window.name === "" ? {} : JSON.parse(window.name);
      if (truebilStorage[key]) {
        delete truebilStorage[key];  
        window.name = JSON.stringify(truebilStorage);
        return true;
      } else {
        return undefined;
      }
    }
  }  
};

TruebilStorage.clear = function() {
  if (isLocalStorageSupported) {
    return localStorage.clear();
  } else {
    window.name = "";
  }
};

function localStorageTest() {
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    return true;
  } catch(e) {
    return false;
  }
};

export default TruebilStorage;