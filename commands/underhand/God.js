const Command = require("../Command.js");

module.exports = class God extends Command {
  
  constructor(client) {
    super(client, {
      name: 'god',
      aliases: [],
      usage: 'god <0-7><thumbnail>',
      description: `Sends god texture or thumbnail`,
      type: client.types.UNDERHAND,
      userPermissions: [],
      examples: ['god 0', 'god 2 thumbnail'],
      master: false
    });
  }
  
  async execute(message, args) {
    if (args[0] == null) {
      message.channel.send("List of Gods:\n`1.The God of Beginnings\n2.Rhybaax\n3.Wiindigoo\n4.Jhai'Ti\n5.Kekujira\n6.Yacare\n7.Uhl'Uht'C`");
      return;
    }
    if (args[0] < 1 || args[0] > 7 || isNaN(args[0])) {

      message.channel.send("IllegalArgumentException: `only integers in range from 1 to 7 included are accepted `");
      return;
    }
    const gods = [null, "God of Beginnings", "Rhybaax", "Wiindigoo", "Jhat'Ti", "Kekujira", "Yacare", "Uhl'Uht'C"];
    let name = gods[args[0]];
    let url = null;

    if (args[0] == 4) {
      url = "Jhai'lungr";
    } else if (args[0] == 7) {
      url = "Uhl'uht'c";
    } else {
      url = name;
    }
    if (args[1] != null) {
      name = name + " Thumbnail";
      url = url + "Thumbnail";
    }
    message.channel.send({ 
      content: `${name}`,
      files: [`http://underhand.clanweb.eu/res/${url}.png`]
    });
  }
   
}