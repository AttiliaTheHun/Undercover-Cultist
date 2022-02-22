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
  async execute(message, args, utils) {


    let member = await utils.resolveUser(message, args);

    if (!member || member.id == message.member.id) {
      message.channel.send("Could not find the user.");
      return 
    }
    
    const result = await utils.query(`DELETE FROM Masters WHERE user = '${member.id}'`);
    if (!result) {
      message.reply("That user was not a bot Master.");
      return;
    }

    message.reply("This user is no longer a bot Master.");
    return;

  },
};