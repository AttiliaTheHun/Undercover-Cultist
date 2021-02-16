const Discord = require("discord.js");
module.exports = { 	
  name: 'notes', 	
  description: 'notes [nothing]',
  action: "Shows notes collection for the server",
  note: "",
  legend: "nothing",
  async execute(message, args, sequelize, Notes, client) { 	
    try{
      const notes = await Notes.findAll({ where: { server: message.guild.id }, /*raw: true*/});
      if (notes) {
  if(notes.length > 0){
let embed = new Discord.MessageEmbed() 
    .setColor('#ffbc03') 	
    .setTitle("Notes");		
    
    let member;
    let username;
    let id;
    
  for(let i = 0; i < notes.length; i++){
   id = notes[i].get('author');
    member = message.guild.members.cache.get(id);
    username = member.user.username + "#" + member.user.discriminator;
    embed.addField(username, notes[i].get('note'), false);	
  }
    embed.setTimestamp() 	
	.setFooter('Undercover Cultist#5057', ''); 
    message.channel.send(embed);
	return undefined;
    
  }
      }
      message.reply(`Could not find notes for the server: ${message.guild.name}`); 
      return;

      
      }catch(err){
      console.log(err);
     return err;
      
    }

	}, };