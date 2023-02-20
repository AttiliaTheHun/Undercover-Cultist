const Command = require("../Command.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Texture extends Command {
  
  constructor(client) {
    super(client, {
      name: 'texture',
      aliases: [],
      syntax: 'texture <WinScreen/LoseScreen/Cardback>',
      description: `Sends back target texure`,
      category: client.categories.UNDERHAND,
      clientPermissions: [],
      userPermissions: [],
      examples: ['texture WinScreen'],
      master: false
    });
  }
  
  async execute(message, args) {
    //WinScreen, LoseScreen, Cardback
    const base_url = "http://underhand.clanweb.eu/res/";
    const file_extension = ".png";
    const textures = ["WinScreen", "LoseScreen", "Cardback"];
    const arg = args[0].trim();
    if (!textures.include(arg)) {
      message.channel.send({ content: "Unknown texture: typo? wrong texture command?"});
    }
    const url = base_url + arg + file_extension;
    message.channel.send({
      content: arg,
      files: [url]
    });
  }

  async backslash(interaction) {
    const texture = interaction.options.getString('texture');
    const base_url = "http://underhand.clanweb.eu/res/";
    const file_extension = ".png";
    const url = base_url + texture + file_extension;
    interaction.reply({
      content: texture,
      files: [url]
    });
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription("Sends various Underhand textures.")
                  .addStringOption(option => 
                          option.setName("texture")
                          .setDescription("Name of the texture.")
                          .setRequired(true)
                          .addChoices(
				{ name: 'WinScreen', value: 'WinScreen' },
				{ name: 'LoseScreen', value: 'LoseScreen' },
				{ name: 'Cardback', value: 'Cardback' }
			));
  }
   
}