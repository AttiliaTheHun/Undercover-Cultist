/**
* THIS IS THE FIRST VERSION OF THE config COMMAND, IT HAS BEEN
* REMADE WITH THE FOCUS ON MORE PROGRAMMAING APPROACH AND NEW
* FEATURES WERE ADDED. THIS FILE MAY NO LONGER WORK WITH THE
* CURRENT DATABASE STRUCTURE.
*/
const Discord = require("discord.js");
module.exports = {
  name: "config",
  syntax: "config [name][value]",
  description: "Manages bot configuration variables",
  note: "This command can widely affect bot's behavior",
  permissions: "",
  master: true,
  aliases: ["cfg", "env"],
  legend: "",
  category: "administrative",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequalize) {
    try {
      if (args[0] == null) {
        const [config, metadata] = await Config.findAll({ where: {} });
        if (config) {
          if (config.length > 0) {
            const embed = new Discord.MessageEmbed()
              .setColor("#ffbc03")
              .setTitle("Config records");
            let id;
            let member;
            let username;

            for (let i = 0; i < config.length; i++) {
              id = config[i].get("last_updated_by");
              member = message.guild.members.cache.get(id);
              username = member.user.username + "#" + member.user.discriminator;
              embed.addField(`${config[i].get("name")}:${config[i].get("value")}`, `Last updated by: ${username}`, false);
            }
            embed.setFooter("Undercover Cultist#5057", "");
            message.channel.send(embed);
            return;
          }
          message.reply("Nothing to display");
        }
        return;
      } else if (args[0] == "add") {
        args.shift();
        const name = args[0];
        args.shift();
        const value = args.join(" ");
        const tag = await Config.create({
          name: name,
          value: value,
          last_updated_by: message.author.id
        });
        message.reply("Record added");
        return;
      } else if (args[0] == "update" || args[0] == "set") {
        args.shift();
        const name = args[0];
        args.shift();
        const input = args.join(" ");
        if (input.includes("-")) {
          const oldValue = input.substring(input.indexOf("-") + 1, input.lastIndexOf("-")).trim();
          const newValue = input.substring(input.lastIndexOf("-") + 1).trim();
          const rowCount = await Config.update({ value: newValue }, { where: { name: name, value: oldValue } });
          if (!rowCount) {
            message.reply("That record cannot be found.");
            return;
          }
        } else {
          const rowCount = await Config.update({ value: input }, { where: { name: name } });
          if (!rowCount) {
            message.reply("That record cannot be found.");
            return;
          }
        }
        message.reply("Record Updated.");
        return;
      } else if (args[0] == "delete" || args[0] == "del") {
        args.shift();
        const name = args[0];
        if (args[1] == null) {
          const rowCount = await Config.destroy({ where: { name: name } });
          if (!rowCount) {
            message.reply("That record cannot be found.");
            return;
          }
        } else {
          args.shift();
          const value = args.join(" ");
          const rowCount = await Config.destroy({ where: { name: name, value: value } });
          if (!rowCount) {
            message.reply("That record cannot be found.");
            return;
          }
        }
        message.reply("Record deleted.");
        return;
      }

    } catch (err) {
      console.log(err);
      return err;

    }
  },
};