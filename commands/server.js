const Discord = require('discord.js');
module.exports = {
name: 'server',
description: 'shows server info',
execute(message, args, client){


  
  const embed = new Discord.MessageEmbed()
.setColor('#005E1F')
  .setTitle(`${message.guild.name}`) 	
  .setAuthor('', '') 	
  .setDescription('Here is the latest report') 
  .setThumbnail(message.guild.iconURL()) 
  .addField('Owner', message.guild.owner.user.tag) 	
  .addField('Region', message.guild.region)
  .addField('Created', message.guild.createdAt.toString().substring(0, 31))	
  .addField('Members', message.guild.memberCount, true) 	
  .addField('Bots', message.guild.members.cache.filter(member => member.user.bot).size, true)
  .addField('Roles', message.guild.roles.cache.size, true)
  .addField('Admins', message.guild.members.cache.filter(member => member.hasPermission('ADMINISTRATOR')).size)
  .addField('Channel Categories', message.guild.channels.cache.filter(channel => channel.type === "category").size)
  .addField('Text Channels', message.guild.channels.cache.filter(channel => channel.type === "text").size)
  .addField('Voice Channels',message.guild.channels.cache.filter(channel => channel.type === "voice").size)
  .addField('ID', message.guild.id)
  .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  message.channel.send(embed);
  
},
};