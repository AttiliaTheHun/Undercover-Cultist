const Command = require("../Command.js");

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
   
}