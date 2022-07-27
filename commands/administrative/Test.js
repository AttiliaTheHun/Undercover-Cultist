const Command = require("../Command.js");

module.exports = class Test extends Command {
  
  constructor(client) {
    super(client, {
      name: 'test',
      aliases: ['tst'],
      syntax: 'test <args>',
      description: `Testing command`,
      category: client.categories.ADMINISTRATIVE,
      clientPermissions: [],
      userPermissions: ['ADMINISTRATOR'],
      examples: ['test test test test'],
      master: true
    });
  }
  
  async execute(message, args) {
      message.channel.send("Success")
  }

}