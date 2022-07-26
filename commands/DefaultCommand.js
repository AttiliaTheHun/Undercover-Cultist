const Command = require("../Command.js");

module.exports = class DefaultCommand extends Command {
  
  constructor(client) {
    super(client, {
      name: 'defaultcommand',
      aliases: ['defcmd', 'cmddef'],
      syntax: 'defaultcommand <args>',
      description: `Default description`,
      category: client.categories.ADMINISTRATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['defaultcommand hmm'],
      master: true
    });
  }
  
  async execute(message, args) {
    message.client.utils.checkClientPermissions(message, this.clientPermissions, {});
    message.client.utils.checkUserPermissions(message.member, this.userPermissions);
    
  }
   
}