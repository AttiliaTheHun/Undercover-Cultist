module.exports = {
  name: "softban",
  syntax: "winscreen",
  description: "Sends in screen texture",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "",
  category: "utility",
  execute(message) {
    message.channel.send("WinScreen", {
      files: ["http://underhand.clanweb.eu/res/WinScreen.png"]
    });
  },
};