const Discord = require("discord.js");
const prefix = require("./../config.json").prefix;
const utils = require("./../util/utils.js");
module.exports = {
  name: "help2",
  syntax: "help \"\"/[command]",
  description: "Shows help message",
  note: "",
  permissions: "",
  master: false,
  aliases: ["commands"],
  legend: "",
  category: "informative",
  execute(message, args, client, Config, Masters, Bans, Notes, sequelize) {

    const embed = new Discord.MessageEmbed();
    embed.setColor("#005E1F");
    embed.setTimestamp();
    embed.setFooter("We could benefit from having someone on the inside", client.user.avatarURL());
    let command;
    const allowMaster = utils.isMaster(message.author.id, sequelize);
    if (args[0]) {
      const commandName = args.shift().toLowerCase();

      command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
      if (command && command.master && !allowMaster) {
        command = undefined;
      }
    }
    // Return if the command doesn't exist
    if (!command) {

      let underhand_commands, informative_commands, utility_commands, administrative_commands;
      if (allowMaster) {
        underhand_commands = client.commands.filter(cmd => cmd.category == "underhand");
      } else {
        underhand_commands = client.commands.filter(cmd => cmd.category == "underhand" && cmd.master == false);
      }
      if (allowMaster) {
        informative_commands = client.commands.map(cmd => cmd.category == "informative");
      } else {
        informative_commands = client.commands.map(cmd => cmd.category == "informative" && cmd.master == false);
      }
      if (allowMaster) {
        utility_commands = client.commands.map(cmd => cmd.category == "utility");
      } else {
        utility_commands = client.commands.map(cmd => cmd.category == "utility" && cmd.master == false);
      }
      if (allowMaster) {
        administrative_commands = client.commands.map(cmd => cmd.category == "administrative");
      }
      embed.setTitle("My Commands")
      embed.setDescription(`Don't forget to use my prefix (${prefix}) before every command! You can also use *help [command]* to gain more precise info.`);
      if (underhand_commands) {
        embed.addField("Underhand Commands", underhand_commands.array().join(" "), false);
      }
      if (informative_commands) {
        embed.addField("Informative Commands", informative_commands.join(" "), false);
      }
      if (utility_commands) {
        embed.addField("Utility Commands", utility_commands.join(" "), false);
      }
      if (administrative_commands) {
        embed.addField("Administrative Commands", administrative_commands.join(" "), false);
      }
      /*  embed.addField("Texture commands", "card cardback option god winscreen losescreen", false)
        embed.addField("Informative commands", "server user event events credits", false)
        embed.addField("Utility commands", "addnote delnote notes clearnotes embed ban unban kick setnickname generate play", false)      */
    } else {

      const name = command.name;
      const syntax = prefix + command.syntax;
      const description = command.descrption;
      const note = command.note;
      const permissions = command.permissions;
      const aliases = command.aliases;
      let legend = command.legend;


      legend = legend.replace("god", "[god] god name or it's number");
      legend = legend.replace("number", "[number] an integer in range of the numbers in parenthesis");
      legend = legend.replace("id", "[id] user id, for example 672748100007362561");
      legend = legend.replace("mention", "[mention] user mention, for example <@672748100007362561>")
      legend = legend.replace("username", "[username] user name and his tag, for example Undercover Cultist#5057");
      legend = legend.replace("uce-formatted-text", "[uce-formatted-text] a text that is processed by special formatting");
      legend = legend.replace("blessings", "[blessings] string containing first letters of target gods names, for example ykj");

      embed.addField(name, syntax, false);
      embed.addField("Description", description, false);
      if (note != "") {
        embed.addField("Note", note, false);
      }
      if (permissions != "") {
        embed.addField("Permissions needed", permissions, false);
      }
      if (aliases != "") {
        embed.addField("Aliases", aliases.join(", "), false);
      }
      if (legend != "") {
        embed.addField("Legend", legend, false);
      }


    }


    message.channel.send(embed);


  }


};
