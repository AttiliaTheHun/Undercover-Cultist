const Command = require("../Command.js");

module.exports = class Server extends Command {
  
  constructor(client) {
    super(client, {
      name: 'server',
      aliases: ['srvr', 'guild', 'gld'],
      usage: 'server',
      description: `Default description`,
      type: client.types.INFORMATIVE,
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
    description += `**Channel Categories:** ${message.guild.channels.cache.filter(channel => channel.type === "GUILD_CATEGORY").size}\n`;
    description += `**Text Channels:** ${message.guild.channels.cache.filter(channel => channel.type === "GUILD_TEXT").size}\n`;
    if (message.guild.systemChannel != null) {
      description += `**System Channel:** ${message.guild.systemChannel}\n`;
    }
    description += `**Voice Channels:** ${message.guild.channels.cache.filter(channel => channel.type === "GUILD_VOICE").size}\n`;
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
      // .setDescription(`**Owner:** ${owner}\n**Region:** ${message.guild.region}\n**Admins:** ${message.guild.members.cache.filter(member => member.hasPermission('ADMINISTRATOR')).size}\n**Created:** ${message.guild.createdAt.toString().substring(0, 31)}\n**Members:** ${message.guild.memberCount}\n**Bots:** ${message.guild.members.cache.filter(member => member.user.bot).size}\n**Channel Categories:** ${message.guild.channels.cache.filter(channel => channel.type === "category").size}\n**Text Channels:** ${message.guild.channels.cache.filter(channel => channel.type === "text").size}\n**Voice Channels:** ${message.guild.channels.cache.filter(channel => channel.type === "voice").size}\n**ID:** ${message.guild.id}\n**Roles** (${message.guild.roles.cache.size})\n${message.guild.roles.cache.map(r => `${r}`).join(' ')}\n`)
      description: description,
      thumbnail: message.guild.iconURL(),
      timestamp: "",
      footer: {
        text: "We could benefit from having someone on the inside",
        icon_url: this.client.user.avatarURL()
      }
    };
    message.channel.send({embeds: [this.client.utils.buildEmbed(embed)]});
 
  }
  
  
};