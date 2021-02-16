const Discord = require("discord.js");
module.exports = { 	
  name: 'clearnotes', 	
  description: 'clearnotes [nothing]',
  action: "Clears the collection of notes of this server",
  note: "This is admin-only command",
  legend: "nothing",
  async execute(message, args, sequelize, Notes) { 		
    
    if(!message.member.hasPermission('ADMINISTRATOR')){
      message.reply('Haha, this is admin-only command.');
      return; 
    }
    
    const rowCount = await Notes.destroy({ where: { server: message.guild.id} });
if (!rowCount){
  message.reply('That did never existed exist.');
  return; 
} 

message.reply('All clear.');
    
	}, };