const Discord = require("discord.js");
module.exports = { 	
  name: 'credits', 	
  description: 'credits [nothing]', 
  action: "sends embed with credits",
  note: "",
  legend: "nothing",
  execute(message, args) { 		

    const embed = new Discord.MessageEmbed() 	
    .setColor('#ffbc03') 	
    .setTitle('Credits')		
    .setDescription('The bot was made by AttilaTheHun#9489 for the Underhand server') 		
    .addField('Language', 'node.js', true) 	 	
    .addField('Library','discord.js', true) 	
	.addField('IQ', '69', true)
	.addField('Invite', '[link](https://discord.com/api/oauth2/authorize?client_id=672748100007362561&permissions=469892166&scope=bot)', true)
   .addField('Support Server', '[link](<https://discord.gg/PcS56ck>)', true)
    .addField('Created', '28.5.2020', true)
	 	.setTimestamp() 	
	.setFooter('Undercover Cultist#5057', ''); 
      message.channel.send(embed);

	}, };