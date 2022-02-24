const Command = require("../Command.js");

module.exports = class Test extends Command {
  
  constructor(client) {
    super(client, {
      name: 'test',
      aliases: ['tst'],
      usage: 'test <args>',
      description: `Testing command`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['test test test test'],
      master: true
    });
  }
  
  async execute(message, args) {
    throw new Error("Expected Expection, found Error");
  }
   
}