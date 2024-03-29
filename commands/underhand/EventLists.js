const Command = require("../Command.js");
const cardwipfile = require("../../cardwip.json");
const cardwip = JSON.parse(JSON.stringify(cardwipfile));
const { SlashCommandBuilder } = require('discord.js');

module.exports = class EventList extends Command {
  
  constructor(client) {
    super(client, {
      name: 'eventlist',
      aliases: ['events', 'listevents'],
      syntax: 'eventlist',
      description: `Lists all the events in the Game`,
      category: client.categories.UNDERHAND,
      clientPermissions: [],
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

  async backslash(interaction) {
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

    interaction.reply({embeds: [embed1, embed2]});
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription("Sends a numbered list of events.")
  }
   
}