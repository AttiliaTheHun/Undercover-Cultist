module.exports = {
  name: "addmaster",
  syntax: "addmaster [mention]/[id]",
  description: "Adds user among the bot masters, allowing him to execute administration commands",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: [],
  legend: "mention, id",
  category: "administrative",
  async execute(message, args, utils) {
    try {

      let member = await utils.resolveUser(message, args);
      if(!member || member.id == message.member.id){
        message.channel.send("Couldn't identify the user.");
        return;
      }
      let result = await utils.query(`INSERT INTO Masters (user, promoted_by) VALUES ('${member.user.id}', '${message.author.id}');`);
      message.reply(`<@${member.user.id}> is now a bot Master.`);
      return;

    } catch (e) {
      console.log(e);
      if (e.name === "SequelizeUniqueConstraintError") {
        message.reply("That user already is a bot Master.");
        return;
      }
      return e;
    }
  },
};