module.exports = class Command {
  constructor (client, options) {
    if(!this.validateOptions(options)){
      throw new client.errors.ConfigError("Corrupted command options");
    }
    
    
    this.client = client;
    
    this.name = options.name;
    
    this.aliases = options.aliases;
    
    this.syntax = options.syntax;
    
    this.description = options.description;
    
    this.category = options.category;
    
    this.clientPermissions = options.clientPermissions;
    
    this.userPermissions = options.userPermissions;

    this.examples = options.examples;
    
    this.master = options.master;
    
  }

  /** 
  * Executed in the console mode (command initiated via text message).
  */
  execute (message, args) {
    throw new this.client.errors.CommandExecutionError("Empty command, stop wasting my computing powers");
  }

  /** 
  * Executed when running as a slash command.
  */
  backslash (interaction) {
    throw new this.client.errors.CommandExecutionError("No slash command execution definition, maybe implement?");
  }

  /** 
  * Generates the slash command definition for command registration purposes.
  */
  createDefinition() {
    return false;
    //throw new this.client.errors.CommandExecutionError("No slash command definition available.");
  }
  
  //TODO
  validateOptions (options) {
    return true;
  }
};