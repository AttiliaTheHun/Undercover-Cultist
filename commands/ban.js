module.exports = {
  name: "ban",
  syntax: "ban [mention]/[id]",
  description: "Bans the target user from the server",
  note: "",
  permissions: "`BAN_MEMBERS`",
  master: false,
  aliases: ["banuser", "banmember"],
  legend: "mention, id",
  category: "utility",
  async execute(message, args, {resolveUser}) {
    //  try{
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.reply("You are not allowed to do this.");
      return;
    }

    const member = await resolveUser(message, args);
    if (!member) {
      message.channel.send("Could not find the user.");
      return 
    }
    if (!member.bannable) {
      message.reply("This member is above my might, I can't ban him");
      return;
    }
    args.shift();
    member.ban(args.join(" "));
    message.reply(`The fake cultist <@${member.user.id}> was banned from this sacred place.`);
    /*  }catch(err){
        console.log(err);
        message.reply("WTF gimme me permissions bruh");
      }*/
  },
};