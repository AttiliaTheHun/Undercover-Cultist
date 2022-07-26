const Command = require("../Command.js");

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
    let base_url = "http://underhand.clanweb.eu/res/";
    let file_extension = ".png";
    let url = base_url + args[0] + file_extension;
    message.channel.send({
      content: args[0],
      files: [url]
    });
  }
   
}