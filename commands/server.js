const Discord = require('discord.js');
module.exports = {
name: 'server',
description: 'shows server info',
execute(message, args){
  
  const embed = new Discord.MessageEmbed()
.setColor(' #366A1B') 	
  .setTitle(`${message.guild.name}`) 	
  .setURL('https://discord.js.org/') 
  .setAuthor('Here is the latest report', 'https://discord.js.org') 	
  .setDescription('Some description here') 
  .setThumbnail(message.guild.iconURL()) 
  .addField('Regular field title', 'Some value here') 	
  .addField('Inline field title', 'Some value here', true) 	
  .addField('Inline field title', 'Some value here', true) 	
  .addField('Inline field title', 'Some value here', true) 
  .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.user.avatar);
  message.channel.send(embed);
  
},
};