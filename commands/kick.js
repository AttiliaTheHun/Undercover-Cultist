const utils = require("../util/utils.js");
module.exports = {
  name: "kick",
  syntax: "kick [mention]/[id]",
  description: "Kicks the member from the server",
  note: "",
  permissions: "`KICK_MEMBERS`",
  master: false,
  aliases: ["kickuser"],
  legend: "mention, id",
  category: "utility",
  async execute(message, args) {
    //try{
    if (!message.member.hasPermission("KICK_MEMBERS")) {
      message.reply("SecurityException: `Missing permission`");
      return;
    }
    if (args[0] == null) {
      message.channel.send("NullPointerException: `You must provide an argument`");
      return;
    }
    const user = await utils.resolveUser(message, args);
    if (user == undefined) {
      return message.channel.send("Could not find the user.")
    }
    if (!user.kickable) {
      message.reply("This member is above my might, I can't ban him");
      return;
    }
    args.shift();
    user.kick(args.join(" "));
    message.reply(`The fake cultist <@${user.id}> was banished from this sacred place.`);
    /*}catch(err){
      console.log(err);
      message.reply("WTF gimme me permissions bruh");
    }	*/},
};
