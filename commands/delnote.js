const Discord = require("discord.js");
module.exports = { 	
  name: 'delnote', 	
  description: 'delnote [note]',
  action: "Removes the target note from the notes collection of this server",
  note: "You need to have `MANAGE_MESSAGES` permission for this command",
  legend: "note",
  async execute(message, args, sequelize, Notes) { 		
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      message.reply('Nono, you need to have `MANAGE_MESSAGES` permission for this command');
      return;
    }
    
    const rowCount = await Notes.destroy({ where: { server: message.guild.id, note: args.join(" ") } });
if (!rowCount){
  message.reply('That note did not exist.');
} 
return;
    message.reply('Note deleted.');
    
    
	}, };