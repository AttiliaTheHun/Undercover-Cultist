const Discord = require("discord.js");
module.exports = { 	
  name: 'globalban', 	
  syntax: 'globalban [mention]/[id]',
  description: "Prohibits the user from the use of the bot",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["gban"],
  legend: "mention, id",
  async execute(message, args, client, Config, Masters, Bans, Notes) { 	
    try {
        
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
       
         let id
         let member;
         if(!isNaN(args[0])){
            id = args[0];
	          member = await message.guild.members.fetch(id);
            if(member == undefined){
              message.reply("This ID does not seem to belong to any member");
            }
         }else{
            if(!message.content.includes("<@")){
              message.reply("I can't identify the user from this, sorry");
            }
            member = message.mentions.members.first();
            id = member.user.id;
        } 	
        args.shift();
        const tag = await Bans.create({
          server: message.guild.id,
          global: true,
          user: id,
          banned_by: message.author.id,
		      date: today,
          reason: args.join(" ")
	      });
      
        message.reply(`<@${id}> is globally banned from the bot usage.`);
	      return; 
       
    }catch (e) {
      console.log(e);
	    if (e.name === 'SequelizeUniqueConstraintError') {
		    message.reply(`That user already is globally banned from the bot usage.`);
        return;
	    }
	    return e;
  }
	}, };