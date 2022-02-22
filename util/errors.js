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
    
  }
  
}