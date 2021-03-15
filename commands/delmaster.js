const Discord = require("discord.js");
module.exports = { 	
  name: 'delmaster', 	
  syntax: 'delnote [mention]/[id]',
  description: "Removes the Master status from the user",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases:  ["deletemaster", "remmaster", "removemaster"],
  legend: "mention, id",
  async execute(message, args, client, Config, Masters, Bans, Notes) { 		
    
    let id
    let member;
    if(!isNaN(args[0])){
      id = args[0];
	    member = await message.guild.members.fetch(id);
      if(member == undefined){
        message.reply("This ID does not seem to belong to any member of this guild");
      }
    }else{
      if(!message.content.includes("<@")){
        message.reply("I can't identify the user from this, sorry");
      }
      member = message.mentions.members.first();
      id = member.id;
    } 	
    
    const rowCount = await Masters.destroy({ where: { user: id} });
    if (!rowCount){
      message.reply('That user was not a bot Master.');
    } 

    message.reply('This user is no longer a bot Master.');
    return;  
    
	}, };