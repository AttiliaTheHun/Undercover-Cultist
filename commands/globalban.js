const utils = require('../util/utils.js');
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
  category: "administrative",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) { 	
    try {
        
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
       
        let user = await utils.resolveUser(message, args);
  if(user == undefined){
    return message.channel.send("Could not find the user.")
  }
           let id = user.user.id;
	
        args.shift();
      const [result, metadata] = await sequelize.query(`INSERT INTO bans (server, global, user, banned_by, date, reason) VALUES ('${message.guild.id}', true, '${id}', '${message.author.id}', '${today}', '${args.join(' ')}');`);
 
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