const Command = require("../Command.js");

module.exports = class GlobalBan extends Command {
  
  constructor(client) {
    super(client, {
      name: 'globalban',
      aliases: ['gban', 'globan'],
      usage: 'globalban <username/ID>',
      description: `Prohibits the user from the use of the bot globally`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['globalban 608673444061773827'],
      master: true
    });
  }
  
  async execute(message, args) {
    try {

      const user = await this.client.utils.resolveUser(message, args);
      if (!user || user.id == message.member.id) {
        return message.channel.send("Could not find the user.")
      }
      const id = user.user.id;
      
      let reason = this.client.utils.sanitize(args.join(" "));
      
      args.shift();
      let result = await this.client.utils.query(`INSERT INTO Bans (server, global, user, banned_by, reason) VALUES ('${message.guild.id}', 1, '${id}', '${message.author.id}', '${reason}');`);

      message.reply(`<@${id}> is globally banned from the bot usage.`);
      return;

    } catch (e) {
      console.log(e);
      if (e.name === "SequelizeUniqueConstraintError") {
        message.reply("That user already is globally banned from the bot usage.");
        return;
      }
      return e;
    }
  }
   
}