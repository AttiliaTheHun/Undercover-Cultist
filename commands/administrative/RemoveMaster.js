const Command = require("../Command.js");

module.exports = class RemoveMaster extends Command {
  
  constructor(client) {
    super(client, {
      name: 'removemaster',
      aliases: ['remmaster', 'delmaster', 'unmaster', 'deletemaster'],
      syntax: 'removemaster <username/ID>',
      description: `Removes target user from the bot Masters group`,
      category: client.categories.ADMINISTRATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['removemaster 608673444061773827', 'removemaster AttilaThehUN'],
      master: true
    });
  }
  
  async execute(message, args) {
    
     let member = await this.client.utils.resolveUser(message, args);
    
    if (!member || member.id == message.member.id) {
      throw new message.client.errors.UserInputError("Could not find the user.");
    }
    
    const result = await this.client.utils.query(`DELETE FROM Masters WHERE user = '${member.id}'`);
    if (!result) {
      message.reply("That user was not a bot Master.");
      return;
    }

    message.reply("This user is no longer a bot Master.");
    return;

  }
   
}