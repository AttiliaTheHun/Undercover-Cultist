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

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage INT
 * );
 */
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
client.on('message', message => { 	
if(message.content.toLowerCase().includes(`goose`)){
	message.channel.send(`Honk!`);
} if(message.content.toLowerCase().includes(`undercover cultist`) || message.mentions.members.first() == client.user.id){
	message.channel.send(`Shhh, ${message.author.username}, I do not want to be exposed!`);
} 
  //check if prefix was called and ignore another bots
if (!message.content.startsWith(prefix) && !message.content.startsWith(prefix.trim()) || message.author.bot) 
return; 
  let args;
  //remove the prefix from the message
  if(message.content.startsWith(prefix)){
	 args = message.content.slice(prefix.length).split(/ +/); 
    //remove prefix with whitespaces from the message
  }else if(message.content.startsWith(prefix.trim())){
    args = message.content.slice(prefix.trim().length).split(/ +/);
  }else{
     args = message.content.split(/ +/);
  }
  try{
    //get what command was called
	const command = args.shift().toLowerCase(); 
    //handle commands
	        if (command === 'card'){	
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
}else if(command === 'credits'){
  client.commands.get('credits').execute(message, args);
}else if(command === 'god'){
  client.commands.get('god').execute(message, args);
}else if(command === 'eventlist' || command === 'cardlist' || command === 'events'){
  client.commands.get('events').execute(message, args);
}else if(command === 'user'){
  client.commands.get('user').execute(message, args, client);
}else if(command === 'underhand' || command === 'u' || command === 'play' || command === 'p' ){
  //I don't want people to play outside specified channels
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
  client.commands.get('notes').execute(message, args, sequelize, Notes, client);
}else if(command ===  'addnote'){
  client.commands.get('addnote').execute(message, args, sequelize, Notes);
}else if(command ===  'delnote'){
  client.commands.get('delnote').execute(message, args, sequelize, Notes);
}else if(command ===  'test'){
  client.commands.get('test').execute(message, args, sequelize, Notes);
}else if(command ===  'clearnotes'){
  client.commands.get('clearnotes').execute(message, args, sequelize, Notes);
}else if(command ===  'ban'){
  client.commands.get('ban').execute(message, args);
}else if(command ===  'unban'){
  client.commands.get('unban').execute(message, args);
}else if(command ===  'kick'){
  client.commands.get('kick').execute(message, args);
}else if(command ===  'dm'){
  client.commands.get('dm').execute(message, args);
}else if(command ===  'nickname' || command ===  'setnickname' || command ===  'setnick' || command ===  'nick'){
  client.commands.get('nickname').execute(message, args);
}else if(command ===  'generate' || command ===  'gen'){
  client.commands.get('generate').execute(message, args);
};
   }catch(err1) {
     console.log(err1);
   }
});
  
  
  client.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
  /* const embed = new Discord.MessageEmbed()
    .setColor('#ffbc03') 	
    .setTitle('Greetings everyone!')		
    .setDescription(`Hello guys, **${guild.name}** looks like nice place, yeah? But I am here to make it **cool**. Is there any admin, because I need you to run the *config* command to prepare the server for my presence. Don't be afraid of it, it just creates *@tournament admin* role and some channels, everyone is safe! \n \n Right after that you can use *adminguide* or *playerguide* command to get better knowledge on how we can be friends.`) 		
  .addField('Need human help?', 'Ask AttilaTheHun#9489', true)
	 	.setTimestamp() 	
	.setFooter('Tournament Guy#1413', ''); */
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
 const role = guild.roles.cache.find(role => role.name === 'Undercover Cultist');
   role.setColor("#005e1f");

})
  
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