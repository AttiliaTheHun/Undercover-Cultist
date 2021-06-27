module.exports = {
  name: "playerguide",
  syntax: "playerguide",
  description: "Describes the usage of the `play` command",
  note: "It produces a huge text wall, so use it in bot commands channels.",
  permissions: "",
  master: false,
  aliases: ["pguide", "playguide"],
  legend: "",
  category: "informative",
  execute(message) {
    message.channel.send("WinScreen", {
      files: ["http://underhand.clanweb.eu/res/WinScreen.png"]
    });
  },
};