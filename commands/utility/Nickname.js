const Command = require("../Command.js");

module.exports = class Nickname extends Command {
  
  constructor(client) {
    super(client, {
      name: 'nickname',
      aliases: ['setnickname', 'setnick', 'nick'],
      usage: 'defaultcommand <username/ID> <nickname>',
      description: `Changes the nickname of the target member`,
      type: client.types.UTILITY,
      userPermissions: ['MANAGE_NICKNAMES'],
      examples: ['setnickname 608673444061773827 snoodle'],
      master: true
    });
  }
  
  async execute(message, args) {
    //  try{
    if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
      message.reply("SecurityException: `Missing permission`");
      return;
    }
    if (args[0] == null) {
      message.channel.send("NullPointerException: `You must provide an argument`");
      return;
    }

    let member = await this.client.utils.resolveUser(message, args);
    
    if (!member || member.id == message.member.id) {
      message.channel.send("Could not find the user.");
      return 
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