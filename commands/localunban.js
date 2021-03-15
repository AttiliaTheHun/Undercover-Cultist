const Discord = require("discord.js");
module.exports = { 	
  name: 'localunban', 	
  syntax: 'localunban [mention]/[id]',
  description: "Removes the local ban status from the user",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["lunban"],
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
    
    const rowCount = await Bans.destroy({ where: { user: id, global: false} });
    if (!rowCount){
      message.reply('That user was not locally banned.');
      return;
    } 

    message.reply('This user is no longer locally banned.');
    return;  
    
	}, };