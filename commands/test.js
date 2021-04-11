const Discord = require('discord.js');
const utils = require('../util/utils.js');
module.exports = { 	
  name: 'test', 	
  syntax: 'no stable syntax', 	
  description: "no stable description",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: [],
  legend: "",
  category: "administrative",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) { 		
   // let [result, metadata] = await sequelize.query(`SELECT * FROM Config WHERE name = '${args[0]}'`);
   let config = await utils.getConfig(sequelize, Config, args[0], undefined, true);
    message.channel.send(config);
   // message.channel.send("Result: " + result.length);
    //console.log(result)
  }, };