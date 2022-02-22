const Command = require("../Command.js");

module.exports = class LocalBan extends Command {
  
  constructor(client) {
    super(client, {
      name: 'localban',
      aliases: ['lban', 'locban'],
      usage: 'localban <username/ID>',
      description: `Prohibits the user from the use of the bot inside this server`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['localban 608673444061773827'],
      master: true
    });
  }
  
  async execute(message, args) {
    
  }
   
}