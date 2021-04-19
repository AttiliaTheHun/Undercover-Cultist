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
  async execute(message, args, utils) {

    let embed = {
      title: "Credits",
      color: "#FFBC03",
      description: "The bot was made by AttilaTheHun#9489 for the Underhand server",
      fields: [
        {
          name: "Language",
          value: "Node.js",
          inline: true
        },
        {
          name: "Library",
          value: "Discord.js",
          inline: true
        },
        {
          name: "Version",
          value: await utils.getConfig('version'),
          inline: true
        },
        {
          name: "Invite",
          value: `[link](${await utils.getConfig('bot_invite_link')})`,
          inline: true
        },
        {
          name: "Support Server",
          value: `[link](${await utils.getConfig('support_server_invite_link')})`,
          inline: true
        },
        {
          name: "Source Code",
          value: `[link](${await utils.getConfig('source_code_link')})`,
          inline: true
        },
        {
          name: "Created",
          value: "28.5.2020",
          inline: true
        },
        {
          name: "Servers",
          value: message.client.guilds.cache.size,
          inline: true
        },
        {
          name: "IQ",
          value: "69",
          inline: true
        },
      ],
      timestamp: new Date(),
	    footer: {
		    text: "Undercover Cultist#5057"
	    }
    }
    try {
     
      message.channel.send(utils.buildEmbed(embed));

    } catch (err) {
      console.log(err);
      return err;

    }

  },
};