const Command = require("../Command.js");

module.exports = class Pipeline extends Command {
  
  constructor(client) {
    super(client, {
      name: 'pipeline',
      aliases: ['pip'],
      usage: 'pipeline <command1> | <command2>',
      description: `Allows bash-like command pipelining`,
      type: client.types.UTILITY,
      userPermissions: [],
      examples: ['pipeline gen 1 | setnick'],
      master: true
    });
  }
  
  async execute(message, args) {
    
  }
   
}