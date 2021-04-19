module.exports = {
  name: "unban",
  syntax: "unban [mention]/[id]",
  description: "Removes the ban from target user",
  note: "",
  permissions: "`BAN_MEMBERS`",
  master: false,
  aliases: [],
  legend: "mention, id",
  category: "utility",
  async execute(message, args, {resolveUser}) {
    //   try{
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
    message.guild.members.unban(member.user.id, args.join(" "));

    message.reply(`The cultist <@${member.user.id}> was allowed to come back to this sacred place.`);
    /*	}catch(err){
          console.log(err);
          message.reply("WTF gimme me permissions bruh");
        }*/
  },
};