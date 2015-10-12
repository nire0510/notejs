/* global module, require */

var localStorage;

module.exports = {
  getStorage: function () {
    // Initialize localStorage:
    if (typeof localStorage === 'undefined' || localStorage === null) {
      var LocalStorage = require('node-localstorage').LocalStorage;
      localStorage = new LocalStorage(__dirname + '/storage');
    }
    return localStorage;
  }
};