/*
server.js
app entry point
*/
// init project
//create imports and constants
const express = require("express");
const fs = require("fs");
const app = express();
const Discord = require('discord.js'); 
const Sequelize = require('sequelize');
 const prefix = require('./config.json').prefix; //get bot prefix
const token = process.env.TOKEN; //get bot token
const client = new Discord.Client(); //create discord client
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
    type: Sequelize.STRING(2000),
    unique: false
  }
});



//when client is ready
client.once('ready', () => { 	
  Notes.sync();
  console.log(`Bot running: ${client.user.tag}`);
client.user.setActivity(`${prefix} help | Someone on the inside`);  
 /*  client.user.setActivity({
     status: `${prefix} help | Someone on the inside`,
        activity: {
            name: 'Underhand',
            type: "PLAYING",
            url: "http://underhand.clanweb.eu"
        }
    }); */
  });



  //when message was sent
 client.on('message', async message => {
  let args = null;
    let command = null;
  try{
if(message.content.toLowerCase().includes(`goose`)){
	message.channel.send(`Honk!`);
} if(message.content.toLowerCase().includes(`undercover cultist`) || message.mentions.members != null && message.mentions.members.first() == client.user.id){
	message.channel.send(`Shhh, ${message.author.username}, I do not want to be exposed!`);
} 
  if(message.channel.type === 'dm' && !message.author.bot){
        if(message.content.toLowerCase().includes("neither should you")){
          message.channel.send("I see you are a man of culture. Very well!");
        }else{
          message.channel.send("You shouldn't be here.");
        }
      }else{
  //check if prefix was called and ignore another bots
if (!message.content.startsWith(prefix) && !message.content.startsWith(prefix.trim()) || message.author.bot) 
return; 
  
  //remove the prefix from the message
  if(message.content.startsWith(prefix)){
	 args = message.content.slice(prefix.length).split(/ +/); 
    //remove prefix with whitespaces from the message
  }else if(message.content.startsWith(prefix.trim())){
    args = message.content.slice(prefix.trim().length).split(/ +/);
  }else{
     args = message.content.split(/ +/);
  }
    //get what command was called
	 command = args.shift().toLowerCase(); 
  let execution_status;
    //handle commands
        switch (command) {
          case 'card':
            execution_status = await client.commands.get('card').execute(message, args);
            break;
          case  'help':
            execution_status = await client.commands.get('help').execute(message, args, client);
            break;
          case 'server':
          case 'serverinfo':
          case 'guild':
          case 'guildinfo':
            execution_status = await client.commands.get('server').execute(message, args, client);
            break;
          case 'event':
            execution_status = await client.commands.get('event').execute(message, args);
            break;
          case 'cardback':
            execution_status = await client.commands.get('cardback').execute(message, args);
            break;
          case 'winscreen':
            execution_status = await client.commands.get('winscreen').execute(message, args);
            break;
          case 'losescreen':
            execution_status = await client.commands.get('losescreen').execute(message, args);
            break;
          case 'option':
            execution_status = await client.commands.get('option').execute(message, args);
            break;
          case 'credits':
            execution_status = await client.commands.get('credits').execute(message, args);
            break;
          case 'god':
            execution_status = await client.commands.get('god').execute(message, args);
            break;
          case 'eventlist':
          case 'events':
          case 'cardlist':
            execution_status = await client.commands.get('events').execute(message, args);
            break;
          case 'user':
          case 'userinfo':
          case 'member':
          case 'memberinfo':
          case 'profile':
          case 'whois':
            execution_status = await client.commands.get('user').execute(message, args, client);
            break;
          case 'underhand':
          case 'play':
          case 'u':
          case 'p':
            if(message.guild.id == 643706781427695616 && (message.channel.id != 721735042682060853 && message.channel.id != 766993942242787369)){
 	            return message.channel.send("Not in this channel please");
            } 
              execution_status = await client.commands.get('play').execute(message, args, client);
            break;
          case 'restart':
            execution_status = await client.commands.get('restart').execute(message, args, client);
            break;
          case 'blessing':
            execution_status = await client.commands.get('blessing').execute(message, args, client);
            break;
          case 'embed':
            execution_status = await client.commands.get('embed').execute(message, args, client);
            break;
          case 'notes':
            execution_status = await client.commands.get('notes').execute(message, args, sequelize, Notes, client);
            break;
          case 'addnote':
            execution_status = await client.commands.get('addnote').execute(message, args, sequelize, Notes);
            break;
          case 'delnote':
          case 'deletenote':
          case 'removenote':
            execution_status = await client.commands.get('delnote').execute(message, args, sequelize, Notes);
            break;
          case 'clearnotes':
            execution_status = await client.commands.get('clearnotes').execute(message, args, sequelize, Notes);
            break;
          case 'ban':
            execution_status = await client.commands.get('ban').execute(message, args);
            break;
          case 'kick':
            execution_status = await client.commands.get('kick').execute(message, args);
            break;
          case 'dm':
            execution_status = await client.commands.get('dm').execute(message, args);
            break;
          case 'nickname':
          case 'nick':
          case 'setnickname':
          case 'setnick':
            execution_status = await client.commands.get('nickname').execute(message, args);
            break;
          case 'generate':
          case 'gen':
            execution_status = await client.commands.get('generate').execute(message, args);
            break;
          case 'listservers':
            execution_status = await client.commands.get('listservers').execute(message, args, client);
            break;
            case 'p2':
            execution_status = await client.commands.get('underhand').execute(message, args, client);
            break;
            case 'test':
            execution_status = await client.commands.get('test').execute(message, args, client);
            break;
          default:
            return;
        }
        if(execution_status){
         client.commands.get('log').execute(message, args, client, 'error', command, execution_status);
         message.channel.send("Something went wrong");
        }else{
        client.commands.get('log').execute(message, args, client, 'command', command);
      }
      }
   }catch(err1) {
     client.commands.get('log').execute(message, args, client, 'error', command, err1);
     message.channel.send("Something went very wrong");
   }
      
});

  
  client.on("guildCreate", guild => {
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
client.commands.get('log').execute(undefined, undefined, client, 'guild_added', undefined, undefined, guild);
});
  

client.on("guildDelete", guild => {
client.commands.get('log').execute(undefined, undefined, client, 'guild_removed', undefined, undefined, guild);

});

process.on('uncaughtException', (err) => {
  client.commands.get('log').execute(undefined, undefined, client, 'error', undefined, err);
});

  //login the client
 client.login(token);
 

 
 



// make the server look http
app.use(require('./guides'));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});