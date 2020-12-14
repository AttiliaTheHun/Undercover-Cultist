const Discord = require('discord.js');
module.exports = {
name: 'server',
description: 'shows server info',
execute(message, args, client){
let owner;
  try{
owner = message.guild.owner.user.tag;
}catch(err){
  owner = "unknown";
}
  const embed = new Discord.MessageEmbed()
.setColor('#005E1F')
  .setTitle(`${message.guild.name}`) 	
  .setAuthor(`Here is the latest report`, '') 	
  .setDescription(`**Owner:** ${owner}\n**Region:** ${message.guild.region}\n**Admins:** ${message.guild.members.cache.filter(member => member.hasPermission('ADMINISTRATOR')).size}\n**Created:** ${message.guild.createdAt.toString().substring(0, 31)}\n**Members:** ${message.guild.memberCount}\n**Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}\n**Channel Categories:** ${message.guild.channels.cache.filter(channel => channel.type === "category").size}\n**Text Channels:** ${message.guild.channels.cache.filter(channel => channel.type === "text").size}\n**Voice Channels:** ${message.guild.channels.cache.filter(channel => channel.type === "voice").size}\n**ID:** ${message.guild.id}\n**Roles** (${message.guild.roles.cache.size})\n${message.guild.roles.cache.map(r => `${r}`).join(' | ')}\n`)
  .setThumbnail(message.guild.iconURL()) 
  .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  message.channel.send(embed);
  
},
};