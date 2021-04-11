const utils = require('../util/utils.js');
module.exports = { 	
  name: 'unban', 	
  syntax: 'unban [mention]/[id]', 	
  description: "Removes the ban from target user",
  note: "",
  permissions: "`BAN_MEMBERS`",
  master: false,
  aliases: [],
  legend: "mention, id",
  category: "utility",
  async execute(message, args) { 		
 //   try{
       if(!message.member.hasPermission("BAN_MEMBERS")){
          message.reply(`SecurityException: \`Missing permission\``);
      return;
    }
       if(args[0] == null){
        message.channel.send(`NullPointerException: \`You must provide an argument\``);
        return;
      }
  
      let user = await utils.resolveUser(message, args);
  if(user == undefined){
    return message.channel.send("Could not find the user.")
  }
  args.shift();
	message.guild.members.unban(user.id, args.join(" "));

    message.reply(`The cultist <@${user.id}> was allowed to come back to this sacred place.`);
/*	}catch(err){
      console.log(err);
      message.reply("WTF gimme me permissions bruh");
    }*/
 	}, };