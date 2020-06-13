const Discord = require('discord.js');
module.exports = {
name: 'server',
description: 'shows server info',
execute(message, args, client){
  
 /* let count = 0;
  message.guild.fetchMembers().then(g => {
       count = g.members.length; 
       g.members.forEach((member) => {
            count++;
        });
    }); */

  
  const embed = new Discord.MessageEmbed()
.setColor(' #366A1B') 	
  .setTitle(`${message.guild.name}`) 	
  .setAuthor('Here is the latest report', '') 	
  .setDescription('') 
  .setThumbnail(message.guild.iconURL()) 
  .addField('Owner', message.guild.owner, true) 	
  .addField('Created', message.guild.createdAt, true) 	
  .addField('Members', message.guild.memberCount, true) 	
  .addField('Bots', message.guild.members.cache.filter(member => member.user.bot).size, true) 
  .addField('Roles',
  .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  message.channel.send(embed);
  
},
};