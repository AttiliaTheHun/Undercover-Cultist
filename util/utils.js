/** utils.js
* This is a library of utility methods to simplify tasks in other modules
*/
const configDotJSON = require('../config.json');
const Discord = require("discord.js");
const sequelize = require('../db/models/index.js');
const axios = require("axios");

module.exports = {

  randomArrayItem(array) {
    let item = array[Math.floor(Math.random() * array.length)];
    return item;
  },

  /**
  * A function for retrieving bot's configuration variables
  */
  async getConfig(name, value) {
    let where = `WHERE name = '${name}'`;
    if (value) {
      where += ` AND value = '${value}'`;
    }
    try {
      const results = await module.exports.query(`SELECT * FROM Configs ${where};`);

      if (results) {
        if (results.length > 0 && results != []) {
          return results[0].value;
        }
      }
      if (configDotJSON[`${name}`]) {
        return configDotJSON[`${name}`];
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  },

  async resolveUser(message, args) {
    /**
    * This method resolves user input into a GuildMember object
    */
    let user;
    if (message.mentions.members.size > 0) {
      if (message.mentions.members.first().user.id == message.client.user.id) {
        if (message.mentions.members.size >= 1) {
          return message.mentions.members.at(1);
        }
      } else {
        user = message.mentions.members.first();
        return user;
      }
    }
    if (args[0] == null) {
      user = message.member;
    } else if (args.join(" ").includes("#")) {
      let tag = args.join(" ");
      let username = tag.substring(0, tag.indexOf("#"));
      let discriminator = tag.substring(tag.indexOf("#") + 1, tag.length);
      user = await message.guild.members.cache.find(user => user.user.username.includes(username) && user.user.discriminator == discriminator);
    } else if (!isNaN(parseInt(args[0]))) {
      user = await message.guild.members.cache.get(args[0]);
    } else {
      return;
    }
    return user;

  },

  async isMaster(user_id) {
    if (user_id == configDotJSON.default_master) {
      return true;
    }
    let query = `SELECT * FROM Masters WHERE user = '${user_id}';`;
    const result = await module.exports.query(query);
    if (result) {
      if (result.length > 0) {
        return true;
      }
    }
    return false;
  },

  async isBanned(user_id, guild_id) {
    let query = `SELECT * FROM Bans WHERE (server = '${guild_id}' AND user = '${user_id}' AND global = 0) OR (user = '${user_id}' AND global = 1);`;
    const result = await module.exports.query(query);

    if (result) {
      if (result.length > 0) {
        return true;
      }
    }
    return false;
  },

  async handleDM(message) {
    module.exports.logDM(message);
  },

  async handleMessage() {

  },

  /*
  * Escape characters that could be used for SQL Injection
  */
  sanitize(stringToEscape) {
    return (stringToEscape) ? stringToEscape
      .replace("\\", "\\\\")
      .replace("\'", "\\\'") : stringToEscape;
  },

  buildEmbed(embedContent) {
    let embed = new Discord.EmbedBuilder()
    if (embedContent.title) {
      embed.setTitle(embedContent.title);
    }
    if (embedContent.color) {
      embed.setColor(embedContent.color)
    }
    if (embedContent.description) {
      embed.setDescription(embedContent.description);
    }
    if (embedContent.fields) {
      embed.addFields(embedContent.fields.filter(field => field.value));
    }
    if (embedContent.footer) {
      embed.setFooter({ text: embedContent.footer.text, icon_url: embedContent.footer.iconURL });
    }
    if (embedContent.timestamp) {
      embed.setTimestamp(embedContent.timestamp || Date.now);
    }
    if (embedContent.author) {
      embed.setAuthor({
        name: embedContent.author.name,
        icon_url: embedContent.author.iconURL,
        url: embedContent.author.url
      });
    }
    if (embedContent.url) {
      embed.setURL(embedContent.url)
    }
    if (embedContent.image) {
      embed.setImage(embedContent.image.url)
    }
    if (embedContent.thumbnail) {
      embed.setThumbnail(embedContent.thumbnail.url)
    }
    if (embedContent.client) {
      embed.client = embedContent.client;
    }
    return embed;
  },

  /* async query(query) {
     console.log(`Executing: ${query}`);
     try {
       const res = await axios.post(process.env.DB_API_PATH, {
         api_token: `${process.env.API_TOKEN}`,
         query: `${query}`
       });
       //console.log(res.data);
       const response = res.data;
       if (response["error"] == '0') {
         if (response["result"] == "false") {
           return false;
         }
         console.log(response["result"])
 
         return JSON.parse(response["result"]) || response["result"];
       }
       console.log(response["error"]);
       return [];
     } catch (err) {
       console.log(err);
       return [];
     }
   },*/

  async query(query) {
    const [result, metadata] = await sequelize.query(query);
    return result;
  },

  /**
  * For the Query command so it can print the erorrs, do not use
  */
  /*async queryPowerTwo(query) {
    console.log(`Executing: ${query}`);
    try {
      const res = await axios.post(process.env.DB_API_PATH, {
        api_token: `${process.env.API_TOKEN}`,
        query: `${query}`
      });
      //console.log(res.data);
      const response = res.data;
      if (response["error"] == '0') {
        if (response["result"] == "false") {
          return false;
        }
        console.log(response["result"])

        return [JSON.parse(response["result"]) || response["result"], response["error"]];
      }
      console.log(response["error"]);
      return [null, response["error"]];
    } catch (err) {
      console.log(err);
      return [];
    }
  },*/

  async queryPowerTwo(query) {
    const [result, metadata] = await sequelize.query(query);
    return [result, metadata];
  },

  async getSystemChannel(guild) {
    const channel = guild.channels.cache.find(channel => {
      if (channel.type === Discord.ChannelType.GuildText) {
        if (guild.me.permissionsIn(channel).has(Discord.PermissionFlagsBits.SendMessages)) {
          return true;
        }
      }
      return false;
    });
    if (guild.systemChannel) {
      if (guild.me.permissionsIn(guild.systemChannel).has(Discord.PermissionFlagsBits.SendMessages)) {
        return guild.systemChannel;
      }
    } else {
      return channel;
    }
    /*while (true) {
      const channel = channels.next();
      if (channels.done) {
        return null;
      }
      if (channel.type === "GUILD_TEXT") {
        if (guild.me.permissionsIn(channel.has('SEND_MESSAGES'))) {
          return channel;
        }
      }
    }*/
  },

  // when you don't read the docs...

  /* getUserNameStringFromUser(user){
     let username = user.username;
     let discriminator = user.discriminator;
     return username + "#" + discriminator;
   },
   
   getUserNameStringFromMember(member){
     let username = member.user.username;
     let discriminator = member.user.discriminator;
     return username + "#" + discriminator;
   },*/

  async isGuildIgnored(guild) {
    let does_ignore_record_exists = await module.exports.getConfig('ignored_guild', guild.id);

    //in case of absence of such record false is returned which does not pass the if statement
    if (does_ignore_record_exists) {
      return true;
    }
    return false;
  },

  async isChannelIgnored(channel) {
    const does_ignore_record_exists = await module.exports.getConfig('ignored_channel', channel.id);
    //in case of absence of such record false is returned which does not pass the if statement
    if (does_ignore_record_exists) {
      return true;
    }
    return false;
  },

  async isCommandIgnoredInChannel(commandName, channel) {
    const does_ignore_record_exists = await module.exports.getConfig(`${commandName}_prohibited`, channel.id);
    //in case of absence of such record false is returned which does not pass the if statement
    if (does_ignore_record_exists) {
      return true;
    }
    return false;
  },

  shuffleArray(array) {
    const shuffled = array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    return shuffled;
  },

  summarizeArray(array) {
    let sum = 0;
    for (const item of array) {
      sum += item;
    }
    return sum;
  },

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  checkUserPermissions(member, permissions) {
    if (!member.permissions.has(permissions)) {
      throw new member.client.errors.UserPermissionError("You are not allowed to do this.");
    }
  },

  checkClientPermissions(entity, permissions, { member, channel }) {
    if (!entity.guild.members.me.permissions.has(permissions)) {
      throw new entity.client.errors.SilentError("I do not posses the necessary perms.");
    }
    if (member) {
      if (!member.managable) {
        throw new message.client.errors.SilentError("I do not have the permissions necessary.");
      }
    }
  },

  randomColor() {
    // https://www.tutorialspoint.com/generating-random-hex-color-in-javascript
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  },

  capitalize(string) {
    // https://stackoverflow.com/questions/42755664/capitalize-first-letter-of-each-word-in-js
    return string.trim().toLowerCase().split(/ /g).map(val => val[0].toUpperCase() + val.slice(1)).join(' ');
  },

  capitalizeArray(array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = module.exports.capitalize(array[i]);
    }
    return array;
  },

  async failedInteraction(interaction, message, ephemeral) {
    const embed = {
      title: "Failure",
      color: interaction.client.colors.RED,
      description: message
    }
    await interaction.reply({ embeds: [interaction.client.utils.buildEmbed(embed)], ephemeral: (ephemeral == false) ? false : true });
  },

  async successfulInteraction(interaction, message, ephemeral) {
    const embed = {
      title: "Success",
      color: interaction.client.colors.GREEN,
      description: message
    }
    await interaction.reply({ embeds: [interaction.client.utils.buildEmbed(embed)], ephemeral: (ephemeral == false) ? false : true });
  }

}