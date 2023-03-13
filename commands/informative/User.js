const Command = require("../Command.js");
const { SlashCommandBuilder, PermissionFlagsBits, SlashCommandUserOption } = require('discord.js');

module.exports = class User extends Command {

  constructor(client) {
    super(client, {
      name: 'user',
      aliases: ['usr', 'member', 'mmbr', 'profile', 'userinfo', 'stalk'],
      syntax: 'user <username/ID>',
      description: `Shows information about target user`,
      category: client.categories.INFORMATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['user 608673444061773827', 'user AttilaTheHun'],
      master: false
    });
  }

  async execute(message, args) {
    const user = await this.client.utils.resolveUser(message, args);
    if (!user) {
      return message.channel.send("Could not find the user.")
    }
    let description = "Here is the latest report\n";
    description += `**ID:** ${user.id}\n`;
    if (user.nickname != null) {
      description += `**Nickname:** ${user.nickname}\n`;
    }
    description += `**Admin:** ${user.permissions.has(PermissionFlagsBits.Administrator)}\n`;
    description += `**Bot:** ${user.user.bot}\n`;
    description += `**Color:** ${user.displayHexColor}\n`;
    description += `**Highest Role:** ${user.roles.highest}\n`;
    if (user.premiumSince != null) {
      description += `**Premium Since:** ${user.premiumSince}\n`;
    }
    if (user.user.flags != undefined) {
      description += `**User Flags:** ${user.user.flags.toArray()}\n`;
    }
    description += `**Joined:** ${user.joinedAt}\n`;
    description += `**Created:** ${user.user.createdAt}\n`;
    const embed = {
      color: user.displayHexColor,
      title: `${user.user.tag}`,
      description: description,
      thumbnail: { url: user.user.avatarURL() },
      /* .addField(`Roles(${user.guild.member.roles.cache.size})`, user.guild.member.roles.cache.map(r => `${r}`).join(' | '), true)
   */   //timestamp: "",
      footer: {
        text: "We could benefit from having someone on the inside",
        iconURL: this.client.user.avatarURL()
      }
    }
    message.channel.send({ embeds: [this.client.utils.buildEmbed(embed)] });
  }

  async backslash(interaction) {
    const user = interaction.options.getMember("user") || interaction.member;
    if (!user) {
      this.client.utils.failedInteraction(interaction, "Could not indentify the user");
    }
    let description = "Here is the latest report\n";
    description += `**ID:** ${user.id}\n`;
    if (user.nickname != null) {
      description += `**Nickname:** ${user.nickname}\n`;
    }
    description += `**Admin:** ${user.permissions.has(PermissionFlagsBits.Administrator)}\n`;
    description += `**Bot:** ${user.user.bot}\n`;
    description += `**Color:** ${user.displayHexColor}\n`;
    description += `**Highest Role:** ${user.roles.highest}\n`;
    if (user.premiumSince != null) {
      description += `**Premium Since:** ${user.premiumSince}\n`;
    }
    if (user.user.flags != undefined) {
      description += `**User Flags:** ${user.user.flags.toArray()}\n`;
    }
    description += `**Joined:** ${user.joinedAt}\n`;
    description += `**Created:** ${user.user.createdAt}\n`;
    const embed = {
      color: user.displayHexColor,
      title: `${user.user.tag}`,
      description: description,
      thumbnail: { url: user.user.avatarURL() },
    /* .addField(`Roles(${user.guild.member.roles.cache.size})`, user.guild.member.roles.cache.map(r => `${r}`).join(' | '), true)
 */   timestamp: "",
      footer: {
        text: "We could benefit from having someone on the inside",
        iconURL: this.client.user.avatarURL()
      }
    }
    interaction.reply({ embeds: [this.client.utils.buildEmbed(embed)] });
  }

  createDefinition() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .addUserOption(option => 
        option.setName("user")
          .setDescription("The user to show details about.")
      );
  }

}