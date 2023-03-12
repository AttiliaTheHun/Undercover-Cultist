const Command = require("../Command.js");

module.exports = class Query extends Command {

  constructor(client) {
    super(client, {
      name: 'query',
      aliases: ['rawquery', 'sql'],
      syntax: 'query <sql-code>',
      description: `Directly execute SQL query on the database, it is not recommended to use.`,
      category: client.categories.ADMINISTRATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['query SELECT * FROM Configs;'],
      master: true
    });
  }

  async execute(message, args) {
    try {
      let [result, error] = await this.client.utils.queryPowerTwo(args.join(" "));
      if (error) {
        return message.channel.send({ content: error.message});
      }
      message.channel.send({ content: "Result length: " + result.length });
      if (result.length > 0) {
        message.channel.send({ content: JSON.stringify(result) });
      }
      
      console.log(result);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

}