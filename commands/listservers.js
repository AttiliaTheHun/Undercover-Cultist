const Discord = require("discord.js");
module.exports = {
  name: "listservers",
  syntax: "listservers",
  description: "Lists all the servers the bot is in",
  note: "This can be a huge spam",
  permissions: "",
  master: true,
  aliases: [],
  legend: "",
  category: "informative",
  execute(message, args) {
    let client = message.client;
    const servers = client.guilds.cache.array();
    for (const server of servers) {
      const embed = new Discord.MessageEmbed()
        .setColor("#FFBC03")
        .addField("Name", server.name, false)
        .addField("ID", server.id, false)
        .addField("Owner", server.owner.user.username + "#" + server.owner.user.discriminator, false)
        .addField("Members", server.memberCount, false);
      message.channel.send(embed);
    }
  },
};