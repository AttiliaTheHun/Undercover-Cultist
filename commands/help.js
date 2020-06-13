const Discord = require('discord.js');
module.exports = {
  name: "help",
  description: "Show options within embed.",
  execute(message, args, client) {
    
    const config = require(__dirname.substr(0, __dirname.length - 8) +
      "./config.json");
    const prefix = config.prefix;
    
    
    const embed = new Discord.MessageEmbed()
      .setColor('#005E1F')
    .setAuthor('Undercover Cultist')
    .setTitle('List of commands')
    .setDescription(`Before every command use \'${prefix}\' prefix.`)
    .addField(`card (number) => \'${prefix} card 90\'`,'Sends event card specified by it\'s number')
    .setTimestamp()
    .setFooter('We could benefit from having someone on the inside', client.user.avatarURL());
    message.channel.send({ embed: embed });
  }
};
