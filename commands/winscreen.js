module.exports = {
  name: "winscreen",
  syntax: "winscreen",
  description: "Sends in screen texture",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "",
  category: "underhand",
  execute(message) {
    message.channel.send("WinScreen", {
      files: ["http://underhand.clanweb.eu/res/WinScreen.png"]
    });
  },
};