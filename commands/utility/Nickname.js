const Command = require("../Command.js");

module.exports = class Nickname extends Command {
  
  constructor(client) {
    super(client, {
      name: 'nickname',
      aliases: ['setnickname', 'setnick', 'nick'],
      syntax: 'defaultcommand <username/ID> <nickname>',
      description: `Changes the nickname of the target member`,
      category: client.categories.UTILITY,
      clientPermissions: ['MANAGE_NICKNAMES'],
      userPermissions: ['MANAGE_NICKNAMES'],
      examples: ['setnickname 608673444061773827 snoodle'],
      master: true
    });
  }
  
  async execute(message, args) {
    //  try{
    if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
      throw new message.client.errors.UserPermissionError("You cannot do that");
      return;
    }
    if (args[0] == null) {
      throw new message.client.errors.UserInputError("You must provide an argument");
    }

    let member = await this.client.utils.resolveUser(message, args);
    
    if (!member || member.id == message.member.id) {
     throw new message.client.errors.UserInputError("Could not find the user.");
    }
    
    if (!member.managable) {
      message.reply("The discord permission system will not let me do this");
      return;
    }
    member.setNickname(args.join(" ")).catch(() => {
      message.reply("WTF gimme me permissions bruh");
    });

    /* }catch(err){
       console.log(err);
       message.reply("dead");
     }*/
  }
   
}