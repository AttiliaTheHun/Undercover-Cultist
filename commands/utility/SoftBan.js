const Command = require("../Command.js");

module.exports = class Softban extends Command {
  
  constructor(client) {
    super(client, {
      name: 'softban',
      aliases: ['sban'],
      syntax: 'softban <username/ID>',
      description: `Bans and subsequently unbans a user, resulting in removing the user and all his messages from the server`,
      category: client.categories.UTILITY,
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      examples: ['softban 608673444061773827'],
      master: false
    });
  }
  
  async execute(message, args) {
    await this.client.commands.get('ban').execute(message, args);
    await this.client.commands.get('unban').execute(message, args);
  }
   
}