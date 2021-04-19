module.exports = {
  name: "delnote",
  syntax: "delnote [text]",
  description: "Removes the target note from the notes collection of this server",
  note: "",
  permissions: "`MANAGE_MESSAGES`",
  master: false,
  aliases: ["deletenote", "remnote", "removenote"],
  legend: "text",
  category: "utility",
  async execute(message, args, utils) {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.reply("Nono, you need to have `MANAGE_MESSAGES` permission for this command");
      return;
    }
    const result = await utils.query(`DELETE FROM Notes WHERE server = '${message.guild.id}' AND note = '${utils.sanitize(args.join(" "))}';`);
    if (!result) {
      message.reply("That note did not exist.");
      return;
    }

    message.reply("Note deleted.");
    return;

  },
};