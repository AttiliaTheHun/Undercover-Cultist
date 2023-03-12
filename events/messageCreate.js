
module.exports = async (client, message) => {
let args;
const {prefix} = require("../config.json");
const {silent_errors} = require("../constants/silent_errors.js");
 
  // ignore bots
  if (message.author.bot) {
      return;
  }

  if (message.content.toLowerCase().includes("goose")) {
     message.channel.send("Honk!");
  }
  
  /**
  * DM messages can not work as commands since DM channels are quite specific and lot of
  * features may not work in the expected way. DM channels are used for some sort of 
  * role-play instead ;)
  */
  if(message.channel.type == "DM"){
    client.logger.dm(message);
    if (await client.utils.getConfig("dm_engine_enabled")) {
      client.talkEngine.dm(message);
    }
    return;
  }
  
  /*
  * Check if message is meant for this bot, by checking if it starts with the bot's
  * prefix or bot's mention
  */
  const cases = [prefix, prefix.trim(), `<@${client.user.id}>`, `<@!${client.user.id}>`];
  let match = false;

  for (const type of cases) {
    if (message.content.toLowerCase().startsWith(type)) {
      args = message.content.slice(type.length).trim().split(/ +/);
      match = true;
      break;
    }
  }
  
  //ingore other messages
  if (!match)
    return

  const commandName = args.shift().toLowerCase();

 if (await client.utils.isBanned(message.author.id, message.guild.id)) {
      await client.logger.messageIgnored(message);
      return;
  }
  
  const command = await client.commands.get(commandName) || await client.aliases.get(commandName);

  if (!command)
    return
  
  let result = await client.utils.isMaster(message.author.id);
  //console.log(result);
  if (command.master) {
    if(!result){
        await client.logger.messageIgnored(message);
        return;
    }
  }  
  
  if( await client.utils.isGuildIgnored(message.guild)){
        await client.logger.messageIgnored(message);
        return;
  }

  if( await client.utils.isChannelIgnored(message.channel)){
        await client.logger.messageIgnored(message);
        return;
  }

  //let prefix = await utils.getConfig(sequelize, Config, 'prefix', true);

  if( await client.utils.isCommandIgnoredInChannel(commandName, message.channel)){
    await client.logger.messageIgnored(message);
    message.channel.send("Not in this channel please");
    return;
  }

  try{
    message.client.utils.checkClientPermissions(message, command.clientPermissions, {});
    message.client.utils.checkUserPermissions(message.member, command.userPermissions);
    
    await command.execute(message, args, client.utils );
    await client.logger.command(message, args, commandName);

    }catch(err){
        console.log(err);
        if (silent_errors.includes(err.name)){
             await client.logger.command(message, args, commandName);
             return message.channel.send(err.message);
        }
        await client.logger.commandError(message, err, commandName);
        message.channel.send("Something went wrong");  
    }
}