/**server.js
*App entry point
*This file contains the logic behind
*handling commands and events
*/
const fs = require("fs");
const Discord = require("discord.js");
const Sequelize = require("sequelize");
const express = require("express");
const config = require("./config.json");

const app = express();
const prefix = config.prefix;
const token = process.env.TOKEN;
const client = new Discord.Client();

/**
* Create a Collection of all the bot commands
* to easily access their properties
*/
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

/**
* Initialize the database driver for remote
* MySQL database connection
*/
const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
  host: process.env.db_server,
  port: process.env.db_port,
  dialect: "mysql",
  logging: console.log
});

/* Initialize the database models
*/
const Config = sequelize.define("Config", {
  name: {
    type: Sequelize.STRING,
    unique: false
  },
  value: {
    type: Sequelize.STRING,
    unique: false
  },
  last_updated_by: {
    type: Sequelize.STRING(20),
    unique: false
  }
});

const Masters = sequelize.define("Masters", {
  user: {
    type: Sequelize.STRING(20),
    unique: true
  },
  promoted_by: {
    type: Sequelize.STRING(20),
    unique: false
  },
  date: {
    type: Sequelize.STRING,
    unique: false
  }
});

const Bans = sequelize.define("Bans", {
  server: {
    type: Sequelize.STRING(20),
    unique: false
  },
  global: {
    type: Sequelize.BOOLEAN,
    unique: false
  },
  user: {
    type: Sequelize.STRING(20),
    unique: false
  },
  banned_by: {
    type: Sequelize.STRING(20),
    unique: false
  },
  date: {
    type: Sequelize.STRING,
    unique: false
  },
  reason: {
    type: Sequelize.STRING(600),
    unique: false
  }
});

const Notes = sequelize.define("Notes", {
  server: {
    type: Sequelize.STRING(20),
    unique: false
  },
  author: {
    type: Sequelize.STRING(20),
    unique: false
  },
  date: {
    type: Sequelize.STRING,
    unique: false
  },
  note: {
    type: Sequelize.STRING(600),
    unique: false
  }
});

/**
* When the client is ready, sync the database models
* and set a custom status
*/
client.once("ready", () => {
  Config.sync();
  Masters.sync();
  Bans.sync();
  Notes.sync();
  console.log(`Bot running: ${client.user.tag}`);
  let status = 0;
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

  }, 15000);
});


/**
* When the bot notices a message was sent, check
* sender's credibility, exexute commands and perform other actions
*/
client.on("message", async message => {
  let args;

  if (message.content.toLowerCase().includes("goose")) {
    message.channel.send("Honk!");
  }

  // ignore bots
  if (message.author.bot) {
    return;
  }

  //let prefix = await utils.getConfig(sequelize, Config, 'prefix', true);

  /*
  * Check if message is meant for this bot,
  * by checking if it starts with the bot's prefix or bot's mention
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
  let execution_status;
  //find whether the target command does exist
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  // Stop carring as soon as the command does not exist
  if (!command)
    return
  /**
  * Check if the user is not prohibited from bot's usage
  */
  const [bans, metadata] = await sequelize.query(`SELECT * FROM Bans WHERE (server = '${message.guild.id}' AND user = '${message.author.id}' AND global = false) OR (user = '${message.author.id}' AND global = true);`)
  if (bans) {
    //And ignore him, if so
    if (bans.length > 0) {
      await client.commands.get("log").execute(message, undefined, client, Config, "ignored");
      return;
    }
  }
  /**
  * If the command is master command, check if the user
  * is a bot master
  */
  if (command.master && message.author.id != config.default_master) {
    const [results2, metadata2] = await sequelize.query(`SELECT * FROM Masters WHERE user = '${message.author.id}' ;`)
    if (results2) {
      // and ignore him if not
      if (results2.length == 0) {
        await client.commands.get("log").execute(message, undefined, client, Config, "ignored");
        return;
      }
    }

  }

  try {
    /**
    * If the command raises an unexpected exception or error
  * (wrong user input is expected), the execution_status will hold
  * this error to forward it to the logging utility
    */
    execution_status = await command.execute(message, args, client, Config, Masters, Bans, Notes, sequelize);

    /**
    * In case of no errors the execution_status will remain
    * undefined and won't pass the if statement
    */
    if (execution_status) {
      await client.commands.get("log").execute(message, args, client, Config, "error", commandName, execution_status);
      message.channel.send("Something went wrong");
    } else {
      await client.commands.get("log").execute(message, args, client, Config, "command", commandName);
    }

  } catch (err1) {
    await client.commands.get("log").execute(message, args, client, Config, "error", commandName, err1);
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
  await client.commands.get("log").execute(undefined, undefined, client, "guild_added", undefined, undefined, guild);
});

/**
* When the bot is removed from a server, log the event
*/
client.on("guildDelete", async guild => {
  await client.commands.get("log").execute(undefined, undefined, client, "guild_removed", undefined, undefined, guild);

});

process.on("uncaughtException", (err) => {
  console.log(err);
  client.commands.get("log").execute(undefined, undefined, client, "error", undefined, err);
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