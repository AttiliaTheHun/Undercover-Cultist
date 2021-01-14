module.exports = { 	
  name: 'unban', 	
  description: 'unban [mention]/[id]', 	
  action: "sends card texture specified by it's number",
  note: "you need the `BAN_MEMBERS` permission for this command",
  legend: "mention, id",
  execute(message, args) { 		
    try{
       if(!message.member.hasPermission("BAN_MEMBERS")){
      return message.reply(`SecurityException: \`Missing permission\``);
    }
       if(args[0] == null){
        
        return message.channel.send(`NullPointerException: \`You must provide an argument\``);
      }
  
      let id;
if(!isNaN(args[0])){
  id = args[0];
}else{
  if(!message.content.includes("<@!")){
    message.reply("I can't identify the user from this, sorry");
  }
  id = message.content.substring(message.content.indexOf("<@!") + "<@!".length, message.content.indexOf(">"));
}
  args.shift();
	message.guild.members.unban(id, args.join(" "));

    message.reply(`The cultist <@${id}> was allowed to come back to this sacred place.`);
	}catch(err){
      console.log(err);
      message.reply("WTF gimme me permissions bruh");
    }
 	}, };