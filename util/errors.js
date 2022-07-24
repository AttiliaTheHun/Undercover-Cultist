const utils = require('../util/utils.js');

module.exports = {
  CommandError: class CommandError extends Error {
    
    constructor(message) {
      super(message);
      this.name = 'CommandError';
    }
    
  },
  
  ConfigError: class ConfigError extends Error {
  
    constructor(message) {
      super(message);
      this.name = 'ConfigError';
    }
    
  },

  RandomError: class RandomError extends Error {
  
    constructor(message) {
      super(message);
      this.name = 'RandomError' + utils.randomNumber(0, 101);
    }
    
  }
  
}