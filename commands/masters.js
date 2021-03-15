const Discord = require('discord.js');
module.exports = { 	
  name: 'masters', 	
  syntax: 'masters', 	
  description: "Shows the list of bot Masters",
  note: "",
  permissions: "",
  master: true,
  aliases: ["listmasters", "botmasters"],
  legend: "",
  async execute(message, args, client, Config, Masters, Bans, Notes) { 		
    try{
        const masters = await Masters.findAll({ where: {}});
        if (masters) {
          if(masters.length > 0){

    	       let embed = new Discord.MessageEmbed()
             .setColor('#ffbc03') 	
             .setTitle("Bot Masters");	
             let master_id;
             let master_member;
             let master_username;
             let promoted_by_id;
             let promoted_by_member;
             let promoted_by_username;
            
             for(let i = 0; i < masters.length; i++){
               master_id = masters[i].get('user');
               master_member = message.guild.members.cache.get(master_id);
               master_username = master_member.user.username + "#" + master_member.user.discriminator;
               promoted_by_id = masters[i].get('promoted_by');
               promoted_by_member = message.guild.members.cache.get(promoted_by_id);
               promoted_by_username = promoted_by_member.user.username + "#" + promoted_by_member.user.discriminator;
               
               embed.addField(master_username, `Promoted by: ${promoted_by_username}`, false);	
             }
	           embed.setFooter('Undercover Cultist#5057', ''); 
             message.channel.send(embed);
	           return;   
          }
          message.reply(`Nothing to display`); 
        }
        return;
   

     }catch(err){
      console.log(err);
     return err;
      
    }
  }, };