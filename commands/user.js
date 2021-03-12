const Discord = require('discord.js');
module.exports = {
  name: 'user',
  syntax: 'user [mention]/[id]/[username]',
  description: "Shows information about target user",
  note: "",
  permissions: "",
  master: false,
  aliases: ["profile", "useinfo", "member", "memberinfo", "whois"],
  legend: "mention, id, username",
execute(message, args, client){
  
if(!args.join(" ").includes("#") && isNaN(args[0]) && args[0] != null && message.mentions.members.first == null){
   message.channel.send("IlegalArgumentException: \`user tag or ID is the only acceptable argument\`");
return;
}
  let user;
  if(args[0] == null){
    user = message.member;
}else if(message.mentions.members.first() != null){
  user = message.mentions.members.first();
}else if(isNaN(args[0])){ 
    let tag = args.join(" ");
    let username= tag.substring(0, tag.indexOf("#"));
  user = message.guild.members.cache.find(user => user.user.username.includes(username));
  }else{
     user = message.guild.members.cache.get(args[0]);
  }
  if(user == undefined){
    return message.channel.send("Could not find the user.")
  }
  let description = `Here is the latest report\n`;
  description += `**ID:** ${user.id}\n`;
  if(user.nickname != null){
    description += `**Nickname:** ${user.nickname}\n`;
  }
   description += `**Admin:** ${user.permissions.has("ADMINISTRATOR")}\n`;
  description += `**Bot:** ${user.user.bot}\n`;
  description += `**Color:** ${user.displayHexColor}\n`;
  description += `**Highest Role:** ${user.roles.highest}\n`;
  if(user.premiumSince != null){
      description += `**Premium Since:** ${user.premiumSince}\n`;
  }
  if(user.user.flags != undefined){
      description += `**User Flags:** ${user.user.flags.toArray()}\n`;
  }
  description += `**Joined:** ${user.joinedAt}\n`;
  description += `**Created:** ${user.user.createdAt}\n`;
  if(user.lastMessage != null){
     description += `**Last Server Message:** ${user.lastMessage}:${user.lastMessage.channel}:${user.lastMessage.createdAt}\n`;
  }
  if(user.user.lastMessage != null){
    description += `**Last Message:** ${user.user.lastMessage}:${user.user.lastMessage.channel}:${user.user.lastMessage.createdAt}\n`;
  }
  const embed = new Discord.MessageEmbed()
.setColor('#005E1F')
  .setTitle(`${user.user.tag}`) 	
  .setAuthor('', '') 	
  .setDescription(description) 
  .setThumbnail(user.user.avatarURL()) 
 /* .addField(`Roles(${user.guild.member.roles.cache.size})`, user.guild.member.roles.cache.map(r => `${r}`).join(' | '), true)
 */ .setTimestamp() 	
  .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  message.channel.send(embed);
  
},
};