const utils = require('../util/utils.js');

module.exports = {
  
  CommandExecutionError: class CommandExecutionError extends Error {
    
    constructor(message) {
      super(message);
      this.name = 'CommandExecutionError';
    }
    
  },

  SlashCommandExecutionError: class SlashCommandExecutionError extends Error {
    
    constructor(message) {
      super(message);
      this.name = 'SlashCommandExecutionError';
    }
    
  },
  
  ConfigError: class ConfigError extends Error {
  
    constructor(message) {
      super(message);
      this.name = 'ConfigError';
    }
    
  },

  UserPermissionError: class UserPermissionError extends Error {
  
    constructor(message) {
      super(message);
      this.name = 'UserPermissionError';
    }
    
  },

  UserInputError: class UserInputError extends Error {
  
    constructor(message) {
      super(message);
      this.name = 'UserInputError';
    }
    
  },

   SilentError: class SilentError extends Error {
  
    constructor(message) {
      super(message);
      this.name = 'SilentError';
    }
    
  },
  
  RandomError: class RandomError extends Error {
  
    constructor(message) {
      super(message);
      this.name = 'RandomError' + utils.randomNumber(0, 101);
    }
    
  }
  
}