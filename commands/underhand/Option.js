const Command = require("../Command.js");

module.exports = class Option extends Command {
  
  constructor(client) {
    super(client, {
      name: 'option',
      aliases: [],
      syntax: 'option <active/dormant/ready/down/back>',
      description: `Sends option texture`,
      category: client.categories.UNDERHAND,
      clientPermissions: [],
      userPermissions: [],
      examples: ['option active'],
      master: false
    });
  }
  
  async execute(message, args) {
    if (args[0] == null) {
      throw new message.client.errors.UserInputError("You must provide an argument. Use `help` command or check the bot help page http://underhand.clanweb.eu/undercover_cultist for more info.");
    }

    const arg = args[0].substring(0, 1).toUpperCase() + args[0].substring(1, args[0].length);
    if (arg == "Ready" || arg == "Active" || arg == "Dormant" || arg == "Down" || arg == "Back") {
      message.channel.send({
        content: "Option" + arg,
        files: ["http://underhand.clanweb.eu/res/Option" + arg + ".png"]
      });
    } else {
     throw new message.client.errors.UserInputError("Unknown argument. Try to looks for mistypes or use `help` command.");
    }
  }
   
}