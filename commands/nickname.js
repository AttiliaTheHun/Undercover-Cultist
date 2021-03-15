module.exports = { 	
  name: 'nickname', 	
  syntax: 'nickname [mention]/[id] [nickname]', 	
  description: "Changes the nickname of the target member",
  note: "",
  permissions: "`MANAGE_NICKNAMES`",
  master: false,
  aliases: ["nick", "setnick", "setnickname"],
  legend: "mention, id",
  async execute(message, args) { 		
  //  try{
     if(!message.member.hasPermission("MANAGE_NICKNAMES")){
        message.reply(`SecurityException: \`Missing permission\``);
      return;
    }
       if(args[0] == null){ 
         message.channel.send(`NullPointerException: \`You must provide an argument\``);
        return;
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
        message.reply("The discord permission system will not let me do this");
        return;
      }
    member.setNickname(args.join(" ")).catch(err => {
   message.reply("WTF gimme me permissions bruh");
 });
    
   /* }catch(err){
      console.log(err);
      message.reply("dead");
    }*/
      
	}, };