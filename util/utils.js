/** utils.js
* This is a library of utility methods to simplify tasks in other modules
*/
const configDotJSON = require('../config.json');
const Discord = require("discord.js");
const sequelize = require('../db/models/index.js');

module.exports = {
  
   randomArrayItem(array) {
      let item = array[Math.floor(Math.random() * array.length)];
      return item;
   }, 
  
  /**
  * A function for retrieving bot's configuration variables
  */
  async getConfig(name, value){
  	let where = `WHERE name = '${name}'`;
    if(value){
      where += ` AND value = '${value}'`;
    }
    try{
      const results = await module.exports.query(`SELECT * FROM Configs ${where};`);
      
      if (results) {
        if(results.length > 0 && results != []){
          return results[0].value;
         }     
        }
          if(configDotJSON[`${name}`]){
          return configDotJSON[`${name}`];   
      }
      return false;
    }catch(err){
      console.log(err);   
    }
   },
  
  async resolveUser(message, args){
     /**
     * This method resolves user input into a GuildMember object
     */
     let user;
      if(message.mentions.members.first() != null){
      user = message.mentions.members.first();
    }else if(args[0] == null){
      user = message.member;
    }else if(args.join(" ").includes("#")){
      let tag = args.join(" ");
      let username= tag.substring(0, tag.indexOf("#"));
      let discriminator = tag.substring(tag.indexOf("#") + 1, tag.length);
      user = await message.guild.members.cache.find(user => user.user.username.includes(username) && user.user.discriminator == discriminator);
    }else if(!isNaN(args[0])){
      user = await message.guild.members.cache.get(args[0]);
    }else{
      return;
    }
    return user;    
  
   },
  
  async isMaster(user_id){
    if(user_id == configDotJSON.default_master){
      return true;
    }
     let query = `SELECT * FROM Masters WHERE user = '${user_id}';`;
     const result = await module.exports.query(query);
    if(result){
      if(result.length > 0){
        return true;
      }  
    }
    return false;
  },
  
  async isBanned(user_id, guild_id){
    let query = `SELECT * FROM Bans WHERE (server = '${guild_id}' AND user = '${user_id}' AND global = false) OR (user = '${user_id}' AND global = true);`;
    const result = await module.exports.query(query);
    if(result){
      if(result.length > 0){
        return true;
      }  
    }
    return false;
  },
  
  async handleDM(message){
    module.exports.logDM(message);
  },
  
  async handleMessage(){
     
  },
  
  /*
  * Escape characters that could be used for SQL Injection
  */
  sanitize(stringToEscape){
    return stringToEscape
        .replace("\\", "\\\\")
        .replace("\'", "\\\'");
  },
  
  async log(embed, logAsEvent){

    const is_logging_disabled = await module.exports.getConfig('log_disabled');
    // Unset config values return false and logging is enabled by default
    if(is_logging_disabled){
      return;
    }
    let client = embed.client;
    embed.client = undefined;

    const complete_log_channel_id = await module.exports.getConfig('complete_log_channel');
  
    const complete_log_channel = await client.channels.cache.get(complete_log_channel_id);
    await complete_log_channel.send({embed : embed});


    if(logAsEvent){
      const event_log_channel_id = await module.exports.getConfig('event_log_channel');
      const event_log_channel = await client.channels.cache.get(event_log_channel_id);
      event_log_channel.send({embed : embed});
    }
  },
  
  async logGuildCreate(guild){
    let guild_create_signature = {
      title: "Guild Added",
      color: "#FFBC03",
    }
    await module.exports.logGuildEvent(guild, guild_create_signature);
  },
  
  async logGuildRemove(guild){
    let guild_remove_signature = {
      title: "Guild Removed",
      color: "#000000"
    }
    await module.exports.logGuildEvent(guild, guild_remove_signature);
  },
  
  async logGuildEvent(guild, {event_signature, client}){
     let embed = module.exports.buildEmbed({
      title: event_signature.title,
      color: event_signature.color,
      fields: [
        {
			    name: 'Guild',
			    value: guild.name,
		    	inline: false,
		    },
        {
			    name: 'GuildID',
			    value: guild.id,
			    inline: false,
		    },
        {
			    name: 'Owner',
			    value: module.exports.getUserNameStringFromUser(guild.owner),
			    inline: false,
		    },
        {
			    name: 'GuildMemberCount',
			    value: guild.memberCount,
			    inline: false,
		    },
      ],
      client: guild.client
    });
    await module.exports.log(embed, true);  
  },
  
  async logMessageIgnore(message){
    let embed = module.exports.buildEmbed({
      title: "Ignored Message",
      color: "#F7F7F7",
      fields: [
        {
          name: "Message",
          value: message.content
        },
        {
          name: "User",
          value: module.exports.getUserNameStringFromUser(message.author)
        },
        {
          name: "Server",
          value: message.guild.name
        },
        {
          name: "ServerID",
          value: message.guild.id
        }
      ],
      client: message.client
    });
    await module.exports.log(embed, false);
  },
  
  async logCommandError(message, error, {commandName} ){
    let embed = module.exports.buildEmbed({
      title: "Error",
      color: "#A83436",
      fields: [
        {
          name: "Message",
          value: message.content
        },
        {
          name: "Command",
          value: commandName
        },
        {
          name: "Server",
          value: message.guild.name
        },
        {
          name: "ServerID",
          value: message.guild.id
        },
        {
          name: "User",
          value: module.exports.getUserNameStringFromUser(message.author)
        },
        {
          name: "Error",
          value: error
        }
      ],
      client: message.client
    });

    await module.exports.log(embed, true);
  },
  
  async logError(error, {client}){
    let embed = module.exports.buildEmbed({
      title: "Error",
      color: "#A83436",
      fields: [
        {
          name: "Error",
          value: error
        }
      ],
      client: client
    });
    
    await module.exports.log(embed, true);
  },
  
  async logNA(data, {client}){
    let embed = module.exports.buildEmbed({
      title: "N/A",
      color: "#48CECE",
      fields: [
        {
          name: "Data",
          value: data
        }
      ],
      client: client
    });
    await module.exports.log(embed, true);
  },
  
  async logDM(message){
    let embed = module.exports.buildEmbed({
      title: "Direct Message",
      color: "",
      fields: [
        {
          name: "User",
          value: module.exports.getUserNameStringFromUser(message.author)
        },
        {
          name: "Message",
          value: message.content
        }
      ],
      client: message.client
    });
    await module.exports.dumpDM(embed);
  },
  
  async dumpDM(embed){
    let client = embed.client;
    embed.client = undefined;  
    let dm_dump_channel_id = await module.exports.getConfig('dm_dump_channel');

    const dm_dump_channel = await client.channels.cache.get(dm_dump_channel_id);

    dm_dump_channel.send(embed);
  },
  
  async logCommand(message, args, commandName){
    let embed = module.exports.buildEmbed({
      title: "Command",
      color: "#005E1F",
      fields: [
        {
        name: "Message",
        value: message.content
        },
        {
        name: "User",
        value: module.exports.getUserNameStringFromUser(message.author)
        },
        {
        name: "Server",
        value: message.guild.name
        },
        {
        name: "ServerID",
        value: message.guild.id
        },
        {
        name: "Args",
        value: args.join(' ')
        },
        {
        name: "Command",
        value: commandName
        },       
      ],
      client: message.client
    });

    await module.exports.log(embed, false);
  },
  
  buildEmbed(embedContent){
    let embed = new Discord.MessageEmbed()
    if(embedContent.title){
      embed.setTitle(embedContent.title);
    }
    if(embedContent.color){
      embed.setColor(embedContent.color)
    }
    if(embedContent.description){
      embed.setDescription(embedContent.description);
    }
    if(embedContent.fields){
      embed.addFields(embedContent.fields.filter(field => field.value != ""));
    }
    if(embedContent.footer){
      embed.setFooter(embedContent.footer.text, embedContent.footer.icon_url);
    }
    if(embed.timestamp){
      embed.setTimestamp();
    }
    if(embed.author){
      embed.setAuthor(embedContent.author.name, embedContent.author.icon_url, embedContent.author.url);
    }
    if(embedContent.url){
      embed.setURL(embedContent.url)
    }
    if(embedContent.image){
      embed.setImage(embedContent.image.url)
    }
     if(embedContent.thumbnail){
      embed.setThumbnail(embedContent.thumbnail.url)
    }
    if(embedContent.client){
      embed.client = embedContent.client;
    }
    
    return embed
  },
  
  async query(query){
	  try{
	  	const res = await axios.post(process.env.DB_API_PATH, {
			api_token: `${process.env.API_TOKEN}`,
			query: `${query}`
	 	 });
		  if(res.data["error] = 0) {
			return res.data["result"];	      
		  }
		  console.log(res.data["error"]);
		  return [];
	  }catch(err){
		  console.log(err);
		return []
	  }
  },
  
  async getSystemChannel(guild){
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
    return channel;
  },
  
  getUserNameStringFromUser(user){
    let username = user.username;
    let discriminator = user.discriminator;
    return username + "#" + discriminator;
  },
  
  getUserNameStringFromMember(member){
    let username = member.user.username;
    let discriminator = member.user.discriminator;
    return username + "#" + discriminator;
  },
  
  async isGuildIgnored(guild){
    let does_ignore_record_exists = await module.exports.getConfig('ignored_guild', guild.id);
   
    //in case of absence of such record false is returned which does not pass the if statement
    if(does_ignore_record_exists){
      return true;
    }
    return false;
  },
  
  async isChannelIgnored(channel){
    let does_ignore_record_exists = await module.exports.getConfig('ignored_channel', channel.id);
    //in case of absence of such record false is returned which does not pass the if statement
    if(does_ignore_record_exists){
      return true;
    }
    return false;
  },
  
  async isCommandIgnoredInChannel(commandName, channel){
    let does_ignore_record_exists = await module.exports.getConfig(`${commandName}_prohibited`, channel.id);
    //in case of absence of such record false is returned which does not pass the if statement
    if(does_ignore_record_exists){
      return true;
    }
    return false;
  },
  
  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {

      // Pick a remaining element...
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  },
  
  summarizeArray(array) {
    let sum = 0;
    for (const item of array) {
      sum += item;
    }
    return sum;
  },
  
  randomNumber(min, max) { 
    return Math.random() * (max - min) + min;
  }
  
}
