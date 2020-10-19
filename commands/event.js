const Discord = require('discord.js');
module.exports = {
name: "event",
description: "event test",
async execute(message, args){ 

const embed = new Discord.MessageEmbed()
.setColor("#7a11ab")
.setDescription("There's now an opportunity to play Underhand right here on Discord. Just go in one of the gaming channels\n<#721735042682060853>\n<#766993942242787369>\nand type\n**!c underhand play**\nto start a new game.\n\nIf the bot is not online, you can go at http://undercover-cultist.glitch.me and wait until the page loads, then the bot should be online for you :heart:\nYou should react on this message with <:exchange_cultist:644175421755097098> to get the cultist role, othewise you are considered a prisoner, food or suspicion.\nReact with <:eye_of_sacrifice:719878415850799205> to get access to the game channels.");
message.channel.send(embed);


  
},
};