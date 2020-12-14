// server.js
// where your node app starts

// init project
const express = require("express");
const fs = require("fs");


const app = express();


const Discord = require('discord.js'); 
 const prefix = require('./config.json').prefix;
const token = process.env.TOKEN;
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) { 	const command = require(`./commands/${file}`); 		client.commands.set(command.name, command); }

client.once('ready', () => { 	
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
  
client.on('message', message => { 	
if(message.content.toLowerCase().includes(`goose`)){
	message.channel.send(`Honk!`);
} if(message.content.toLowerCase().includes(`undercover cultist`) || message.mentions.members.first() == client.user.id){
	message.channel.send(`Shhh, ${message.author.username}, I do not want to be exposed!`);
} 
if (!message.content.startsWith(prefix) && !message.content.startsWith(prefix.trim()) || message.author.bot) 
return; 
  let args;
  if(message.content.startsWith(prefix)){
    
	 args = message.content.slice(prefix.length).split(/ +/); 
  }else if(message.content.startsWith(prefix.trim())){
    args = message.content.slice(prefix.trim().length).split(/ +/);
  }else{
     args = message.content.split(/ +/);
  }
  try{
	const command = args.shift().toLowerCase(); /*
		if (command === 'ping') { 		client.commands.get('ping').execute(message, args); 	}
		else */if (command === 'card'){	
      client.commands.get('card').execute(message, args);
		}else if(command === 'help'){	
      client.commands.get('help').execute(message, args, client);
		}else if(command === 'server'){
			client.commands.get('server').execute(message, args, client);
		}else if(command === 'event'){
      client.commands.get('event').execute(message, args);
}else if(command === 'cardback'){
      client.commands.get('cardback').execute(message, args);
}else if(command === 'winscreen'){
      client.commands.get('winscreen').execute(message, args);
}else if(command === 'losescreen'){
      client.commands.get('losescreen').execute(message, args);
}else if(command === 'option'){
  client.commands.get('option').execute(message, args);
}else if(command === 'invite'){
  client.commands.get('invite').execute(message, args);
}else if(command === 'god'){
  client.commands.get('god').execute(message, args);
}else if(command === 'eventlist' || command === 'cardlist' || command === 'events'){
  client.commands.get('events').execute(message, args);
}else if(command === 'user'){
  client.commands.get('user').execute(message, args, client);
}else if(command === 'underhand' || command === 'u' || command === 'play' || command === 'p' ){
 if(message.guild.id == 643706781427695616 && (message.channel.id != 721735042682060853 && message.channel.id != 766993942242787369)){
 	return message.channel.send("Not in this channel please");
    } 
  client.commands.get('underhand').execute(message, args, client);
}else if(command ===  'restart'){
  client.commands.get('restart').execute(message, args);
}else if(command ===  'blessing'){
  client.commands.get('blessing').execute(message, args);
}else if(command ===  'embed'){
  client.commands.get('embed').execute(message, args);
}else if(command ===  'notes'){
  client.commands.get('notes').execute(message, args);
}else if(command ===  'addnote'){
  client.commands.get('addnote').execute(message, args);
}else if(command ===  'delnote'){
  client.commands.get('delnote').execute(message, args);
};
   }catch(err1) {
     console.log(err1);
   }
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