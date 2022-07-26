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
      userPermissions: [],
      examples: ['test test test test'],
      master: true
    });
  }
  
  async execute(message, args) {
    throw new message.client.errors.UserInputError("Use only numbers please");
  }
   
}