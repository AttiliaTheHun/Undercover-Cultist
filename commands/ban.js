const utils = require('../util/utils.js');
module.exports = { 	
  name: 'ban', 	
  syntax: 'ban [mention]/[id]', 	
  description: "Bans the target user from the server",
  note: "",
  permissions: "`BAN_MEMBERS`",
  master: false,
  aliases: ["banuser"],
  legend: "mention, id",
  category: "utility",
  async execute(message, args) { 		
  //  try{
    if(!message.member.hasPermission("BAN_MEMBERS")){
      message.reply(`SecurityException: \`Missing permission\``);
      return;
    }
       if(args[0] == null){
        message.channel.send(`NullPointerException: \`You must provide an argument\``);
        return;
      }
    let member;
     let user = await utils.resolveUser(message, args);
  if(user == undefined){
    return message.channel.send("Could not find the user.")
  }
      if(!member.bannable){
        message.reply("This member is above my might, I can't ban him");
       return;
      }
      args.shift();
       member.ban(args.join(" "));
    message.reply(`The fake cultist <@${user.id}> was banned from this sacred place.`);
  /*  }catch(err){
      console.log(err);
      message.reply("WTF gimme me permissions bruh");
    }*/
  }, };