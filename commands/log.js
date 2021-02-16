const Discord = require("discord.js");
module.exports = { 	
  name: 'log', /*	
  description: 'dm [mention]/[id] [message]', 	
  action: "Sends a Direct Message to the target user",
  note: "you need the `BAN_MEMBERS` and `MANAGE_MESSAGES` permission for this command",
  legend: "mention, id",*/
  execute(message, args, client, type, command, error, guild) { 		
    const log_guild = client.guilds.cache.get('714932914089099335');
    const complete_log_channel = log_guild.channels.cache.get('806437144653856789');
    const event_log_channel = log_guild.channels.cache.get('806437179999780924');
    let log_event = true;
    let embed = new Discord.MessageEmbed() 	
    switch (type){
      case 'error':
        embed.setTitle('Error');
        embed.setColor('#A83436');
        break;
      case 'guild_added':
        embed.setTitle('Guild Added');
        embed.setColor('#FFBC03');
        break;
      case 'guild_removed':
        embed.setTitle('Guild Removed');
        embed.setColor('#000000');
        break;
      case 'command':
        log_event = false;
        embed.setTitle('Command');
        embed.setColor('#005E1F');
        break;
      default:
        embed.setTitle('N/A');
        embed.setColor('#48CECE');
        embed.addField('Type', type, false);
    }
    if(message){
    embed.addField('Message', message, false);
    embed.addField('User', message.member.user.username + '#' + message.member.user.discriminator, false);
    embed.addField('Server', message.guild.name, false);
    embed.addField('ServerID', message.guild.id, false);
    
    }
      if(!(args === undefined || args.length == 0)){
    embed.addField('Args', args.join(" "), false);
      }
        if(command){
    embed.addField('Command', command, false);
        }   
    if(guild){
      embed.addField('Guild', guild.name, false);
      embed.addField('GuildID', guild.id, false);
      embed.addField('Owner', guild.owner.user.username + "#" + guild.owner.user.discriminator, false);
      embed.addField('GuildMemberCount', guild.memberCount, false);
    }
    if(error){
      embed.addField('Error', error, false);
    }
  try{
    complete_log_channel.send(embed).catch(err => {
      complete_log_channel.send('```\n**Log Error**\n' + err + '```')
    complete_log_channel.send('```\n**Type**\n' + type + '```')
    complete_log_channel.send('```\n**Message**\n' + message + '```')
    complete_log_channel.send('```\n**Args**\n' + args + '```')
    complete_log_channel.send('```\n**Command**\n' + command + '```')  
    if(guild){
      complete_log_channel.send('```\n**Guild**\n' + guild.name + ':' + guild.id + '```')
      complete_log_channel.send('```\n**GuildMemberCount**\n' + guild.memberCount +  '```')
    }
    if(error){
      complete_log_channel.send('```\n**Error**\n**' + error.name + ":" + error.message + '```')
    }
      
    });
    if(log_event){
      event_log_channel.send(embed);
    }
  }catch(err){
    console.log(err);
  }
  }, };