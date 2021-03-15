const Discord = require("discord.js");
module.exports = { 	
    name: 'bans', 	
  syntax: 'bans', 	
  description: "Shows users prohibited from the use of the bot",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["botbans"],
  legend: "",
  async execute(message, args, client, Config, Masters, Bans, Notes) { 	
    try{
      const bans = await Bans.findAll({ where: { server: message.guild.id, global: false } || { global: true }, /*raw: true*/});
      if (bans) {
  if(bans.length > 0){
let embed = new Discord.MessageEmbed() 
    .setColor('#ffbc03') 	
    .setTitle("Bot Bans");		
    
    let member;
    let username;
    let id;
    let banned_by_member;
    let banned_by_username;
    let banned_by_id;
  for(let i = 0; i < bans.length; i++){
   id = bans[i].get('user');
    member = message.guild.members.cache.get(id);
    username = member.user.username + "#" + member.user.discriminator;

      username += (bans[i].get('global')) ? " Global": " Local";
  banned_by_id = bans[i].get('banned_by');
  banned_by_member = message.guild.members.cache.get(banned_by_id);
  banned_by_username = banned_by_member.user.username + "#" + banned_by_member.user.discriminator;
    embed.addField(username, `**Banned By:** ${banned_by_username}\n**Reason:** ${bans[i].get('reason')}`, false);	
  }
	embed.setFooter('Undercover Cultist#5057', ''); 
    message.channel.send(embed);
	return undefined;
    
  }
      }
      message.reply(`No banned users found`); 
      return;

      
      }catch(err){
      console.log(err);
     return err;
      
    }

	}, };