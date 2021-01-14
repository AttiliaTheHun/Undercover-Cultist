const Discord = require('discord.js');
const prefix = require('./../config.json').prefix;
module.exports = {
  name: "help",
  description: "help [nothing]/[command]",
  action: "shows help message",
  note: "",
  legend: "nothing",
  execute(message, args, client) {
    
 try{
      let action;
      let note;
      let legend;
      let name;
      let description;
      let field1;
      let field2;
      let field3;
        let embed = new Discord.MessageEmbed() 	
    .setColor('#005E1F') 
    try{
      name = client.commands.get(args[0]).description;
      action = client.commands.get(args[0]).action;
      note = client.commands.get(args[0]).note;
      legend = client.commands.get(args[0]).legend;
      description = `Don't forget to use my prefix (${prefix}) before every command!`		
      field1 = "Performs Action";
      field2 = "Note";
      field3 = "Legend";
      legend = legend.replace("note", "[note] means string of data, text");
      legend = legend.replace("god", "[god] means god name or number");
      legend = legend.replace("number", "[number] means integer in range of 0 - 119 excluded");
     // legend = legend.replace("code", "[code] means in-game code of the player");      
      legend = legend.replace("nothing", "[nothing] means that command can be run without any arguments");
      legend = legend.replace("id", "[id] means user id, for example 672748100007362561");
      legend = legend.replace("mention", "[mention] means user mention, for example <@672748100007362561>")
      legend = legend.replace("username", "[username] means user name and his tag, for example Undercover Cultist#5057");
      // legend = legend.replace("date", "[date] means the date that will be saved as starting date and appears in info message of the target tournament");
    }catch(err2){
       name = "I will help to everyone who asks.";
      action = "card cardback option god winscreen losescreen";
      note = "server user events credits";
      legend = "addnote delnote notes clearnotes embed event ban unban kick dm setnickname generate";      
      description = `Don't forget to use my prefix (${prefix}) before every command! You can also use *help [command]* to gain more precise info.`;		   
      field1 = "Texture commands";
      field2 = "Informative commands";
      field3 = "Utility commands";
    }
      
     	embed
    .setTitle(name)		
      .setDescription(description)
    .addField(field1, action, false);
   if(note != ""){
    embed.addField(field2, note, false) 	
   }
     if(legend != ""){
	embed.addField(field3, legend, false)
   }
	//.addField('Need human help?', 'Ask AttilaTheHun#9489', true)
	 	embed.setTimestamp() 	
.setFooter('We could benefit from having someone on the inside', client.user.avatarURL()); 
      message.channel.send(embed);
      
      
      
      
      
     }catch(err){
    message.channel.send('yay, this seems not to work');
       console.log(err);
    }
  }
    
   /* let embed;
    if(args[0] == "textures"){
       embed = new Discord.MessageEmbed()
         .setColor('#005E1F')
    .setAuthor('Undercover Cultist')
    .setTitle('List of texture commands')
       .addField(`card (number) => \'${prefix} card 90\'`,'Sends event card specified by it\'s number')
     .addField(`cardback => \'${prefix} cardback\'`,'Sends carback texture')
     .addField(`option (active/dormant/ready/back/down) => \'${prefix} option ready\'`,'Sends option card specified by it\'s state')
    .addField(`god (number, thumbnail)=> \'${prefix} god 5\'`,'Sends god texture or thumbnail if second argument is given')
    .addField(`godlist => \'${prefix} godlist\'`,'Sends ordered list of gods for simpler **god** command usage')
       .setTimestamp()
    .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  
    }else if(args[0] == "play"){
       embed = new Discord.MessageEmbed()
      .setColor('#005E1F')
    .setAuthor('Undercover Cultist')
    .setTitle('Play')
    .setDescription(`Type **${prefix} play** to play Underhand`)
   .addField(`argument1`,'*play* or *load*: play to start a new game, load to load a game from data string', true)
      .addField(`argument2`,'*play* => blessings(g/r/w/j/k/y/u), *load* => data string')
      .addField(`How to play`,'Respond with *1*\/*a*, *2*\/*b*, *3*\/*c* to select options 1, 2, 3')
    .addField(`How to save the game`,'Respond with *save* and then copy the data string. You can then load it with the *load* argument to continue playing')      
       .setTimestamp()
    .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
 
      
      
    }else{ 
     embed = new Discord.MessageEmbed()
      .setColor('#005E1F')
    .setAuthor('Undercover Cultist')
    .setTitle('List of commands')
    .setDescription(`Use **${prefix} help textures** to get texture-giving commands\nBefore every command use \'${prefix}\' prefix. You can look on the bot's page for further infomations: http://underhand.clanweb.eu/undercover_cultist`)
   .addField(`invite => \'${prefix} invite\'`,'Sends bot invite link')
      .addField(`server => \'${prefix} server\'`,'Sends latest server report')
      .addField(`user (usertag)=> \'${prefix} user Null#0000\'`,'Sends latest report about the user')
    .addField(`play (play/load) (blessings)=> \'${prefix} play p ky\'`,'Iniciates The game')      
       .setTimestamp()
    .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  }
    message.channel.send({ embed: embed });*/
};
