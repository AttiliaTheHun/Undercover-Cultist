const Command = require("../Command.js");

module.exports = class restart extends Command {
  
  constructor(client) {
    super(client, {
      name: 'restart',
      aliases: ['reboot', 'kill'],
      syntax: 'restart',
      description: `Restarts the bot, can cancel the execution of other commands`,
      category: client.categories.ADMINISTRATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['restart'],
      master: true
    });
  }
  
  async execute(message, args) {
      await message.channel.send("Restarting...");
      await console.log(`Restarted by ${message.author.tag}`);
      process.exit();
  }
   
}