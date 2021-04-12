const Discord = require("discord.js");
module.exports = {
  name: "notes",
  syntax: "notes",
  description: "Shows notes collection for the server",
  note: "Notes are **not** encrypted and are freely visible to other users.",
  permissions: "",
  master: false,
  aliases: ["shownotes"],
  legend: "",
  category: "utility",
  async execute(message, args, client, Config, Masters, Bans, Notes) {
    try {
      const notes = await Notes.findAll({ where: { server: message.guild.id }, /*raw: true*/ });
      if (notes) {
        if (notes.length > 0) {
          const embed = new Discord.MessageEmbed()
            .setColor("#ffbc03")
            .setTitle("Notes");

          let member;
          let username;
          let id;

          for (let i = 0; i < notes.length; i++) {
            id = notes[i].get("author");
            member = message.guild.members.cache.get(id);
            username = member.user.username + "#" + member.user.discriminator;
            embed.addField(username, notes[i].get("note"), false);
          }
          embed.setFooter("Undercover Cultist#5057", "");
          message.channel.send(embed);
          return undefined;

        }
      }
      message.reply(`Could not find notes for the server: ${message.guild.name}`);
      return;


    } catch (err) {
      console.log(err);
      return err;

    }

  },
};