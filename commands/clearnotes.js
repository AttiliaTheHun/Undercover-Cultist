const Discord = require("discord.js");
module.exports = { 	
  name: 'clearnotes', 	
  description: 'clearnotes [nothing]',
  action: "deletes all notes for the server",
  note: "",
  legend: "nothing",
  async execute(message, args, sequelize, Notes) { 		
    
    if(!message.member.hasPermission('ADMINISTRATOR')){
      return message.reply('Haha, this is admin-only command.');
    }
    
    const rowCount = await Notes.destroy({ where: { server: message.guild.id} });
if (!rowCount) return message.reply('That did never existed exist.');

return message.reply('All clear.');
    
	}, };