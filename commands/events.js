const Discord = require('discord.js');
const cardwipfile = require('../cardwip.json');
const cardwip = JSON.parse(JSON.stringify(cardwipfile));
module.exports = { 	
  name: 'events', 	
  description: 'events [nothing]',
  action: "sends event list",
  note: "",
  legend: "nothing",
  execute(message, args) { 		
    let list = "";
    let event;
    for(let i = 1; i <= 63; i++){
      event = cardwip[i];
      list = list + i + ": " + event.title + "\n";
    }
	const embed1 = new Discord.MessageEmbed()
  .setTitle("List of events [Part 1]")
  .setDescription(list);
    list = "";
    for(let i = 64; i <= 118; i++){
      event = cardwip[i];
      list = list + i + ": " + event.title + "\n";
    }
    const embed2 = new Discord.MessageEmbed()
  .setTitle("List of events [Part 2]")
  .setDescription(list);
	message.channel.send(embed1);
    message.channel.send(embed2);
	}, };