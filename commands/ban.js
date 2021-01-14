module.exports = { 	
  name: 'ban', 	
  description: 'ban [mention]/[id]', 	
  action: "ban target user",
  note: "you need the `BAN_MEMBERS` permission for this command",
  legend: "mention, id",
  async execute(message, args) { 		
    try{
    if(!message.member.hasPermission("BAN_MEMBERS")){
      return message.reply(`SecurityException: \`Missing permission\``);
    }
       if(args[0] == null){
        
        return message.channel.send(`NullPointerException: \`You must provide an argument\``);
      }
    let member;
      
      let id
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
  id = member.id;
} 	
      if(!member.bannable){
       return message.reply("This member is above my might, I can't ban him");
      }
      args.shift();
       member.ban(args.join(" "));
    message.reply(`The fake cultist <@${id}> was banned from this sacred place.`);
    }catch(err){
      console.log(err);
      message.reply("WTF gimme me permissions bruh");
    }
  }, };