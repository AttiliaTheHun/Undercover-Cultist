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
  .addField('Owner', message.guild.owner.user.tag, false) 	
  .addField('Region', message.guild.region, true)
  .addField('Admins', message.guild.members.cache.filter(member => member.hasPermission('ADMINISTRATOR')).size, true)
  .addField('Created', message.guild.createdAt.toString().substring(0, 31), false)	
  .addField('Members', message.guild.memberCount, true) 	
  .addField('Bots', message.guild.members.cache.filter(member => member.user.bot).size, true)
  .addField(`Roles(${message.guild.roles.cache.size})`,  message.guild.roles.cache.map(r => `${r}`).join(' | '), false)
  .addField('Channel Categories', message.guild.channels.cache.filter(channel => channel.type === "category").size, true)
  .addField('Text Channels', message.guild.channels.cache.filter(channel => channel.type === "text").size, true)
  .addField('Voice Channels',message.guild.channels.cache.filter(channel => channel.type === "voice").size, true)
  .addField('ID', message.guild.id, false)
  .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  message.channel.send(embed);
  
},
};