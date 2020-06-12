const Discord = require('discord.js');
module.exports = {
name: 'server',
description: 'shows server info',
execute(message, args){
  
  const embed = new Discord.messageEmbed()
.setColor(' #366A1B') 	
  .setTitle(`${message.guild.owner.tag}`) 	
  .setURL('https://discord.js.org/') 
  .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org') 	
  .setDescription('Some description here') 
  .setThumbnail('https://i.imgur.com/wSTFkRM.png') 
  .addField('Regular field title', 'Some value here') 	
  .addBlankField() 
  .addField('Inline field title', 'Some value here', true) 	
  .addField('Inline field title', 'Some value here', true) 	
  .addField('Inline field title', 'Some value here', true) 
  .setImage('https://i.imgur.com/wSTFkRM.png') 	.setTimestamp() 	
  .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
  message.hannel.send(embed);
  
},
}