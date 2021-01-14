const Discord = require("discord.js");
module.exports = { 	
  name: 'embed', 	
  description: 'embed [input]', 
  action: "creates embed from the input",
  note: "",
  legend: "input",
  execute(message, args) { 		
	const embed = new Discord.MessageEmbed()
  .setTitle("Invite")
  .setDescription("Do you want to infiltrate another server? Just tap this link:[link](<https://discord.com/api/oauth2/authorize?client_id=672748100007362561&permissions=604503105&scope=bot)")
	message.channel.send(embed);
	}, };