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
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) {
    try {
      if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        message.reply("Nono, you need to have `MANAGE_MESSAGES` permission for this command");
        return;
      }
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      const note = args.join(" ");
      if (note.length > 600) {
        message.reply("The note is too long, please fix it under 600 characters.");
        return;
      } else if (!note) {
        message.reply("The note is *too* short.");
        return;
      }
      today = mm + "/" + dd + "/" + yyyy;

      const tag = await Notes.create({
        server: message.guild.id,
        author: message.author.id,
        date: today,
        note: note,
      });
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