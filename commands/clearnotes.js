module.exports = {
  name: "clearnotes",
  syntax: "clearnotes",
  description: "Clears the collection of notes of this server",
  note: "",
  permissions: "`AMINISTRATOR`",
  master: false,
  aliases: [],
  legend: "",
  category: "utility",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) {

    if (!message.member.hasPermission("ADMINISTRATOR")) {
      message.reply("Haha, this is admin-only command.");
      return;
    }
    const [result, metadata] = await sequelize.query(`DELETE FROM Notes WHERE server = '${message.guild.id}';`);
    if (!result) {
      message.reply("No notes to clear.");
      return;
    }

    message.reply("All clear.");

  },
};