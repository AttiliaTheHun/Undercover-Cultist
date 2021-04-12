const Discord = require("discord.js");
module.exports = {
  name: "bans",
  syntax: "bans",
  description: "Shows users prohibited from the use of the bot",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["botbans"],
  legend: "",
  category: "informative",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) {
    let where = "";
    try {
      if (args[0] == "-global") {
        where = "WHERE global = true";
      } else if (args[0] == "-local") {
        where = `WHERE server = ${message.guild.id} AND global = false`;
      } else {
        where = `WHERE  (server = ${message.guild.id} AND global = false) OR (global = true)`;
      }
      const [bans, metadata] = await sequelize.query(`SELECT * FROM Bans ${where};`)
      console.log(bans);
      if (bans) {
        if (bans.length > 0) {
          const embed = new Discord.MessageEmbed()
            .setColor("#ffbc03")
            .setTitle("Bot Bans");

          let member;
          let username;
          let id;
          let banned_by_member;
          let banned_by_username;
          let banned_by_id;
          for (let i = 0; i < bans.length; i++) {
            id = bans[i].user;
            member = message.guild.members.cache.get(id);
            username = member.user.username + "#" + member.user.discriminator;

            username += (bans[i].global) ? " Global" : " Local";
            banned_by_id = bans[i].banned_by;
            banned_by_member = message.guild.members.cache.get(banned_by_id);
            banned_by_username = banned_by_member.user.username + "#" + banned_by_member.user.discriminator;
            embed.addField(username, `**Banned By:** ${banned_by_username}\n**Reason:** ${bans[i].reason}`, false);
          }
          embed.setFooter("Undercover Cultist#5057", "");
          message.channel.send(embed);
          return undefined;

        }
      }
      message.reply("No banned users found");
      return;


    } catch (err) {
      console.log(err);
      return err;

    }

  },
};