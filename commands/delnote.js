const Discord = require("discord.js");
module.exports = { 	
  name: 'delnote', 	
  syntax: 'delnote [text]',
  description: "Removes the target note from the notes collection of this server",
  note: "",
  permissions: "`MANAGE_MESSAGES`",
  master: false,
  aliases: ["deletenote", "remnote", "removenote"],
  legend: "text",
  async execute(message, args, client, Config, Masters, Bans, Notes) { 		
    
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      message.reply('Nono, you need to have `MANAGE_MESSAGES` permission for this command');
      return;
    }
    
    const rowCount = await Notes.destroy({ where: { server: message.guild.id, note: args.join(" ") } });
if (!rowCount){
  message.reply('That note did not exist.');
} 

    message.reply('Note deleted.');
  return;  
    
	}, };