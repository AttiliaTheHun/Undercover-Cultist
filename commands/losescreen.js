module.exports = {
  name: "losescreen",
  syntax: "losescreen",
  description: "Sends lose screen texture",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "",
  category: "underhand",
  execute(message) {
    message.channel.send("LoseScreen", {
      files: ["http://underhand.clanweb.eu/res/LoseScreen.png"]
    });
  },
};