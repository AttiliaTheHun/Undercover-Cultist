const Discord = require("discord.js");
module.exports = { 	
  name: 'addnote', 	
  description: 'addnote [note]',
  action: "Adds a note inside the note collection of this server",
  note: "You need to have `MANAGE_MESSAGES` permission for this command",
  legend: "note",
  async execute(message, args, sequelize, Notes) { 	
    try {
        if(!message.member.hasPermission('MANAGE_MESSAGES')){
      return message.reply('Nono, you need to have `MANAGE_MESSAGES` permission for this command');
    }
        let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

       let note = args.join(" ");
       if(note.length > 600){
        return message.reply("The note is too long, please fix it under 600 characters.");
      }else if(!note){
        return message.reply("The note is *too* short.");
      }
today = mm + '/' + dd + '/' + yyyy;
       
    const tag = await Notes.create({
    server: message.guild.id,
		author: message.author.id,
		date: today,
		note: note,
	});
      message.reply(`Note added.`);
	return; 
       
  }catch (e) {
  console.log(e);
	if (e.name === 'SequelizeUniqueConstraintError') {
		return message.reply('That tag already exists.');
	}
	return e;
}
	}, };