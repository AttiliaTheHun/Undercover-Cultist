const Discord = require('discord.js');
const prefix = require('./../config.json').prefix;
module.exports = {
  name: "help",
  syntax: "help \"\"/[command]",
  description: "Shows help message",
  note: "",
  permissions: "",
  master: false,
  aliases: ["commands", "hehelp"],
  legend: "",
  execute(message, args, client) {
    
 try{
      let name;
      let syntax;
      let description;
      let note;
      let permissions;
      let aliases;
      let legend;

      let embed = new Discord.MessageEmbed() 	
    .setColor('#005E1F') 
    try{
      name = client.commands.get(args[0]).name;
      syntax = prefix + client.commands.get(args[0]).syntax;
      description = client.commands.get(args[0]).description;
      note = client.commands.get(args[0]).note;
      permissions = client.commands.get(args[0]).permissions;
      aliases = client.commands.get(args[0]).aliases;
      legend = client.commands.get(args[0]).legend;
 
      legend = legend.replace("god", "[god] god name or it's number");
      legend = legend.replace("number", "[number] an integer in range of the numbers in parenthesis");   
      legend = legend.replace("id", "[id] user id, for example 672748100007362561");
      legend = legend.replace("mention", "[mention] user mention, for example <@672748100007362561>")
      legend = legend.replace("username", "[username] user name and his tag, for example Undercover Cultist#5057");
      legend = legend.replace("uce-formatted-text", "[uce-formatted-text] a text that is processed by special formatting");
      legend = legend.replace("blessings", "[blessings] string containing first letters of target gods names, for example ykj");
   
      embed.addField(name, syntax, false);
      embed.addField("Description", description, false);
      if(note != ""){
        embed.addField("Note", note, false);
      }
      if(permissions != ""){
        embed.addField("Permissions needed", permissions, false);
      }
      if(aliases != ""){
        embed.addField("Aliases", aliases.join(", "), false);
      }
      if(legend != ""){
        embed.addField("Legend", legend, false);
      }
    }catch(err2){
      embed.setTitle("My Commands")
      embed.setDescription(`Don't forget to use my prefix (${prefix}) before every command! You can also use *help [command]* to gain more precise info.`)
      embed.addField("Texture commands", "card cardback option god winscreen losescreen", false)
      embed.addField("Informative commands", "server user event events credits", false)
      embed.addField("Utility commands", "addnote delnote notes clearnotes embed ban unban kick setnickname generate play", false)      

   }
	 	embed.setTimestamp() 	
    .setFooter('We could benefit from having someone on the inside', client.user.avatarURL()); 
    message.channel.send(embed);
       
     }catch(err){
        message.channel.send('yay, this seems not to work');
        return err;
    }
  }
    
 
};
