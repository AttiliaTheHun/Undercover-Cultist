const Command = require("../Command.js");

module.exports = class Unban extends Command {
  
  constructor(client) {
    super(client, {
      name: 'unban',
      aliases: [],
      usage: 'unban <username/ID>',
      description: `Removes the ban from target user`,
      type: client.types.UTILITY,
      userPermissions: ['BAN_MEMBERS'],
      examples: ['unban 608673444061773827'],
      master: false
    });
  }
  
  async execute(message, args) {
     //   try{
if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.reply("You are not allowed to do this.");
      return;
    }

    const member = await this.client.utils.resolveUser(message, args);
    if (!member || member.id == message.member.id) {
      message.channel.send("Could not find the user.");
      return 
    }
    if (!member.bannable) {
      message.reply("This member is above my might, I can't ban him");
      return;
    }
    args.shift();
    message.guild.members.unban(member.user.id, args.join(" "));

    message.reply(`The cultist <@${member.user.id}> was allowed to come back to this sacred place.`);
    /*	}catch(err){
          console.log(err);
          message.reply("WTF gimme me permissions bruh");
        }*/
  }
   
}