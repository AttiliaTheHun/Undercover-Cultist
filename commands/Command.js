module.exports = class Command {
  constructor(client, options) {
    if(!this.validateOptions(options)){
      throw new client.errors.CommandError("Corrupted command options");
    }
    
    
    this.client = client;
    
    this.name = options.name;
    
    this.aliases = options.aliases || [];
    
    this.syntax = options.syntax;
    
    this.description = options.description;
    
    this.category = options.category;
    
    this.clientPermissions = options.clientPermissions;
    
    this.userPermissions = options.userPermissions;
    
    this.master = options.master;
    
    
    
  }
  
  execute(message, args) {
    throw new this.client.errors.CommandError("Empty command, stop wasting my computing powers");
  }
  
  validateOptions(options) {
    return true;
  }
};