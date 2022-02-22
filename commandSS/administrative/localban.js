module.exports = {
  name: "localban",
  syntax: "localban [mention]/[id]",
  description: "Prohibits the user from the use of the bot inside this server",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["lban"],
  legend: "mention, id",
  category: "administrative",
  async execute(message, args, utils) {
    try {

      const user = await utils.resolveUser(message, args);
      if (!user || user.id == message.member.id) {
        return message.channel.send("Could not find the user.")
      }
      const id = user.user.id;
      args.shift();
      let reason = utils.sanitize(args.join(" "));
      let result = await utils.query(`INSERT INTO Bans (server, global, user, banned_by, reason) VALUES ('${message.guild.id}', false, '${id}', '${message.author.id}', '${reason}');`);

      message.reply(`<@${id}> is locally banned from the bot usage.`);
      return;

    } catch (e) {
      console.log(e);
      if (e.name === "SequelizeUniqueConstraintError") {
        message.reply("That user already locally is banned from the bot usage.");
        return;
      }
      return e;
    }
  },
};