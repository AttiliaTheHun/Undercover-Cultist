const Command = require("../Command.js");

module.exports = class LocalUnban extends Command {
  
  constructor(client) {
    super(client, {
      name: 'localunban',
      aliases: ['lunban'],
      usage: 'localunban <username/ID>',
      description: `Removes the local ban status from the user`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['localunban 608673444061773827'],
      master: true
    });
  }
  
  async execute(message, args) {
const user = await this.client.utils.resolveUser(message, args);
    if (!user || user.id == message.author.id) {
      return message.channel.send("Could not find the user.")
    }

    const result = await this.client.utils.query(`DELETE FROM Bans WHERE user = '${user.id}' AND server = '${message.guild.id}' AND global = 0;`);
    if (!result) {
      message.reply("That user was not locally banned.");
      return;
    }

    message.reply("This user is no longer locally banned.");
    return;
  }
   
}