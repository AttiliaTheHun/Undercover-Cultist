const Discord = require('discord.js');
module.exports = {
name: 'server',
description: 'shows server info',
execute(message, args, client){
  
  const embed = new Discord.MessageEmbed()
.setColor(' #366A1B') 	
  .setTitle(`${message.guild.name}`) 	
  .setAuthor('Here is the latest report', 'https://discord.js.org') 	
  .setDescription('Some description here') 
  .setThumbnail(message.guild.iconURL()) 
  .addField('Owner', message.guild.owner, true) 	
  .addField('Created', message.guild.createdAt, true) 	
  .addField('Members', 'Some value here', true) 	
  .addField('Inline field title', 'Some value here', true) 
  .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.avatarURL());
  message.channel.send(embed);
  
},
};