const Command = require("../Command.js");

module.exports = class Card extends Command {
  
  constructor(client) {
    super(client, {
      name: 'card',
      aliases: [],
      usage: 'card <0-118>',
      description: `Sends back the target card texture`,
      type: client.types.UNDERHAND,
      userPermissions: [],
      examples: ['underhand 69'],
      master: false
    });
  }
  
  async execute(message, args) {
    if (args[0] == null) {
      message.channel.send("You must provide an argument");
      return;
    }
    if (!isNaN(args[0]) && args[0] > 0 && args[0] < 119) {
      message.channel.send({
        content: "Card " + args[0], 
        files: ["http://underhand.clanweb.eu/res/Card" + args[0] + ".png"]
      });
    } else {
      message.channel.send("Number range should be in between 0-119 excluded");
    }
  }
   
}