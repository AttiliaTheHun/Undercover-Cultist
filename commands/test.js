const configDotJSON = require("../config.json");
module.exports = {
  name: "test",
  syntax: "no stable syntax",
  description: "no stable description",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: [],
  legend: "",
  category: "administrative",
  async execute(message, args, utils) {
    let code = new Code();
    
    class Code {
      
    }
  message.channel.send("Done");
  },
};