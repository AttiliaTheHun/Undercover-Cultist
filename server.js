/*server.js
App entry point
This is where commands and events are handled
*/
/*import */
const express = require("express");
const fs = require("fs");
const Discord = require('discord.js'); 
const Sequelize = require('sequelize');

const app = express();
 const prefix = require('./config.json').prefix; //get bot prefix
const token = process.env.TOKEN; //get bot token
const client = new Discord.Client(); //create discord client
const TalkEngine = require('./util/TalkEngine.js');
//const utils = require('./util/utils.js');
//initialize bot commands
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`); 		
  client.commands.set(command.name, command); 
}



const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

/* Initialize the database models
*/
const Config = sequelize.define('Config', {
  name:{
    type: Sequelize.STRING,
    unique: false
  },
	value:{
    type: Sequelize.STRING,
    unique: false
  },
  last_updated_by: {
		type: Sequelize.STRING(20),
		unique: false
	}
});

const Masters = sequelize.define('Masters', {
	user:{
    type: Sequelize.STRING(20),
    unique: true
  },
  promoted_by: {
		type: Sequelize.STRING(20),
		unique: false
	},
  date:{
    type: Sequelize.STRING,
    unique: false
  }
});

const Bans = sequelize.define('Bans', {
  server:{
    type: Sequelize.STRING(20),
    unique: false
  },
	global:{
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
  date:{
    type: Sequelize.STRING,
    unique: false
  },
	reason:{
    type: Sequelize.STRING(600),
    unique: false
  }
});

const Notes = sequelize.define('Notes', {
	server:{
    type: Sequelize.STRING(20),
    unique: false
  },
  author: {
		type: Sequelize.STRING(20),
		unique: false
	},
  date:{
    type: Sequelize.STRING,
    unique: false
  },
	note:{
    type: Sequelize.STRING(600),
    unique: false
  }
});

//when client is ready
client.once('ready', () => { 	
  Config.sync();
  Masters.sync();
  Bans.sync();
  Notes.sync();
  console.log(`Bot running: ${client.user.tag}`);
  let status = 0;
   setInterval(function () {
    switch (status) {
      case 0 :   
        client.user.setActivity(`${prefix}help`, { type: 'LISTENING' });
        status = 1;
        break;
      case 1 :   
        client.user.setActivity(`Someone on the inside`, { type: 'WATCHING' });
        status = 2;
        break;
      case 2 :   
        client.user.setActivity("Underhand", {
            type: "PLAYING",
            url: "http://underhand.tk"
        } );
        status = 0;
        break;
    }

  }, 15000);
  });



  /*This is where the commands are handled,
  when the bot sees a message was sent
  */
 client.on('message', async message => {
  let args;

if(message.content.toLowerCase().includes(`goose`)){
	message.channel.send(`Honk!`);
} 
  if(message.channel.type === 'dm' && !message.author.bot){
    TalkEngine.dm(message);
    return;
      }
  // ignore another bots
if (message.author.bot){ 
  return; 
}
   
   
   
   let cases = [prefix, prefix.trim(), `<@${client.user.id}>`, `<@!${client.user.id}>`];
   let match = false;
   for(let type of cases){
     if(message.content.toLowerCase().startsWith(type)){
       args = message.content.slice(type.length).trim().split(/ +/); 
       match = true;
       break;
       }
   }

   if(!match)
     return
   
 /*  const bans = await Bans.findAll({ where: { global: true } || { server: message.guild.id, global: false } });
      if (bans) {
  if(bans.length > 0){
    let id;
    for(let i = 0; i < bans.length; i++){
      id = bans[i].get('user');
      if(id = message.author.id){
        await client.commands.get('log').execute(message, undefined, client, Config, 'ignored');
        /*message.channel.send("This user is banned");
        return;
      }
    }
  }
      }*/
   
   
    //get what command was called
	let commandName = args.shift().toLowerCase(); 
  let execution_status;
    //handle commands
         const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
 // Return if the command doesn't exist
  if (!command)
    return
        try{
        execution_status = await command.execute(message, args, client, Config, Masters, Bans, Notes);
  
        if(execution_status){
         await client.commands.get('log').execute(message, args, client, Config, 'error', commandName, execution_status);
         message.channel.send("Something went wrong");
        }else{
       await client.commands.get('log').execute(message, args, client, Config, 'command', commandName);
      }
      
   }catch(err1) {
    await client.commands.get('log').execute(message, args, client, Config, 'error', commandName, err1);
     message.channel.send("Something went very wrong");
   }
});

  
  client.on("guildCreate", async guild => {
    console.log("Joined a new guild: " + guild.name);

      let channelID;
  
    let channels = guild.channels.cache.get;
    channelLoop:
    for (let c of Object.keys(channels)) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }
 
    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
channel.send('Don\'t mind me, I am not here. Really.');
/* const role = guild.roles.cache.find(role => role.name === 'Undercover Cultist');
   role.setColor("#005e1f");*/
//await client.commands.get('log').execute(undefined, undefined, client, 'guild_added', undefined, undefined, guild);
});
  

client.on("guildDelete", async guild => {
//await client.commands.get('log').execute(undefined, undefined, client, 'guild_removed', undefined, undefined, guild);

});

process.on('uncaughtException', (err) => {
 // await client.commands.get('log').execute(undefined, undefined, client, 'error', undefined, err);
});

  //login the client
 client.login(token);
 

 


// make the server look http
app.use(require('/public/router.js'));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});