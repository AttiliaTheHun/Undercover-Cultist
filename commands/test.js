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
    let name = "complete_log_channel";
    let value = "";
    if(configDotJSON[name]){
      value = configDotJSON[name];
    }else{
      value = false;
    }
    message.channel.send(value);
  },
};