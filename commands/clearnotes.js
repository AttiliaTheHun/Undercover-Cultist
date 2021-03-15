const Discord = require("discord.js");
module.exports = { 	
  name: 'clearnotes', 	
  syntax: 'clearnotes',
  description: "Clears the collection of notes of this server",
  note: "",
  permissions: "`AMINISTRATOR`",
  master: false,
  aliases: [],
  legend: "",
  async execute(message, args, client, Config, Masters, Bans, Notes) { 		
    
    if(!message.member.hasPermission('ADMINISTRATOR')){
      message.reply('Haha, this is admin-only command.');
      return; 
    }
    
    const rowCount = await Notes.destroy({ where: { server: message.guild.id} });
if (!rowCount){
  message.reply('No notes to clear.');
  return; 
} 

message.reply('All clear.');
    
	}, };