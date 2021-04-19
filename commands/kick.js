module.exports = {
  name: "kick",
  syntax: "kick [mention]/[id]",
  description: "Kicks the member from the server",
  note: "",
  permissions: "`KICK_MEMBERS`",
  master: false,
  aliases: ["kickuser", "kickmember"],
  legend: "mention, id",
  category: "utility",
  async execute(message, args, {resolveUser}) {
    //try{
if (!message.member.hasPermission("BAN_MEMBERS")) {
      message.reply("You are not allowed to do this.");
      return;
    }

    const member = await resolveUser(message, args);
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
    }	*/},
};
