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
  async execute(message, args, {resolveUser, query}) {
    try {
/*
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();
      today = mm + "/" + dd + "/" + yyyy;*/
      let member = resolveUser(message, args);
      if(!member){
        message.channel.send("Couldn't identify the user.");
        return;
      }
      await query(`INSERT INTO Masters (user, promoted_by) VALUES ('${member.user.id}', '${message.author.id}');`);
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