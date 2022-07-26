const Command = require("../Command.js");

module.exports = class Credits extends Command {
  
  constructor(client) {
    super(client, {
      name: 'credits',
      aliases: ['about', 'info', 'botinfo'],
      syntax: 'credits',
      description: `Shows info about the bot`,
      category: client.categories.INFORMATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['credits'],
      master: false
    });
  }
  
  async execute(message, args) {
     const creationDate = new Date(message.client.user.createdAt);
     const creationDateString = creationDate.getDate() + ". " + (creationDate.getMonth() + 1) + ". " + creationDate.getFullYear();
     

    const embed = this.client.utils.buildEmbed({
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
          value: await this.client.utils.getConfig('version'),
          inline: true
        },
        {
          name: "Invite",
          value: `[link](${await this.client.utils.getConfig('bot_invite_link')})`,
          inline: true
        },
        {
          name: "Support Server",
          value: `[link](${await this.client.utils.getConfig('support_server_invite_link')})`,
          inline: true
        },
        {
          name: "Source Code",
          value: `[link](${await this.client.utils.getConfig('source_code_link')})`,
          inline: true
        },
        {
          name: "Created",
          value: creationDateString,
          inline: true
        },
        {
          name: "Servers",
          value: `${message.client.guilds.cache.size}`,
          inline: true
        },
        {
          name: "IQ",
          value: "69",
          inline: true
        }
      ],
      timestamp: "",
	    footer: {
		    text: message.client.user.tag
	    }
    });
    try {
     

      message.channel.send({embeds: [embed]});


    } catch (err) {
      console.log(err);
      return err;

    }
    
  }
   
}