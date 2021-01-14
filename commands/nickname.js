module.exports = { 	
  name: 'nickname', 	
  description: 'nickname [mention]/[id] [nickname]', 	
  action: "changes the nickname of the target member",
  note: "you need the `MANAGE_NICKNAMES` permission for using this command on other members",
  legend: "mention, id",
  async execute(message, args) { 		
    try{
     if(!message.member.hasPermission("MANAGE_NICKNAMES")){
      return message.reply(`SecurityException: \`Missing permission\``);
    }
       if(args[0] == null){
        return message.channel.send(`NullPointerException: \`You must provide an argument\``);
      }
  let id;
    let member;
    if(!isNaN(args[0])){
  id = args[0];
      args.shift();
	member = await message.guild.members.fetch(id);
  if(member == undefined){
    id = message.member.id;
  }
}else{
  if(!message.content.includes("<@")){
    id = message.member.id;
  }
  member = message.mentions.members.first();
  args.shift();
  if(member == undefined){
    id = message.member.id;
  }else{
  id = member.id;
} 	
  
}
      if(member == undefined){
      member = await message.guild.members.fetch(id);
      }
      if(!member.managable){
        return message.reply("The discord permission system will not let me do this");
      }
    member.setNickname(args.join(" ")).catch(err => {
   message.reply("WTF gimme me permissions bruh");
 });
    
    }catch(err){
      console.log(err);
      message.reply("dead");
    }
      
	}, };