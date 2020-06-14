const Discord = require('discord.js');
module.exports = {
name: "event",
description: "event test",
async execute(message, args){

const embed1 = new Discord.MessageEmbed()
.setAuthor('Option 1')
.setDescription('Insert \'Wrath of Gods\'');
const embed2 = new Discord.MessageEmbed()
.setAuthor('Option 2')
.setDescription('Insert \'Gods of Wrath\'');
const embed3 = new Discord.MessageEmbed()
.setAuthor('Option 3')
.setDescription('Insert \'The Living Yay\'');
await message.channel.send("",{
files:["http://underhand.clanweb.eu/res/Card28.png"]
});
message.channel.send(embed1);
  message.channel.send(embed2);
  message.channel.send(embed3);

},
};