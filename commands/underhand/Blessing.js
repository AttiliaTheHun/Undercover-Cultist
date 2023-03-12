const Command = require("../Command.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Blessing extends Command {
  
  constructor(client) {
    super(client, {
      name: 'blessing',
      aliases: [],
      syntax: 'blessing <0-7>',
      description: `Shows blessings that belong to the target god`,
      category: client.categories.UNDERHAND,
      clientPermissions: [],
      userPermissions: [],
      examples: ['blessing 5', 'blessing kekujira'],
      master: false
    });
  }
  
  async execute(message, args) {
     if (args[0] == null) {
      message.channel.send("List of Gods:\n`1.The God of Beginnings\n2.Rhybaax\n3.Wiindigoo\n4.Jhai'Ti\n5.Kekujira\n6.Yacare\n7.Uhl'Uht'C`");
      return;
    }

    if ((args[0] < 1 || args[0] > 7) && !isNaN(args[0])) {
      throw new message.client.errors.UserInputError("IllegalArgumentException: `only integers in range from 1 to 7 included or Strings are accepted `");
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
      god = args[0].toLowerCase();
      // console.log("yes");
    } else {
      console.log(args[0])
      for (let i = 1; i < gods.length; i++) {
        if (args[0].toLowerCase() == gods[i].toLowerCase()) {
          god = i;
          break;
        }
      }
    }
    const blessings = [null, [96, 98], [21, 70], [23, 97], [112, 114], [72, 113], [38, 111], [22, 25]];
    //console.table(blessings);
    console.log(god);
    // console.log(blessings[args[0]][0])
    message.channel.send({
      content: `Blessings of ${gods[god]}`,
      files: [
        `http://underhand.clanweb.eu/res/Card${blessings[god][0]}.png`,
        `http://underhand.clanweb.eu/res/Card${blessings[god][1]}.png`
             ] 
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
    const blessings = [[96, 98], [21, 70], [23, 97], [112, 114], [72, 113], [38, 111], [22, 25]];
    const god = gods.indexOf(interaction.options.getString('god'));
    interaction.reply({
      content: `Blessings of ${gods[god]}`,
      files: [
        `http://underhand.clanweb.eu/res/Card${blessings[god][0]}.png`,
        `http://underhand.clanweb.eu/res/Card${blessings[god][1]}.png`
             ] 
    });
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription("Sends blessings textures")
                  .addStringOption(option => 
                          option.setName("god")
                          .setDescription("The god the blessings correspond to.")
                          .setRequired(true)
                          .addChoices(
				{ name: 'God of Beginnings', value: 'God of Beginnings' },
				{ name: 'Rhybaax', value: 'Rhybaax' },
				{ name: 'Wiindigoo', value: 'Wiindigoo' },
        { name: 'Jhai\'Ti', value: 'Jhai\'Ti' },
				{ name: 'Kekujira', value: 'Kekujira' },
				{ name: 'Yacare', value: 'Yacare' },
        { name: 'Uhl\'Uht\'C', value: 'Uhl\'Uht\'C' }
			));
  }
   
}