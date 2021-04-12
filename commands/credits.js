const Discord = require("discord.js");
module.exports = {
  name: "credits",
  syntax: "credits",
  description: "Shows information about the bot",
  note: "",
  permissions: "",
  master: false,
  aliases: ["about", "info", "botinfo"],
  legend: "",
  category: "informative",
  async execute(message, args, client, Config, Masters, Bans, Notes) {

    try {
      const config = await Config.findOne({ where: { name: "version" } });
      let version = "initial";
      if (config) {
        version = config.get("value");
      }
      const embed = new Discord.MessageEmbed()
        .setColor("#ffbc03")
        .setTitle("Credits")
        .setDescription("The bot was made by AttilaTheHun#9489 for the Underhand server")
        .addField("Language", "node.js", true)
        .addField("Library", "discord.js", true)
        .addField("Version", version, true)
        .addField("Invite", "[link](https://discord.com/api/oauth2/authorize?client_id=672748100007362561&permissions=469892166&scope=bot)", true)
        .addField("Support Server", "[link](<https://discord.gg/PcS56ck>)", true)
        .addField("Source Code", "[GitHub](https://github.com/AttiliaTheHun/Undercover-Cultist)", true)
        .addField("Created", "28.5.2020", true)
        .addField("Servers", client.guilds.cache.size, true)
        .addField("IQ", "69", true)
        .setTimestamp()
        .setFooter("Undercover Cultist#5057", "");
      message.channel.send(embed);

    } catch (err) {
      console.log(err);
      return err;

    }

  },
};