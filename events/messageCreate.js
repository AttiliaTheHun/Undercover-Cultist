
module.exports = async (client, message) => {
let args;
const {prefix} = require("../config.json");
  
 
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
    client.utils.handleDM(message);
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
      await client.logger.messageIgnore(message);
      return;
  }
  
  const command = await client.commands.get(commandName) //|| await client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command)
    return
  
  if (command.master && ! await client.utils.isMaster(message.author.id)) {
        await client.logger.messageIgnore(message);
        return;
  }  
  
  if( await client.utils.isGuildIgnored(message.guild)){
    return;
  }

  if( await client.utils.isChannelIgnored(message.channel)){
    return;
  }

  //let prefix = await utils.getConfig(sequelize, Config, 'prefix', true);

  if( await client.utils.isCommandIgnoredInChannel(commandName, message.channel)){
    message.channel.send("Not in this channel please");
    return;
  }

  try{
    let execution_status = await command.execute(message, args, client.utils );
     if (execution_status) {
      await client.logger.commandError(message, execution_status, commandName);
      message.channel.send("Something went wrong");
    } else {
      await client.logger.command(message, args, commandName);
    }
      
    }catch(err){
        console.log(err);
        await client.logger.commandError(message, err, commandName);
        message.channel.send("Something went very wrong");  
    }
}