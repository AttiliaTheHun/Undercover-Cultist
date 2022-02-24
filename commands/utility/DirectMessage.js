const Command = require("../Command.js");

module.exports = class DirectMessage extends Command {
  
  constructor(client) {
    super(client, {
      name: 'directmessage',
      aliases: ['dm', 'pm'],
      usage: 'directmessage <username/ID><message>',
      description: `DMs the target user the given message`,
      type: client.types.UTILITY,
      userPermissions: [],
      examples: ['directmessage 608673444061773827 Be watching you'],
      master: true
    });
  }
  
  async execute(message, args) {
    let member = await this.client.utils.resolveUser(message, args);
      if(!member){
        message.channel.send("Couldn't identify the user.");
        return;
      }
    args.shift();
    member.user.send({content: args.join(' ')});
  }
   
}