module.exports = {
  name: "nickname",
  syntax: "nickname [mention]/[id] [nickname]",
  description: "Changes the nickname of the target member",
  note: "",
  permissions: "`MANAGE_NICKNAMES`",
  master: false,
  aliases: ["nick", "setnick", "setnickname"],
  legend: "mention, id",
  category: "utility",
  async execute(message, args, utils) {
    //  try{
    if (!message.member.hasPermission("MANAGE_NICKNAMES")) {
      message.reply("SecurityException: `Missing permission`");
      return;
    }
    if (args[0] == null) {
      message.channel.send("NullPointerException: `You must provide an argument`");
      return;
    }

    let member = await utils.resolveUser(message, args);
    
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

  },
};