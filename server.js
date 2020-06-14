// server.js
// where your node app starts

// init project
const express = require("express");
const fs = require("fs");

var Client = require("uptime-robot");

const app = express();


const Discord = require('discord.js'); 
 const prefix = require('./config.json').prefix;
const token = process.env.TOKEN;
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) { 	const command = require(`./commands/${file}`); 		client.commands.set(command.name, command); }

client.once('ready', () => { 	console.log(`Bot running: ${client.user.tag}`);
client.user.setActivity(`${prefix} help | Someone on the inside`);
  });
  
  
  
client.on('message', message => { 	
if(message.content.toLowerCase().includes(`goose`)){
	message.channel.send(`Honk!`);
} if(message.content.toLowerCase().includes(`undercover cultist`)){
	message.channel.send(`Shhh, ${message.author.username}, I do not want to be exposed!`);
} 
if (!message.content.startsWith(prefix) || message.author.bot) 
return; 
	const args = message.content.slice(prefix.length).split(/ +/); 
	const command = args.shift().toLowerCase(); /*
		if (command === 'ping') { 		client.commands.get('ping').execute(message, args); 	}
		else */if (command === 'card'){	
      client.commands.get('card').execute(message, args);
		}else if(command === 'help'){	
      client.commands.get('help').execute(message, args, client);
		}else if(command === 'server'){
			client.commands.get('server').execute(message, args, client);
		}else if(command === 'event').execute(message, args);
  
  
  ;
});
 client.login(token);
 

 
 



// this is the code for the guides
app.use(require('./guides'));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
