const Command = require("../Command.js");

module.exports = class Query extends Command {
  
  constructor(client) {
    super(client, {
      name: 'query',
      aliases: ['rawquery', 'sql'],
      syntax: 'quer <sql-code>',
      description: `Directly execute SQL on the database, it is not recommended to use`,
      category: client.categories.ADMINISTRATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['query SELECT * FROM Configs;'],
      master: true
    });
  }
  
  async execute(message, args) {
     try {
      let result = await this.client.utils.query(args.join(" "));
      message.channel.send("Result length: " + result.length);
      console.log(result);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
   
}