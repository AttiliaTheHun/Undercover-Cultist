const Discord = require("discord.js");
module.exports = { 	
  name: 'notes', 	
  description: 'notes [nothing]',
  action: "shows notes for the server",
  note: "",
  legend: "nothing",
  async execute(message, args, sequelize, Notes, client) { 	
    try{
  //    message.channel.send("command executing")
      let guildid;
      let guild;
      let title = "Notes";
      if(args[0] != null && (message.author.id == 608673444061773827 || message.author.id == 651459267718545489 || message.author.id == 621030694566625283)){
        guildid = args[0];
        guild = client.guilds.cache.get(guildid);
        title += " for " + guild.name;
      }else{
        guildid = message.guild.id;
        guild = message.guild;
      }
        
        
        
    const notes = await Notes.findAll({ where: { server: guildid }, /*raw: true*/});
if (notes) {
  if(notes.length > 0){
let embed = new Discord.MessageEmbed() 
    .setColor('#ffbc03') 	
    .setTitle(title)		
let member;
    
    let username;
    let id;
  //  message.channel.send("loop begins")
  for(let i = 0; i < notes.length; i++){
   id = notes[i].get('author');
    //console.log(guild.members.cache.find(member => member.user.id == id))
   message.channel.send(id)
    member =  guild.members.cache.get(id);
   // message.channel.send("done")
    console.log(member);
  //  username = member.user.username + "#" + member.user.discriminator;
  //  console.log(user)
embed.addField(username, notes[i].get('note'), false);	

    }
 //   message.channel.send("loop ends")
	 	embed.setTimestamp() 	
	.setFooter('Undercover Cultist#5057', ''); 
	return message.channel.send(embed);
  
  }
}
 return message.reply(`Could not find notes for the server: ${guild.name}, ID ${guildid}`);  
      
      
      
      

    }catch(err){
      console.log(err);
     return message.reply("You just broke the bot, well done.");
      
    }

	}, };