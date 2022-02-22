module.exports = {
  name: "globalunban",
  syntax: "globalunban [mention]/[id]",
  description: "Removes the global ban status from the user",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: ["gunban"],
  legend: "mention, id",
  category: "administrative",
  async execute(message, args, utils) {

    const user = await utils.resolveUser(message, args);
    if (!user || user.id == message.member.id) {
      message.channel.send("Could not find the user.");
      return 
    }

    const result = await utils.query(`DELETE FROM Bans WHERE user = '${user.id}' AND global = true;`);
    if (!result) {
      message.reply("That user was not globally banned.");
      return;
    }

    message.reply("This user is no longer globally banned.");
    return;

  },
};