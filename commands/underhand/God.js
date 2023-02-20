const Command = require("../Command.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports = class God extends Command {
  
  constructor(client) {
    super(client, {
      name: 'god',
      aliases: [],
      syntax: 'god <0-7><thumbnail>',
      description: `Sends god texture or thumbnail`,
      category: client.categories.UNDERHAND,
      clientPermissions: [],
      userPermissions: [],
      examples: ['god 0', 'god 2 thumbnail'],
      master: false
    });
  }
  
  async execute(message, args) {
     if ((args[0] < 1 || args[0] > 7) && !isNaN(args[0])) {
      throw new message.client.errors.UserInputError("Only integers in range from 1 to 7 included or Strings are accepted.");
    }

    const gods = [null,
                  "God of Beginnings",
                  "Rhybaax",
                  "Wiindigoo",
                  "Jhai'Ti",
                  "Kekujira",
                  "Yacare",
                  "Uhl'Uht'C"
                 ];
    let god = null;
    if (!isNaN(args[0])) {
      god = gods[args[0]];
    } else {
      for (let i = 1; i < gods.length; i++) {
        if (args[0].toLowerCase() == gods[i].toLowerCase()) {
          god = gods[i];
          break;
        }
      }
    }
    let url = god, name = god;
    if(god == "Jhai'Ti") {
      url = "Jhai'lungr";
    }else if(god == "Uhl'Uht'C") {
      url = "Uhl'uht'c";
    }
    if (args[1] != null) {
      name += " Thumbnail";
      url += "Thumbnail";
    }
    message.channel.send({ 
      content: `${name}`,
      files: [`http://underhand.clanweb.eu/res/${url}.png`]
    });
  }

   async backslash(interaction) {
    const gods = ["God of Beginnings",
                  "Rhybaax",
                  "Wiindigoo",
                  "Jhai'Ti",
                  "Kekujira",
                  "Yacare",
                  "Uhl'Uht'C"
                 ];

    const thumbnail = interaction.options.getBoolean('thumbnail')
    const god = interaction.options.getString('god');
    
    let url = god, name = god;
    if(god == "Jhai'Ti") {
      url = "Jhai'lungr";
    }else if(god == "Uhl'Uht'C") {
      url = "Uhl'uht'c";
    }
    if (thumbnail) {
      name += " Thumbnail";
      url += "Thumbnail";
    }
    interaction.reply({ 
      content: `${name}`,
      files: [`http://underhand.clanweb.eu/res/${url}.png`]
    });
  }
  
  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription("Sends god textures and thumbnails")
                  .addStringOption(option => 
                          option.setName("god")
                          .setDescription("The god .")
                          .setRequired(true)
                          .addChoices(
				{ name: 'God of Beginnings', value: 'God of Beginnings' },
				{ name: 'Rhybaax', value: 'Rhybaax' },
				{ name: 'Wiindigoo', value: 'Wiindigoo' },
        { name: 'Jhai\'Ti', value: 'Jhai\'Ti' },
				{ name: 'Kekujira', value: 'Kekujira' },
				{ name: 'Yacare', value: 'Yacare' },
        { name: 'Uhl\'Uht\'C', value: 'Uhl\'Uht\'C' }
			))
                          .addBooleanOption(option => 
                          option.setName("thumbnail")
                          .setDescription("Send a thumbnail instead of full scale art?"));
  }
   
}