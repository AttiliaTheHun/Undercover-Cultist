module.exports = {
  name: "cardback",
  syntax: "cardback",
  description: "Sends cardback texture",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "",
  category: "underhand",
  execute(message, args) {
    //WinScreen, LoseScreen, Cardback
    let base_url = "http://underhand.clanweb.eu/res/";
    let file_extension = ".png";
    let url = base_url + args[0] + file_extension;
    message.channel.send(args[0], {
      files: [url]
    });
  },
};