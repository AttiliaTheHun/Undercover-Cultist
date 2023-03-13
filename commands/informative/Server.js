const Command = require("../Command.js");
const { SlashCommandBuilder, ChannelType} = require('discord.js');

module.exports = class Server extends Command {
  
  constructor(client) {
    super(client, {
      name: 'server',
      aliases: ['srvr', 'guild', 'gld'],
      syntax: 'server',
      description: `Default description`,
      category: client.categories.INFORMATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['server'],
      master: false
    });
  }
  
  async execute(message, args) {
    
    const owner = await message.guild.fetchOwner().then(owner => owner.user.tag);
    let description = "";
    if (message.guild.description != null) {
      description += `**Description:** ${message.guild.description}\n`;
    }
    description += `**Owner:** ${owner}\n`;
   // description += `**Region:** ${message.guild.region}\n`;
    if (message.guild.preferredLocale != undefined) {
      description += `**Language:** ${message.guild.preferredLocale}\n`;
    }
    //description += `**Admins:** ${message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR")).size}\n`;
    description += `**ID:** ${message.guild.id}\n`;
    description += `**Created:** ${message.guild.createdAt.toString().substring(0, 31)}\n`;
    description += `**Roles:** ${message.guild.roles.cache.size}\n`;
    description += `**Members:** ${message.guild.memberCount}\n`;
    if (message.guild.maximumMembers != null) {
      description += `**Max Members:** ${message.guild.maximumMembers}\n`;
    }
    description += `**Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}\n`;
    description += `**Large:** ${message.guild.large}\n`;
    description += `**Channel Categories:** ${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}\n`;
    description += `**Text Channels:** ${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}\n`;
    if (message.guild.systemChannel != null) {
      description += `**System Channel:** ${message.guild.systemChannel}\n`;
    }
    description += `**Voice Channels:** ${message.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}\n`;
    if (message.guild.afkChannel != null) {
      description += `**AFK Channel:** ${message.guild.afkChannel}\n`;
      description += `**AFK Timeout:** ${message.guild.afkTimeout / 60} minutes\n`;
    }
    description += `**Partnered:** ${message.guild.partnered}\n`;
    if (message.guild.features && message.guild.features.length > 0) {
      description += `**Features:** ${message.guild.features}\n`;
    }
    if (message.guild.premiumTier != null) {
      description += `**Nitro Tier:** ${message.guild.premiumTier}\n`;
    }
    if (message.guild.premiumSubscriptionCount != null) {
      description += `**Nitro Boosts:** ${message.guild.premiumSubscriptionCount}\n`;
    }
    if (message.guild.vanityURLCode != null) {
      description += `**Vanity URL:** ${message.guild.vanityURLCode}\n`;
    }
    description += `**Default Notifications:** ${message.guild.defaultMessageNotifications}\n`;
    description += `**Content Filter:** ${message.guild.explicitContentFilter}\n`;
    description += `**Verification Level:** ${message.guild.verificationLevel}\n`;

    //description += `**Roles** (${message.guild.roles.cache.size})\n${message.guild.roles.cache.map(r => `${r}`).join(' ')}\n`;

    const embed = {
      color: this.client.logger.colors.COMMAND,
      title: `${message.guild.name}`,
      author: { name: "Here is the latest report"},
      description: description,
      thumbnail: { url: message.guild.iconURL()},
      timestamp: "",
      footer: {
        text: "We could benefit from having someone on the inside",
        iconURL: this.client.user.avatarURL()
      }
    };
    message.channel.send({embeds: [this.client.utils.buildEmbed(embed)]});
 
  }

  async backslash(interaction) {
     const owner = await interaction.guild.fetchOwner().then(owner => owner.user.tag);
    let description = "";
    if (interaction.guild.description != null) {
      description += `**Description:** ${interaction.guild.description}\n`;
    }
    description += `**Owner:** ${owner}\n`;
   // description += `**Region:** ${interaction.guild.region}\n`;
    if (interaction.guild.preferredLocale != undefined) {
      description += `**Language:** ${interaction.guild.preferredLocale}\n`;
    }
    //description += `**Admins:** ${interaction.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR")).size}\n`;
    description += `**ID:** ${interaction.guild.id}\n`;
    description += `**Created:** ${interaction.guild.createdAt.toString().substring(0, 31)}\n`;
    description += `**Roles:** ${interaction.guild.roles.cache.size}\n`;
    description += `**Members:** ${interaction.guild.memberCount}\n`;
    if (interaction.guild.maximumMembers != null) {
      description += `**Max Members:** ${interaction.guild.maximumMembers}\n`;
    }
    description += `**Bots:** ${interaction.guild.members.cache.filter(member => member.user.bot).size}\n`;
    description += `**Large:** ${interaction.guild.large}\n`;
    description += `**Channel Categories:** ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildCategory).size}\n`;
    description += `**Text Channels:** ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size}\n`;
    if (interaction.guild.systemChannel != null) {
      description += `**System Channel:** ${interaction.guild.systemChannel}\n`;
    }
    description += `**Voice Channels:** ${interaction.guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size}\n`;
    if (interaction.guild.afkChannel != null) {
      description += `**AFK Channel:** ${interaction.guild.afkChannel}\n`;
      description += `**AFK Timeout:** ${interaction.guild.afkTimeout / 60} minutes\n`;
    }
    description += `**Partnered:** ${interaction.guild.partnered}\n`;
    if (interaction.guild.features && interaction.guild.features.length > 0) {
      description += `**Features:** ${interaction.guild.features}\n`;
    }
    if (interaction.guild.premiumTier != null) {
      description += `**Nitro Tier:** ${interaction.guild.premiumTier}\n`;
    }
    if (interaction.guild.premiumSubscriptionCount != null) {
      description += `**Nitro Boosts:** ${interaction.guild.premiumSubscriptionCount}\n`;
    }
    if (interaction.guild.vanityURLCode != null) {
      description += `**Vanity URL:** ${interaction.guild.vanityURLCode}\n`;
    }
    description += `**Default Notifications:** ${interaction.guild.defaultMessageNotifications}\n`;
    description += `**Content Filter:** ${interaction.guild.explicitContentFilter}\n`;
    description += `**Verification Level:** ${interaction.guild.verificationLevel}\n`;

    //description += `**Roles** (${interaction.guild.roles.cache.size})\n${interaction.guild.roles.cache.map(r => `${r}`).join(' ')}\n`;

    const embed = {
      color: this.client.logger.colors.COMMAND,
      title: `${interaction.guild.name}`,
      author: { name: "Here is the latest report"},
      description: description,
      thumbnail: { url: interaction.guild.iconURL()},
      timestamp: "",
      footer: {
        text: "We could benefit from having someone on the inside",
        iconURL: this.client.user.avatarURL()
      }
    };
    interaction.reply({embeds: [this.client.utils.buildEmbed(embed)]});
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription(this.description)
  }
  
  
};