const Command = require("../Command.js");

module.exports = class User extends Command {
  
  constructor(client) {
    super(client, {
      name: 'user',
      aliases: ['usr', 'member', 'mmbr', 'profile', 'userinfo', 'stalk'],
      usage: 'user <username/ID>',
      description: `Shows information about target user`,
      type: client.types.INFORMATIVE,
      userPermissions: [],
      examples: ['user 608673444061773827', 'user AttilaTheHun'],
      master: false
    });
  }
  
  async execute(message, args) {
     const user = await this.client.utils.resolveUser(message, args);
    if (user == undefined) {
      return message.channel.send("Could not find the user.")
    }
    let description = "Here is the latest report\n";
    description += `**ID:** ${user.id}\n`;
    if (user.nickname != null) {
      description += `**Nickname:** ${user.nickname}\n`;
    }
    description += `**Admin:** ${user.permissions.has("ADMINISTRATOR")}\n`;
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
      thumbnail: user.user.avatarURL(),
    /* .addField(`Roles(${user.guild.member.roles.cache.size})`, user.guild.member.roles.cache.map(r => `${r}`).join(' | '), true)
 */   timestamp: "",
      footer: {
        text: "We could benefit from having someone on the inside",
        icon_url: this.client.user.avatarURL()
      }}
    message.channel.send({embeds: [this.client.utils.buildEmbed(embed)]});
  }
  
}