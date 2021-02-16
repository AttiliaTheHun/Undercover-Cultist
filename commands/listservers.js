const Discord = require("discord.js");
module.exports = { 	
  name: 'listservers', /*	
  description: 'dm [mention]/[id] [message]', 	
  action: "Sends a Direct Message to the target user",
  note: "you need the `BAN_MEMBERS` and `MANAGE_MESSAGES` permission for this command",
  legend: "mention, id",*/
  execute(message, args, client) { 		
  let servers = client.guilds.cache.array();
    for(let server of servers){
      let embed = new Discord.MessageEmbed()
      .setColor('#FFBC03')
      .addField('Name', server.name, false)
      .addField('ID', server.id, false)
      .addField('Owner', server.owner.user.username + "#" + server.owner.user.discriminator, false)
      .addField('Members', server.memberCount, false);
      message.channel.send(embed);
    }
  }, };