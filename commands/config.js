/** config.js
* This command is used to manage configuration variables of the bot.
* Everything is supposed to be handled via the execute() method, however
* it is possible to use the other methods directly, too.
*/
const important_variables = require("../util/config_variables.js").important_variables;
module.exports = {
  name: "config",
  syntax: "config [action]/[filter][name][value]",
  description: "Manages bot configuration variables",
  note: "This command can widely affect bot's behavior",
  permissions: "",
  master: true,
  aliases: ["cfg", "env", "conf"],
  legend: "",
  category: "administrative",
  async execute(message, args, utils) {
    try {
      switch (args[0]) {
      case "add":
      case "put":
        module.exports.add(message, args, utils);
        break;
      case "update":
      case "set":
        module.exports.update(message, args, utils);
        break;
      case "delete":
      case "del":
        module.exports.delete(message, args, utils);
        break;
      default:
        let query = "SELECT * FROM Configs";
        let important = false;
        const filter = (args[0] != undefined) ? args[0] : "";
        if (filter == "-important") {
          important = true;
        } else if (filter == "-prohibitions") {
          query += "WHERE name LIKE '%_prohibited'";
        } else if (filter == "-ignores") {
          query += "WHERE name LIKE 'ignored_%'";
        }
        const config = await utils.query(`${query};`);
        if (config) {
          if (config.length > 0) {
            let embed = {
              title: "Config records " + filter,
              color: "#FFBC03",
              fields: []
            }
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
              username = utils.getUserNameStringFromMember(member);
              embed.fields.push({
                name: `${name}:${value}`,
                value: `Last updated by: ${username}`,
                inline: false
              });
            }
            embed.footer = {
              text: "Undercover Cultist#5057"
            };
            message.channel.send(await utils.buildEmbed(embed));
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
  async add(message, args, utils) {
    args.shift();
    const name = utils.sanitize(args[0]);
    args.shift();
    const value = utils.sanitize(args.join(" "));
    let query = `INSERT INTO Configs (name, value, last_updated_by) VALUES ('${name}', '${value}', '${message.author.id}');`;
    let result = await utils.query(query);
    message.reply("Record added");
  },
  async update(message, args, utils) {
    args.shift();
    const name = utils.sanitize(args[0]);
    args.shift();
    const input = args.join(" ");
    let query;
    if (input.includes(";")) {
      const oldValue = utils.sanitize(input.substring(input.indexOf(";") + 1, input.lastIndexOf(";")).trim());
      const newValue = utils.sanitize(input.substring(input.lastIndexOf(";") + 1).trim());
      query = `UPDATE Configs SET value = '${newValue}', last_updated_by = '${message.author.id}' WHERE name='${name}' AND value = '${oldValue}'`;
    } else {
      query = `UPDATE Configs SET value = '${input}', last_updated_by = '${message.author.id}' WHERE name='${name}'`;
      const rowCount = await utils.query(`${query};`);
      if (!rowCount) {
        message.reply("That record cannot be found.");
        return;
      }
    }
    message.reply("Record Updated.");
  },
  async delete(message, args, utils) {
    args.shift();
    const name = utils.sanitize(args[0]);
    let query = `DELETE FROM Configs WHERE name = '${name}'`;
    if (args[1] != null) {
      args.shift();
      const value = utils.sanitize(args.join(" "));
      query += ` AND value = '${value}'`;
    }
    const rowCount= await utils.query(`${query};`);
    if (!rowCount) {
      message.reply("That record cannot be found.");
      return;
    }
    message.reply("Record deleted.");
  }
};