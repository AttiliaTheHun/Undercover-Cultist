const Discord = require('discord.js');
module.exports = { 	
  name: 'test', 	
  syntax: 'no stable syntax', 	
  description: "no stable description",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: [],
  legend: "",
  async execute(message, args, client, Config, Masters, Bans, Notes) { 		

    const rowCount = await Bans.destroy({ where: {global: true} });
    if (!rowCount){
      message.reply('Glubal Bans Clear.');
      return;
    } 

    message.reply('Nothing.');
    return;  
    
    
  }, };