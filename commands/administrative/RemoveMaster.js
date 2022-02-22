const Command = require("../Command.js");

module.exports = class RemoveMaster extends Command {
  
  constructor(client) {
    super(client, {
      name: 'removemaster',
      aliases: ['remmaster', 'delmaster', 'unmaster', 'deletemaster'],
      usage: 'removemaster <username/ID>',
      description: `Removes target user from the bot Masters group`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['removemaster 608673444061773827', 'removemaster AttilaThehUN'],
      master: true
    });
  }
  
  async execute(message, args) {
    
     let member = await this.client.utils.resolveUser(message, args);
    
    if (!member || member.id == message.member.id) {
      message.channel.send("Could not find the user.");
      return 
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