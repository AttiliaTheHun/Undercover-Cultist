const { SlashCommandBuilder } = require('discord.js');
const Command = require("../Command.js");

module.exports = class Generate extends Command {
  
  constructor(client) {
    super(client, {
      name: 'generate',
      aliases: ['gen'],
      syntax: 'generate <0-21>',
      description: `Generates target number of Underhand-themed nicknames, used with \"change\" will change your nickname to Underhand-themed one`,
      category: client.categories.UNDERHAND,
      clientPermissions: [],
      userPermissions: [],
      examples: ['generate 21', 'generate 1 ch'],
      master: false
    });
  }
  
  async execute(message, args) {
     try {
      if (args[0] == null) {
        throw new message.client.errors.UserInputError("You must provide an argument");
      }
      if (!isNaN(args[0]) && args[0] > 0 && args[0] < 21 || args[0] == "change" || args[0] == "set" || args[0] == "ch" || args[0] == "s") {
        if (isNaN(args[0])) {
          message.member.setNickname(this.generate(this.client.utils)).catch(() => {
            message.reply("WTF gimme me permissions bruh");
          });
        } else {
          let response = "";
          for (let i = args[0]; i > 0; i--) {
            response += this.generate(this.client.utils) + "\n";
          }
          message.channel.send(response);
        }
      } else {
        throw new message.client.errors.UserInputError("Number range should be in between 0-21 excluded");
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  generate(utils) {
    const templates = ["[superlative] [person]", "The [person] of [action]", "[person] in [location]"];
    const person = ["Beginner", "Prisoner", "Assassin", "Salesperson", "Milkman", "Vendor", "Cultist", "Soothsayer", "Collector", "Farmer", "Ancestor", "Guest", "Necromancer", "Aeromancer", "Hatchling", "Fisherman"];
    const superlative = ["Mysterious", "Golden", "Dead", "Rival", "Horrific", "Dark", "Eggcelent", "Tea", "Long", "Hungry", "Hideous", "Desperate", "Small", "Failing", "Booming", "Insatiable", "Red", "Greedy", "Holiday", "Ancestral", "Police", "Bountiful", "Suspicious", "Tasty", "Haunted", "Cyclopean", "Sacrificial", "Undercover", "Wandering", "Recruiting", "Travelling", "Losing", "Importing"];
    const action = ["the Wild", "Day", "Beginnings", "War", "Failure", "Harvest", "Darkness", "the Gods", "Time", "Strategy", "Tricks"];
    const location = ["Time", "Town", "Storm", "Rain", "the Deck", "the Future"];
    let template = templates[Math.floor(Math.random() * templates.length)]
    template = template.replace("[person]", utils.randomArrayItem(person));
    template = template.replace("[superlative]", utils.randomArrayItem(superlative));
    template = template.replace("[action]", utils.randomArrayItem(action));
    template = template.replace("[location]", utils.randomArrayItem(location));
    return template;
  }

  backslash(interaction) {
    let count = interaction.options.getInteger('result-count');
    const changeNickname = interaction.options.getBoolean('change-nickname');
    if (changeNickname) {
          message.member.setNickname(this.generate(this.client.utils)).catch(() => {
            interaction.reply("I'm gonna need some perms in order to do that...");
          });
        } else {
          let response = "";
          for (let i = count; i > 0; i--) {
            response += this.generate(this.client.utils) + "\n";
          }
          interaction.reply(response);
        }
    
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription('Generate Underhand-themed nicknames.')
                  .addIntegerOption(option =>
		                      option.setName('result-count')
			                    .setDescription('How many nicknames do you want to generate? (1 - 20)')
                          .setRequired(true))
                  .addBooleanOption(option =>
		option.setName('change-nickname')
			.setDescription('Whether or not should the bot set your nickname to the generated result.'));
                  
  }
   
}