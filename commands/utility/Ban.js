const Command = require("../Command.js");

module.exports = class Ban extends Command {
  
  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: [],
      usage: 'ban <username/ID>',
      description: `Bans target user from the server`,
      type: client.types.UTILITY,
      userPermissions: ['BAN_MEMBERS'],
      examples: ['ban 608673444061773827'],
      master: false
    });
  }
  
  async execute(message, args) {
    //  try{
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      message.reply("You are not allowed to do this.");
      return;
    }

    let id;
    if(!isNaN(args[0])){
      id = args[0];
    }else{
    const member = await this.client.utils.resolveUser(message, args);
    if (!member || member.id == message.member.id) {
      message.channel.send("Could not find the user.");
      return 
    }
    if (!member.bannable) {
      message.reply("This member is above my might, I can not ban him");
      return;
    }
    }
    args.shift();

    message.guild.members.ban(id,{days: 0, reason: args.join(" ")}).catch(_ => message.channel.send("Could not do the action"));
    message.reply(`The fake cultist <@${id}> was banned from this sacred place.`);
    /*  }catch(err){
        console.log(err);
        message.reply("WTF gimme me permissions bruh");
      }*/
  }
   
}