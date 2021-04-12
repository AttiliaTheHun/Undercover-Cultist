module.exports = {
  name: "delmaster",
  syntax: "delnote [mention]/[id]",
  description: "Removes the Master status from the user",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["deletemaster", "remmaster", "removemaster"],
  legend: "mention, id",
  category: "administrative",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) {

    let id
    let member;
    if (!isNaN(args[0])) {
      id = args[0];
      member = await message.guild.members.fetch(id);
      if (member == undefined) {
        message.reply("This ID does not seem to belong to any member of this guild");
      }
    } else {
      if (!message.content.includes("<@")) {
        message.reply("I can't identify the user from this, sorry");
      }
      member = message.mentions.members.first();
      id = member.id;
    }
    const [result, metadata] = await sequelize.query(`DELETE FROM Masters WHERE user = '${id}'`);
    if (!result) {
      message.reply("That user was not a bot Master.");
      return;
    }

    message.reply("This user is no longer a bot Master.");
    return;

  },
};