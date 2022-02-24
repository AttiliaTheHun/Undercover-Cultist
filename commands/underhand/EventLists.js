const Command = require("../Command.js");
const cardwipfile = require("../../cardwip.json");
const cardwip = JSON.parse(JSON.stringify(cardwipfile));

module.exports = class EventList extends Command {
  
  constructor(client) {
    super(client, {
      name: 'eventlist',
      aliases: ['events', 'listevents'],
      usage: 'eventlist',
      description: `Lists all the events in the Game`,
      type: client.types.UNDERHAND,
      userPermissions: [],
      examples: ['eventlist'],
      master: false
    });
  }
  
  async execute(message, args) {
    let list = "";
    let event;
    for (let i = 1; i <= 63; i++) {
      event = cardwip[i];
      list = list + i + ": " + event.title + "\n";
    }
    const embed1 = {
      title: "List of events [Part 1]",
      description: list
      
    }
    list = "";
    for (let i = 64; i <= 118; i++) {
      event = cardwip[i];
      list = list + i + ": " + event.title + "\n";
    }
    const embed2 = {
      title: "List of events [Part 2]",
      description: list
    }

    message.channel.send({embeds: [embed1, embed2]});
  }
   
}