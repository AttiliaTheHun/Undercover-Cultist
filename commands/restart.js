module.exports = {
  name: "restart",
  syntax: "restart",
  description: "Restarts the bot",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: [],
  legend: "",
  category: "administrative",
  async execute(message, args, client) {
      await message.channel.send("Restarting...");
      await console.log(`Restarted by ${message.author.tag}`);
      process.exit();
  },
};