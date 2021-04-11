const utils = require('../util/utils.js');
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
  category: "administrative",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) { 		
    
   let user = await utils.resolveUser(message, args);
  if(user == undefined){
    return message.channel.send("Could not find the user.")
  }
    
    const [result, metadata] = await sequelize.query(`DELETE FROM Bans WHERE user = '${user.id}' AND global = false;`);
    if (!result){
      message.reply('That user was not locally banned.');
      return;
    } 

    message.reply('This user is no longer locally banned.');
    return;  
    
	}, };