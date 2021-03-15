const Discord = require("discord.js");
module.exports = { 	
  name: 'log', 
  syntax: 'log [message][args][client][Config][type][command][error][guild]', 	
  description: "Creates a log message",
  note: "This command is for internal purposes only and should not be used directly",
  permissions: "",
  master: true,
  aliases: [],
  legend: "x",
  async execute(message, args, client, Config, type, command, error, guild) { 	
   /* let log_guild_id;
    let complete_log_channel_id;
    let event_log_channel_id;
    
    const config1 = await Config.findOne({ where: {name: "log_guild"}});
        if (config1) {
          log_guild_id = config1.get('value');
        }
    const config2 = await Config.findOne({ where: {name: "complete_log_channel"}});
        if (config2) {
          complete_log_channel_id = config2.get('value');
        }
    const config3 = await Config.findOne({ where: {name: "event_log_channel"}});
        if (config3) {
          event_log_channel_id = config3.get('value');
        }
    console.log(log_guild_id)
    console.log(complete_log_channel_id)
    console.log(event_log_channel_id)*/
    const log_guild = await client.guilds.cache.get(/*log_guild_id |*/ '714932914089099335');
    const complete_log_channel = await log_guild.channels.cache.get(/*complete_log_channel_id |*/ '806437144653856789');
    const event_log_channel = await log_guild.channels.cache.get(/*event_log_channel_id |*/ '806437179999780924');
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
      case 'ignored':
        log_event = false;
        embed.setTitle('Ignored message');
        embed.setColor('#F7F7F7');
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