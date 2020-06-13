const Discord = require('discord.js');
module.exports = {
name: 'server',
description: 'shows server info',
execute(message, args, client){


  
  const embed = new Discord.MessageEmbed()
.setColor('#366A1B') 	
  .setTitle(`${message.guild.name}`) 	
  .setAuthor('', '') 	
  .setDescription('Here is the last report') 
  .setThumbnail(message.guild.iconURL()) 
  .addField('Owner', message.guild.owner.user.tag, true) 	
  .addField('Created', message.guild.createdAt, true) 	
  .addField('Members', message.guild.memberCount, true) 	
  .addField('Bots', message.guild.members.cache.filter(member => member.user.bot).size, true) 
  .addField('Roles', message.guild.roles.cache.size, true)
  .addField('Channels', message.guild.channels.cache.size, true)
  .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  message.channel.send(embed);
  
},
};