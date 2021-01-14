const Discord = require("discord.js");
module.exports = { 	
  name: 'delnote', 	
  description: 'delnote [note]',
  action: "deletes the note for the server",
  note: "",
  legend: "note",
  async execute(message, args, sequelize, Notes) { 		
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      return message.reply('Nono, you need to have `MANAGE_MESSAGES` permission for this command');
    }
    
    const rowCount = await Notes.destroy({ where: { server: message.guild.id, note: args.join(" ") } });
if (!rowCount) return message.reply('That note did not exist.');

return message.reply('Note deleted.');
    
	}, };