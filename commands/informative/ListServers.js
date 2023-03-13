const Command = require("../Command.js");
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = class ListServers extends Command {

  constructor(client) {
    super(client, {
      name: 'listservers',
      aliases: ['servers', 'srvrs'],
      syntax: 'listservers',
      description: `Shows all the servers the bot is in, can produce a great many of messages`,
      category: client.categories.INFORMATIVE,
      clientPermissions: [PermissionFlagsBits.AttachFiles],
      userPermissions: [],
      examples: ['listservers'],
      master: true
    });
  }

  async execute(message, args) {
    const servers = this.client.guilds.cache.values();
    let owner;
    for (const server of servers) {
      owner = await server.fetchOwner().then(owner => {
        const embed = {
          color: "#FFBC03",
          fields: [
            {
              name: "Name",
              value: server.name,
              inline: false
            },
            {
              name: "ID",
              value: server.id,
              inline: false
            },
            {
              name: "Owner",
              value: owner.user.tag,
              inline: false
            },
            {
              name: "Members",
              value: server.memberCount.toString(),
              inline: false
            }

          ]
        };
        console.log(embed);
        message.channel.send({ embeds: [this.client.utils.buildEmbed(embed)] });
      });
    }
  }

  async backslash(interaction) {
    this.client.utils.successfulInteraction(interaction, "Interaction successful", false);
    const servers = this.client.guilds.cache.values();
    let owner;
    for (const server of servers) {
      owner = await server.fetchOwner().then(owner => {
        const embed = {
          color: "#FFBC03",
          fields: [
            {
              name: "Name",
              value: server.name,
              inline: false
            },
            {
              name: "ID",
              value: server.id,
              inline: false
            },
            {
              name: "Owner",
              value: owner.user.tag,
              inline: false
            },
            {
              name: "Members",
              value: server.memberCount.toString(),
              inline: false
            }

          ]
        };
        console.log(embed);
        interaction.channel.send({ embeds: [this.client.utils.buildEmbed(embed)] });
      });
    }
  }

  createDefinition() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
  }

}