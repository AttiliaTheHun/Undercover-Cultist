const Command = require("../Command.js");

module.exports = class GlobalUnban extends Command {
  
  constructor(client) {
    super(client, {
      name: 'globalunban',
      aliases: ['gunban', 'glunban'],
      usage: 'globalunban <username/ID>',
      description: `Removes the global ban status from the user`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['globalunban 608673444061773827'],
      master: true
    });
  }
  
  async execute(message, args) {
    const user = await this.client.utils.resolveUser(message, args);
    if (!user || user.id == message.member.id) {
      message.channel.send("Could not find the user.");
      return 
    }

    const result = await this.client.utils.query(`DELETE FROM Bans WHERE user = '${user.id}' AND global = true;`);
    if (!result) {
      message.reply("That user was not globally banned.");
      return;
    }

    message.reply("This user is no longer globally banned.");
    return;
  }
   
}