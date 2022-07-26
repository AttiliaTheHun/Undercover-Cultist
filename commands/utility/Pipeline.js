const Command = require("../Command.js");

module.exports = class Pipeline extends Command {
  
  constructor(client) {
    super(client, {
      name: 'pipeline',
      aliases: ['pip'],
      syntax: 'pipeline <command1> | <command2>',
      description: `Allows bash-like command pipelining`,
      category: client.categories.UTILITY,
      clientPermissions: [],
      userPermissions: [],
      examples: ['pipeline gen 1 | setnick'],
      master: true
    });
  }
  
  async execute(message, args) {
    
  }
   
}