const Command = require("../Command.js");
const { SlashCommandBuilder,  PermissionFlagsBits } = require('discord.js');

module.exports = class Test extends Command {
  
  constructor(client) {
    super(client, {
      name: 'test',
      aliases: ['tst'],
      syntax: 'test <args>',
      description: `Testing command`,
      category: client.categories.ADMINISTRATIVE,
      clientPermissions: [],
      userPermissions: [PermissionFlagsBits.Administrator],
      examples: ['test test test test'],
      master: true
    });
  }
  
  async execute(message, args) {
      message.channel.send("Success")
  }

  async backslash(interaction) {
    interaction.reply({content: "Test"});
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription(this.description);
  }

}