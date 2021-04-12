/** config.js
* This command is used to manage configuration variables of the bot.
* Everything is supposed to be handled via the execute() method, however
* it is possible to use the other methods directly, too.
*/
const Discord = require("discord.js");
const important_variables = require("../util/config_variables.js").important_variables;
module.exports = {
  name: "config2",
  syntax: "config [action]/[filter][name][value]",
  description: "Manages bot configuration variables",
  note: "This command can widely affect bot's behavior",
  permissions: "",
  master: true,
  aliases: ["cfg", "env"],
  legend: "",
  category: "administrative",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) {
    try {
      switch (args[0]) {
      case "add":
        module.exports.add(message, args, Config);
        break;
      case "update":
      case "set":
        module.exports.update(message, args, Config);
        break;
      case "delete":
      case "del":
        module.exports.delete(message, args, Config, sequelize);
        break;
      default:
        console.log(args)
        let query = "SELECT * FROM Config";
        let important = false;
        const filter = (args[0] != undefined) ? args[0] : "";
        if (filter == "-important") {
          important = true;
        } else if (filter == "-prohibitions") {
          query += "WHERE name LIKE '%_prohibited'";
        } else if (filter == "-ignores") {
          query += "WHERE name LIKE 'ignored_%'";
        }
        console.log(filter)
        console.log(query)
        const [config, metadata] = await sequelize.query(`${query};`);
        if (config) {
          if (config.length > 0) {
            const embed = new Discord.MessageEmbed()
              .setColor("#ffbc03")
              .setTitle("Config records " + filter);
            let id, member, username, name, value;
            for (let i = 0; i < config.length; i++) {
              name = config[i].name;
              if (important) {
                if (!important_variables.includes(name)) {
                  continue;
                }
              }
              value = config[i].value;
              id = config[i].last_updated_by;
              member = message.guild.members.cache.get(id);
              username = member.user.username + "#" + member.user.discriminator;
              embed.addField(`${name}:${value}`, `Last updated by: ${username}`, false);
            }
            embed.setFooter("Undercover Cultist#5057", "");
            message.channel.send(embed);
            return;
          }
          message.reply("Nothing to display");
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  },
  async add(message, args, Config, sequelize) {
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
  },
  async update(message, args, Config, sequelize) {
    args.shift();
    const name = args[0];
    args.shift();
    const input = args.join(" ");
    let query;
    if (input.includes(";")) {
      const oldValue = input.substring(input.indexOf(";") + 1, input.lastIndexOf(";")).trim();
      const newValue = input.substring(input.lastIndexOf(";") + 1).trim();
      query = `UPDATE Config SET value = '${newValue}' WHERE name='${name}' AND value = '${oldValue}'`;
    } else {
      query = `UPDATE Config SET value = '${input}' WHERE name='${name}'`;
      const [rowCount, metadata] = await sequelize.query(`${query};`);
      if (!rowCount) {
        message.reply("That record cannot be found.");
        return;
      }
    }
    message.reply("Record Updated.");
  },
  async delete(message, args, Config, sequelize) {
    args.shift();
    const name = args[0];
    let query = `DELETE FROM Config WHERE name = '${name}'`;
    if (args[1] != null) {
      args.shift();
      const value = args.join(" ");
      query += ` AND value = '${value}'`;
    }
    const [rowCount, metadata] = await sequelize.query(`${query};`);
    if (!rowCount) {
      message.reply("That record cannot be found.");
      return;
    }
    message.reply("Record deleted.");
  }
};