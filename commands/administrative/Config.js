const Command = require("../Command.js");
const important_variables = require('../../util/config_variables.js').important_variables;

module.exports = class Config extends Command {
  
  constructor(client) {
    super(client, {
      name: 'config',
      aliases: ['cfg', 'env', 'conf'],
      usage: 'config (<add/set/del><key><value) OR (<-filter>)',
      description: `Manage bot's configuration variables (DANGER ZONE)`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: [
        'config add channel_ignored 98598866548912', 
        'config del complete_log_channel', 
        'config -prohibitions',
        'config -ignore',
        'config -important'
      ],
      master: true
    });
  }
  
  async execute(message, args) {
    try {
      switch (args[0]) {
      case "add":
      case "put":
        this.add(message, args);
        break;
      case "update":
      case "set":
        this.update(message, args);
        break;
      case "delete":
      case "del":
      case "remove":
      case "rem":
        this.delete(message, args);
        break;
      default:
        let query = "SELECT * FROM Configs";
        let important = false;
        const filter = (args[0] != undefined) ? args[0] : "";
        if (filter == "-important") {
          important = true;
        } else if (filter == "-prohibitions") {
          query += " WHERE name LIKE '%_prohibited';";
        } else if (filter == "-ignores") {
          query += " WHERE name LIKE 'ignored_%';";
        }
        const config = await this.client.utils.query(`${query};`);
          console.log(config)
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
              console.log(id);
              member = await message.guild.members.cache.get(id);
              console.log(member)
              username = member.user.tag;
              embed.fields.push({
                name: `${name}:${value}`,
                value: `Last updated by: ${username}`,
                inline: false
              });
            }
            embed.footer = {
              text: this.client.user.tag
            };
            message.channel.send({embeds: [await this.client.utils.buildEmbed(embed)]});
            return;
          }
          message.reply("Nothing to display");
        }
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  
  async add(message, args) {
    args.shift();
    const name = this.client.utils.sanitize(args[0]);
    args.shift();
    const value = this.client.utils.sanitize(args.join(" "));
    let query = `INSERT INTO Configs (name, value, last_updated_by) VALUES ('${name}', '${value}', '${message.author.id}');`;
    let result = await this.client.utils.query(query);
    message.reply("Record added");
  }
  
  async update(message, args) {
    args.shift();
    const name = this.client.utils.sanitize(args[0]);
    args.shift();
    const input = args.join(" ");
    let query;
    if (input.includes(";")) {
      const oldValue = this.client.utils.sanitize(input.substring(input.indexOf(";") + 1, input.lastIndexOf(";")).trim());
      const newValue = this.client.utils.sanitize(input.substring(input.lastIndexOf(";") + 1).trim());
      query = `UPDATE Configs SET value = '${newValue}', last_updated_by = '${message.author.id}' WHERE name='${name}' AND value = '${oldValue}'`;
    } else {
      query = `UPDATE Configs SET value = '${input}', last_updated_by = '${message.author.id}' WHERE name='${name}'`;
      const rowCount = await this.client.utils.query(`${query};`);
      if (!rowCount) {
        message.reply("That record cannot be found.");
        return;
      }
    }
    message.reply("Record Updated.");
  }
  
  async delete(message, args) {
    args.shift();
    const name = this.client.utils.sanitize(args[0]);
    let query = `DELETE FROM Configs WHERE name = '${name}'`;
    if (args[1] != null) {
      args.shift();
      const value = this.client.utils.sanitize(args.join(" "));
      query += ` AND value = '${value}'`;
    }
    const rowCount= await this.client.utils.query(`${query};`);
    if (!rowCount) {
      message.reply("That record cannot be found.");
      return;
    }
    message.reply("Record deleted.");
  }
   
}