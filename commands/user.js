const Discord = require('discord.js');
module.exports = {
name: 'user',
description: 'shows user info',
execute(message, args, client){
if(args[0].indexOf("#") == -1 && isNaN(args[0])){
  return message.channel.send("IlegalArgumentException: \`user tag or ID is the only acceptable argument\`");
}
  let user;
  if(isNaN(args[0])){ 
  user = client.users.find(user => user.username == args[0]);
  }else{
     user = message.guild.members.cache.find(user => user.id == args[0]);
  }
  const embed = new Discord.MessageEmbed()
.setColor('#005E1F')
  .setTitle(`${user.user.tag}`) 	
  .setAuthor('', '') 	
  .setDescription('Here is the latest report') 
  .setThumbnail(user.user.avatarURL()) 
  .addField('ID', user.id, false) 	  
  .addField('Joined', user.joinedAt, true)
  .addField('Created', user.user.createdAt/*.toString().substring(0, 31)*/, false)		
  .addField('Bot', user.user.bot, true)
  .addField(`Roles(${user.guild.member.roles.cache.size})`, user.guild.member.roles.cache.map(r => `${r}`).join(' | '), true)
 .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  message.channel.send(embed);
  
},
};