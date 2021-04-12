/** utils.js
* This is a library of usefull methods
*/
const log = require('./log');
const configDotJSON = require('../config.json');
const Discord = require("discord.js");
module.exports = {
   randomArrayItem(array) {
      let item = array[Math.floor(Math.random() * array.length)];
      return item;
   }, async getConfig(sequelize, Config, name, args, checkConfigDotJSON){
   	let where = `WHERE name = '${name}'`;
    if(args){
      where += ` AND value = '${args}'`;
    }
    try{
      const [results, metadata] = await sequelize.query(`SELECT * FROM Config ${where};`);
      if (results) {
        if(results.length > 0){
          return results[0].value;
        }else if(checkConfigDotJSON){
          return configDotJSON[name];
        }
      }
    }catch(err){
     // utils.log(message, args, client, Config, type, command, error, guild);
      console.log(err);   
    }
   }, async log(message, args, client, Config, type, command, error, guild){
      
      // yet have to find if /utils/log or /commands/log is the newer version
      
   }, async resolveUser(message, args){
      if(message.mentions.members.first() != null){
      user = message.mentions.members.first();
    }else if(args[0] == null){
      user = message.member;
    }else if(args.join(" ").includes("#")){
      let tag = args.join(" ");
      let username= tag.substring(0, tag.indexOf("#"));
      let discriminator = tag.substring(tag.indexOf("#") + 1, tag.length);
      user = await message.guild.members.cache.find(user => user.user.username.includes(username) && user.user.discriminator == discriminator);
    }else if(!isNaN(args[0])){
      user = await message.guild.members.cache.get(args[0]);
    }else{
      return;
    }
    return user;    
  
   }, async isMaster(user_id, sequelize){
     // yet to do
   }, async handleDM(){
     
   }, async handleMessage(){
     
   }
}