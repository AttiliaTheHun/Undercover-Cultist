module.exports = {
  name: "addnote",
  syntax: "addnote [text]",
  description: "Adds a note inside the note collection of this server",
  note: "Notes are **not** encrypted and are freely visible to other users.",
  permissions: "`MANAGE_MESSAGES`",
  master: false,
  aliases: ["createnote"],
  legend: "text",
  category: "utility",
  async execute(message, args, utils) {
    try {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("Nono, you need to have `MANAGE_MESSAGES` permission for this command");
        return;
      }
      
      const note = utils.sanitize(args.join(" "));
      
      if (note.length > 600) {
        message.reply("The note is too long, please fix it under 600 characters.");
        return;
      } else if (!note) {
        message.reply("The note is *too* short.");
        return;
      }
      

      let query = `INSERT INTO Notes (server, author, note) VALUES ('${message.guild.id}', '${message.author.id}', '${note}');`;

      let result = await utils.query(query);
      message.reply("Note added.");
      return;

    } catch (e) {
      console.log(e);
      if (e.name === "SequelizeUniqueConstraintError") {
        message.reply("That tag already exists.");
        return;
      }
      return e;
    }
  },
};