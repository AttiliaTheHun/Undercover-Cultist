/**server.js
* App entry point
* This file contains the logic behind handling commands and events
*/

const express = require("express");
const sequelize = require("./db/models/index.js");

const config = require("./config.json");


const app = express();
let prefix = config.prefix;
const token = process.env.TOKEN;
const client = require('./util/InitClient.js');

const utils = require("./util/utils.js"); 

client.once("ready", () => {
  console.log(`Bot running: ${client.user.tag}`);
  let status = 0;
  const STATUS_CHANGE_INTERVAL = 15 * 1000;
  setInterval(async function () {
    switch (status) {
    case 0:
      // let prefix = await utils.getConfig(sequelize, Config, 'prefix', true);
      client.user.setActivity(`${prefix}help`, { type: "LISTENING" });
      status = 1;
      break;
    case 1:
      client.user.setActivity("Someone on the inside", { type: "WATCHING" });
      status = 2;
      break;
    case 2:
      client.user.setActivity("Underhand", {
        type: "PLAYING",
        url: "http://underhand.tk"
      });
      status = 0;
      break;
    }

  }, STATUS_CHANGE_INTERVAL);
});



client.on("message", async message => {
  let args;

  if (message.content.toLowerCase().includes("goose")) {
    message.channel.send("Honk!");
  }

  if( await utils.isGuildIgnored(message.guild)){
    return;
  }

  if( await utils.isChannelIgnored(message.channel)){
    return;
  }

  // ignore bots
  if (message.author.bot) {
    return;
  }
  /**
  * DM messages can not work as commands since DM channels are quite specific and lot of
  * features may not work in the expected way. DM channels are used for some sort of 
  * role-play instead ;)
  */
  if(message.channel.type == "dm"){
    utils.handleDM(message);
    return;
  }

  //let prefix = await utils.getConfig(sequelize, Config, 'prefix', true);
  let nickname = message.guild.members.cache.get(client.user.id).nickname;
  if(nickname && nickname.includes(client.user.username)){
    prefix = nickname.substring(0, nickname.indexOf(client.user.username));
  }else{
    prefix = config.prefix;
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

  if( await utils.isCommandIgnoredInChannel(commandName, message.channel)){
    return;
  }
  
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command)
    return
 

    if ( await utils.isBanned(message.author.id, message.guild.id)) {
      await utils.logMessageIgnore(message);
      return;
    }
 
  if (command.master && ! await utils.isMaster(message.author.id)) {
        await utils.logMessageIgnore(message);
        return;
  }

  try{
    let execution_status = await command.execute(message, args, utils );
     if (execution_status) {
      await utils.logCommandError(message, execution_status, commandName);
      message.channel.send("Something went wrong");
    } else {
      await utils.logCommand(message, args, commandName);
    }
      
    }catch(err){
        console.log(err);
        await utils.logCommandError(message, err, commandName);
        message.channel.send("Something went very wrong");  
    }

});

/**
* When the bot is added to a new server, send a "welcome"
* message and log the event
*/

client.on("guildCreate", async guild => {
  console.log("Joined a new guild: " + guild.name);

  let channelID;

  const channels = guild.channels.cache.get;
  channelLoop:
  for (const c of Object.keys(channels)) {
    const channelType = c[1].type;
    if (channelType === "text") {
      channelID = c[0];
      break channelLoop;
    }
  }

  const channel = guild.channels.cache.get(guild.systemChannelID || channelID);
  channel.send("Don't mind me, I am not here. Really.");
  /* const role = guild.roles.cache.find(role => role.name === 'Undercover Cultist');
     role.setColor("#005e1f");*/
  await utils.logGuildCreate(guild);
});

/**
* When the bot is removed from a server, log the event
*/
client.on("guildDelete", async guild => {
  await utils.logGuildRemove(guild);
});

process.on("uncaughtException", async (err) => {
  console.error(err);
  await utils.logError(err);
});



client.login(token);


/**
* Create an express router to make the app
* listen for http requests, for the purposes of
* waking it up and showing a help page
*/
app.use(require("./public/router.js"));
app.use(express.static("public"));
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
//module.exports = client;