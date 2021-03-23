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

   let commandName = args.shift().toLowerCase(); 
   const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if(command.master){
      message.channel.send("True");
    }else{
      message.channel.send("False");
    }
    
    
  }, };