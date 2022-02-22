const Command = require("../Command.js");

module.exports = class DefaultCommand extends Command {
  
  constructor(client) {
    super(client, {
      name: 'defaultcommand',
      aliases: ['defcmd', 'cmddef'],
      usage: 'defaultcommand <args>',
      description: `Default description`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['defaultcommand hmm'],
      master: true
    });
  }
  
  async execute(message, args) {
    
  }
   
}