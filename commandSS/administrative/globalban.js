module.exports = {
  name: "globalban",
  syntax: "globalban [mention]/[id]",
  description: "Prohibits the user from the use of the bot",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["gban"],
  legend: "mention, id",
  category: "administrative",
  async execute(message, args, utils) {
    try {

      const user = await utils.resolveUser(message, args);
      if (!user || user.id == message.member.id) {
        return message.channel.send("Could not find the user.")
      }
      const id = user.user.id;
      
      let reason = utils.sanitize(args.join(" "));
      
      args.shift();
      let result = await utils.query(`INSERT INTO bans (server, global, user, banned_by, reason) VALUES ('${message.guild.id}', true, '${id}', '${message.author.id}', '${result}');`);

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
  },
};