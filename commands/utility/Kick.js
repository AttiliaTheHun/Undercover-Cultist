const Command = require("../Command.js");

module.exports = class Kick extends Command {
  
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: [],
      usage: 'kick <username/ID>',
      description: `Kicks target user from the server`,
      type: client.types.UTILITY,
      userPermissions: ['KICK_MEMBERS'],
      examples: ['kick 608673444061773827'],
      master: false
    });
  }
  
  async execute(message, args) {
  if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.reply("You are not allowed to do this.");
      return;
    }

    const member = await this.client.utils.resolveUser(message, args);
    if (!member || member.id == message.member.id) {
      message.channel.send("Could not find the user.");
      return 
    }
    if (!member.kickable) {
      message.reply("This member is above my might, I can't kick him");
      return;
    }
    args.shift();
    member.kick(args.join(" "));
    message.reply(`The fake cultist <@${member.user.id}> was banished from this sacred place.`);
    /*}catch(err){
      console.log(err);
      message.reply("WTF gimme me permissions bruh");
    }	*/
  }
   
}