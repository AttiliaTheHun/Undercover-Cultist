const utils = require("../util/utils.js");
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
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) {
    try {

      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;

      const user = await utils.resolveUser(message, args);
      if (user == undefined) {
        return message.channel.send("Could not find the user.")
      }
      const id = user.user.id;
      args.shift();
      await sequelize.query(`INSERT INTO bans (server, global, user, banned_by, date, reason) VALUES ('${message.guild.id}', false, '${id}', '${message.author.id}', '${today}', '${args.join(" ")}');`);

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