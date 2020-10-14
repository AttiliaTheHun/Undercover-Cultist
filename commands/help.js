const Discord = require('discord.js');
module.exports = {
  name: "help",
  description: "Show options within embed.",
  execute(message, args, client) {
    
    const config = require(__dirname.substr(0, __dirname.length - 8) +
      "./config.json");
    const prefix = config.prefix;
    let embed;
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
  
    }else{ 
     embed = new Discord.MessageEmbed()
      .setColor('#005E1F')
    .setAuthor('Undercover Cultist')
    .setTitle('List of commands')
    .setDescription(`Use **${prefix} help textures** to get texture-giving commands\nBefore every command use \'${prefix}\' prefix. You can look on the bot's page for further infomations: http://underhand.clanweb.eu/undercover_cultist`)
   .addField(`invite => \'${prefix} invite\'`,'Sends bot invite link')
      .addField(`server => \'${prefix} server\'`,'Sends latest server report')
      .addField(`user (usertag)=> \'${prefix} user Null#0000\'`,'Sends latest report about the user')
    .setTimestamp()
    .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
  }
    message.channel.send({ embed: embed });
  }
};
