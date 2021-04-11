const utils = require('../util/utils.js');
const Discord = require("discord.js");
module.exports = { 	
  name: 'globalunban', 	
  syntax: 'globalunban [mention]/[id]',
  description: "Removes the global ban status from the user",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["gunban"],
  legend: "mention, id",
  category: "administrative",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) { 		
    
   let user = await utils.resolveUser(message, args);
  if(user == undefined){
    return message.channel.send("Could not find the user.")
  }
    
    const [result, metadata] = await sequelize.query(`DELETE FROM Bans WHERE user = '${user.id}' AND global = true;`);
    if (!result){
      message.reply('That user was not globally banned.');
      return;
    } 

    message.reply('This user is no longer globally banned.');
    return;  
    
	}, };