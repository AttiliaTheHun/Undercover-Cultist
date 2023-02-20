const Command = require("../Command.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Card extends Command {
  
  constructor(client) {
    super(client, {
      name: 'card',
      aliases: [],
      syntax: 'card <0-118>',
      description: `Sends back the target card texture`,
      category: client.categories.UNDERHAND,
      clientPermissions: [],
      userPermissions: [],
      examples: ['underhand 69'],
      master: false
    });
  }
  
  async execute(message, args) {
    if (args[0] == null) {
      throw new message.client.errors.UserInputError("You must provide an argument");
    }
    if (!isNaN(args[0]) && args[0] > 0 && args[0] < 119) {
      message.channel.send({
        content: "Card " + args[0], 
        files: ["http://underhand.clanweb.eu/res/Card" + args[0] + ".png"]
      });
    } else {
      throw new message.client.errors.UserInputError("Number range should be in between 0-119 excluded");
    }
  }

  async backslash(interaction) {
    const number = interaction.options.getInteger("card");
    interaction.reply({
        content: "Card " + number, 
        files: ["http://underhand.clanweb.eu/res/Card" + number + ".png"]
      });
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription("Sends card texture.")
                  .addIntegerOption(option => 
                            option.setName("card")
                            .setDescription("Number of the card (use /events to find out).")
                    .setMinValue(1)
                    .setMaxValue(118)
                    .setRequired(true)
                  );
  }
   
}