class Logger {
  
  constructor(client) {
    this.client = client;
    
    this.signatures = {
        COMMAND: "Command",
        GUILD_CREATED: "Guild Created",
        GUILD_REMOVED: "Guild Removed",
        MESSAGE_IGNORED: "Ignored Message",
        ERROR: "Error",
        NA: "N/A",
        DM: "Direct Message"
    }
    
    this.colors = {
        COMMAND: "#005E1F",
        GUILD_CREATED: "#FFBC03",
        GUILD_REMOVED: "#000000",
        MESSAGE_IGNORED: "#F7F7F7",
        ERROR: "#A83436",
        NA: "#48CECE",
        DM: ""
    }
    
  }
  
  async log(embed, {isEvent}) {
     const is_logging_disabled = await this.client.utils.getConfig('log_disabled');
    // Unset config values return false and logging is enabled by default
    if(is_logging_disabled){
      return;
    }

    const complete_log_channel_id = await this.client.utils.getConfig('complete_log_channel');
  
    const complete_log_channel = await this.client.channels.cache.get(complete_log_channel_id);
    await complete_log_channel.send({embeds : [embed]});


    if(isEvent){
      const event_log_channel_id = await this.client.utils.getConfig('event_log_channel');
      const event_log_channel = await this.client.channels.cache.get(event_log_channel_id);
      event_log_channel.send({embeds : [embed]});
    }
  }
  
  async guildEvent(guild, {created}) {
    let embed = this.client.utils.buildEmbed({
      title: (created) ? this.signatures.GUILD_CREATED : this.signatures.GUILD_REMOVED,
      color: (created) ? this.colors.GUILD_CREATED : this.colors.GUILD_REMOVED,
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
			    value: guild.fetchOwner(owner => owner.tag),
			    inline: false,
		    },
        {
			    name: 'GuildMemberCount',
			    value: guild.memberCount,
			    inline: false,
		    }
      ]
    });
    await this.log(embed, {isEvent: true});  
  }
  
  async guildCreated(guild) {
    this.guildEvent(guild, {created: true});
  }
  
  async guildRemoved(guild) {
    this.guildEvent(guild, {created: false});
  }
  
  async messageIgnored(message) {
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.MESSAGE_IGNORED,
      color: this.colors.MESSAGE_IGNORED,
      fields: [
        {
          name: "Message",
          value: message.content
        },
        {
          name: "User",
          value: message.author.tag
        },
        {
          name: "Server",
          value: message.guild.name
        },
        {
          name: "ServerID",
          value: message.guild.id
        }
      ]
    });
    await this.log(embed, {isEvent: false});
  }
  
  async command(message, args, commandName) {
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.COMMAND,
      color: this.colors.COMMAND,
      fields: [
        {
        name: "Message",
        value: message.content
        },
        {
        name: "User",
        value: message.author.tag
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
        }      
      ]
    });

    await this.log(embed, {isEvent: false});
  }
  
  async error(error, {metadata}) {
    console.log(error);
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.ERROR,
      color: this.colors.ERROR,
      fields: [
        {
          name: "Error",
          value: `${error.name}: ${error.message}`
        }
      ]
    });
    
    await this.log(embed, {isEvent: true});
  }
  
  async commandError(message, error, commandName) {
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.ERROR,
      color: this.colors.ERROR,
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
          value: message.author.tag
        },
        {
          name: "Error",
          value: `${error.name}: ${error.message}`
        }
      ]
    });

    await this.log(embed, {isEvent: true});
  }
  
  async dm(message) {
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.DM,
      color: this.colors.DM,
      fields: [
        {
          name: "Message",
          value: message.content
        },
        {
          name: "User",
          value: message.author.tag
        }
      ]
    });
    await this.dumpDM(embed);
  }
  
  async dumpDM(embed) {
    let dm_dump_channel_id = await this.client.utils.getConfig('dm_dump_channel');

    const dm_dump_channel = await this.client.channels.cache.get(dm_dump_channel_id);

    dm_dump_channel.send({embeds: [embed]});
  }
  
}

module.exports = Logger;