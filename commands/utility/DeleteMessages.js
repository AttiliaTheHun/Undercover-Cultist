const Command = require("../Command.js");

module.exports = class DeleteMessages extends Command {
  
  constructor(client) {
    super(client, {
      name: 'deletemessages',
      aliases: ['removemessages', 'delete', 'remove', 'del'],
      syntax: 'deletemessages <count>',
      description: `Delete the`,
      category: client.categories.UTILITY,
      clientPermissions: ['MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES'],
      examples: ['deletemessages 10'],
      master: false
    });
  }
  
  async execute(message, args) {
    let messageCount = 1;
    if (args[0] && !isNaN(args[0])) {
      messageCount = args[0];
    }
   message.channel.messages.fetch({limit:messageCount}).then(async messages => {
     if (messageCount > 3) {
       message.channel.send(`Cleanup in progress - ${messageCount} message. Please wait.`).then(msg => {
  setTimeout(() => {
    msg.delete();
  }, 2000);
  });
     }
     
      await messages.forEach(msg => msg.delete());
     
    });
  
  
  }
}