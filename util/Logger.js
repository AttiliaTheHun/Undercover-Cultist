class Logger {

  constructor(client) {
    this.client = client;

    this.signatures = {
      COMMAND: "Command",
      SLASH_COMMAND: "Slash Command",
      GUILD_CREATED: "Guild Created",
      GUILD_REMOVED: "Guild Removed",
      MESSAGE_IGNORED: "Ignored Message",
      INTERACTION_IGNORED: "Interaction Ignored",
      ERROR: "Error",
      NA: "N/A",
      DM: "Direct Message"
    }

    this.colors = {
      COMMAND: this.client.colors.DARK_GREEN,
      SLASH_COMMAND: this.client.colors.DARK_GREEN,
      GUILD_CREATED: this.client.colors.GOLD,
      GUILD_REMOVED: this.client.colors.BLACK,
      MESSAGE_IGNORED: this.client.colors.WHITE,
      INTERACTION_IGNORED: this.client.colors.WHITE,
      ERROR: "#A83436",
      NA: "#48CECE",
      DM: ""
    }

  }

  async log(embed, { isEvent }) {
    const is_logging_disabled = await this.client.utils.getConfig('log_disabled');
    // Unset config values return false and logging is enabled by default
    if (is_logging_disabled) {
      return;
    }

    const complete_log_channel_id = await this.client.utils.getConfig('complete_log_channel');

    const complete_log_channel = await this.client.channels.cache.get(complete_log_channel_id);
    await complete_log_channel.send({ embeds: [embed] });


    if (isEvent) {
      const event_log_channel_id = await this.client.utils.getConfig('event_log_channel');
      const event_log_channel = await this.client.channels.cache.get(event_log_channel_id);
      event_log_channel.send({ embeds: [embed] });
    }
  }

  async guildEvent(guild, { created }) {
    let owner = await guild.fetchOwner();
    console.log(owner)
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
          name: 'Guild ID',
          value: guild.id,
          inline: false,
        },
        {
          name: 'Owner',
          value: owner.user.tag,
          inline: false,
        },
        {
          name: 'GuildMemberCount',
          value: guild.memberCount.toString(),
          inline: false,
        }
      ]
    });
    await this.log(embed, { isEvent: true });
  }

  async guildCreated(guild) {
    this.guildEvent(guild, { created: true });
  }

  async guildRemoved(guild) {
    this.guildEvent(guild, { created: false });
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
          name: "Server ID",
          value: message.guild.id
        }
      ]
    });
    await this.log(embed, { isEvent: false });
  }

   async interactionIgnored(interaction) {
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.INTERACTION_IGNORED,
      color: this.colors.INTERACTION_IGNORED,
      fields: [
        {
          name: "Input",
          value: interaction.toString()
        },
        {
          name: "User",
          value: interaction.user.tag
        },
        {
          name: "Server",
          value: interaction.guild.name
        },
        {
          name: "Server ID",
          value: interaction.guild.id
        }
      ]
    });
    await this.log(embed, { isEvent: false });
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
          name: "Server ID",
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

    await this.log(embed, { isEvent: false });
  }

   async slashCommand(interaction, commandName) {
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.SLASH_COMMAND,
      color: this.colors.SLASH_COMMAND,
      fields: [
        {
          name: "Input",
          value: interaction.toString()
        },
        {
          name: "User",
          value: interaction.user.tag
        },
        {
          name: "Server",
          value:interaction.guild.name
        },
        {
          name: "Server ID",
          value: interaction.guild.id
        },
        {
          name: "Command",
          value: commandName
        }
      ]
    });

    await this.log(embed, { isEvent: false });
  }

  async error(error, { metadata }) {
    console.log(error);
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.ERROR,
      color: this.colors.ERROR,
      description: (metadata) ? `Metadata: ${metadata.toString()}` : undefined,
      fields: [
        {
          name: "Error",
          value: `${(error.stack.length > 900) ? error.name + ":" + error.message + "\n..." +  error.stack.substring(error.name.length + error.message.length + 2, 900) : error.stack}`
        }
      ]
    });

    await this.log(embed, { isEvent: true });
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
          value: `${(error.stack.length > 900) ? error.name + ":" + error.message + "\n..." +  error.stack.substring(error.name.length + error.message.length + 2, 900) : error.stack}`
        }
      ]
    });

    await this.log(embed, { isEvent: true });
  }

  async slashCommandError(interaction, error, commandName) {
    let embed = this.client.utils.buildEmbed({
      title: this.signatures.ERROR,
      color: this.colors.ERROR,
      fields: [
        {
          name: "Input",
          value: interaction.toString()
        },
        {
          name: "Command",
          value: commandName
        },
        {
          name: "Server",
          value: interaction.guild.name
        },
        {
          name: "Server ID",
          value: interaction.guild.id
        },
        {
          name: "User",
          value: interaction.user.tag
        },
        {
          name: "Error",
          value: `${(error.stack.length > 900) ? error.name + ":" + error.message + "\n..." +  error.stack.substring(error.name.length + error.message.length + 2, 900) : error.stack}`
        }
      ]
    });

    await this.log(embed, { isEvent: true });
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
          name: `User (${message.author.id})`,
          value: message.author.tag
        }
      ]
    });
    await this.dumpDM(embed);
  }

  async dumpDM(embed) {

    const is_logging_disabled = await this.client.utils.getConfig('log_disabled');
    // Unset config values return false and logging is enabled by default
    if (is_logging_disabled) {
      return;
    }

    let dm_dump_channel_id = await this.client.utils.getConfig('dm_dump_channel');

    const dm_dump_channel = await this.client.channels.cache.get(dm_dump_channel_id);

    dm_dump_channel.send({ embeds: [embed] });
  }

}

module.exports = Logger;