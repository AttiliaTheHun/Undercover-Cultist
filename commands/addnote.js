const Discord = require("discord.js");
module.exports = { 	
  name: 'addnote', 	
  description: 'addnote [note]',
  action: "creates note for the server",
  note: "",
  legend: "note",
  async execute(message, args, sequelize, Notes) { 	
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
      return message.reply('Nono, you need to have `MANAGE_MESSAGES` permission for this command');
    }
    try {
	// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
      let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let note = args.join(" ");
      if(note.length > 2000){
        return message.reply("The note is too long, please fix it under 2000 characters.");
      }
today = mm + '/' + dd + '/' + yyyy;
      message.channel.send(message.author.id);
	const tag = await Notes.create({
    server: message.guild.id,
		author: /*message.author.id*/127964615873567219,
		date: today,
		note: args.join(" "),
	});
//message.channel.send("sid: " + message.guild.id + " mid: " + message.member.user.id + "aid: " + message.author.id + "\n" + message.guild.members.cache.get(message.member.user.id).user.username);
	return message.reply(`Note added.`);
}
catch (e) {
  console.log(e);
	if (e.name === 'SequelizeUniqueConstraintError') {
		return message.reply('That tag already exists.');
	}
	return message.reply('Something went wrong with adding a tag.');
}
	}, };