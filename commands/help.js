module.exports = {
  name: "help",
  description: "Show options within embed.",
  execute(message, args) {
    const config = require(__dirname.substr(0, __dirname.length - 8) +
      "./config.json");
    const prefix = config.prefix;
    const helpEmbed = {
      color: 0x0099ff,
      title: "List of Commands",
      url: "https://discord.js.org",
      author: {
        name:
          "Undercover Cultist" /* , 		icon_url: 'http://underhand.clanweb.eu/res/icon.png', 		url: 'https://underhand.clanweb.eu',*/
      },
      description: `Before every command use \'${prefix}\' prefix.`,
      /*thumbnail: { 		url: 'https://i.imgur.com/wSTFkRM.png',  	}, 	*/
      fields: [
        {
          name: `card (number) => \'${prefix} card 90\'`,
          value: "Sends event card specified by it's number "
        } /*		{ 			name: 'cardlist' , 			value: 'Shows a [name] (number) pair list', 			inline: false, 		}, 		{ 			name: 'option (eventNumber) (optionNumber)', 			value: 'Shows specific option for target event', 			inline: false, 		}, 		{ 			name: 'create [textTop] (costs) [textBottom] (provides)', 			value: 'Creates custom option card with given parameters. Resource values syntax example 1R2M3C0F0P1S (letters stands for 1st letters of resources names in game order)', 			inline: false, 		}, 		{ 			name: 'Yeeehe @user', 			value: 'Yeehes mentioned user. Annoying guaranteed!', 			inline: false, 		}, */
      ],
      timestamp: new Date(),
      footer: {
        text: "We could benefit from having someone on the  inside.",
        icon_url: ""
      }
    };
    message.channel.send({ embed: helpEmbed });
  }
};
