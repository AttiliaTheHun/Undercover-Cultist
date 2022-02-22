module.exports = {
  name: "help",
  syntax: "help \"\"/[command]",
  description: "Shows help message",
  note: "",
  permissions: "",
  master: false,
  aliases: ["commands"],
  legend: "",
  category: "informative",
  async execute(message, args, utils) {
    
    let client = message.client;
    
    let embed = {
      color: "#005E1F",
      timestamp: new Date(),
      footer: {
        text: "We could benefit from having someone on the inside",
        icon_url: client.user.avatarURL()
      }
      
    };
  let prefix = await utils.getConfig('prefix');
  let command;
    const allowMaster = await utils.isMaster(message.author.id);
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
      if(allowMaster){
        
        underhand_commands = client.commands.filter(cmd => cmd.category == "underhand").map(cmd => cmd.name);
        informative_commands = client.commands.filter(cmd => cmd.category == "informative").map(cmd => cmd.name);
        utility_commands = client.commands.filter(cmd => cmd.category == "utility").map(cmd => cmd.name);
        administrative_commands = client.commands.filter(cmd => cmd.category == "administrative").map(cmd => cmd.name);
      } else {
        underhand_commands = client.commands.filter(cmd => cmd.category == "underhand" && cmd.master == false).map(cmd => cmd.name);
        informative_commands = client.commands.filter(cmd => cmd.category == "informative" && cmd.master == false).map(cmd => cmd.name);
        utility_commands = client.commands.filter(cmd => cmd.category == "utility" && cmd.master == false).map(cmd => cmd.name);

      }
      embed.title = "My Commands";
      embed.description = `Don't forget to use my prefix (${prefix}) before every command! You can also use *help [command]* to gain more precise info.`;
      embed.fields = [
        {
          name: "Underhand Commands",
          value: underhand_commands.join(" "),
          inline: false
        },
        {
          name: "Informative Commands",
          value: informative_commands.join(" "),
          inline: false
        },
        {
          name: "Utility Commands",
          value: utility_commands.join(" "),
          inline: false
        }
      ]
      if(allowMaster){
        embed.fields.push({
          name: "Administrative commands",
          value: administrative_commands.join(" "),
          inline: false
        });
      }
    

    } else {

      const name = command.name;
      const syntax = prefix + command.syntax;
      const description = command.description;
      const note = command.note;
      const permissions = command.permissions;
      const aliases = command.aliases;
      let legend = command.legend;


      legend = legend.replace("god", "[god] god name or it's number");
      legend = legend.replace("number", "[number] an integer in range of the numbers in parenthesis");
      legend = legend.replace("id", "[id] user id, for example 672748100007362561");
      legend = legend.replace("mention", "[mention] user mention, for example <@672748100007362561>")
      legend = legend.replace("username", "[username] user name and his tag, for example Undercover Cultist#5057");
      legend = legend.replace("emd-formatted-text", "[emd-formatted-text] a text that is processed by special formatting");
      legend = legend.replace("blessings", "[blessings] string containing first letters of target gods names, for example ykj");

      embed.fields = [{
        name: name,
        value: syntax, 
        inline: false
      },
      {
        name: "Description",
        value: description, 
        inline: false
      }];               
                     
                     
      if (note != "") {
        embed.fields.push({
        name: "Note",
        value: note, 
        inline: false
      });
      }
      if (permissions != "") {
        embed.fields.push({
        name: "Permissions needed",
        value: permissions, 
        inline: false
      });
      }
      if (aliases != "") {
        embed.fields.push({
        name: "Aliases",
        value: aliases.join(", "), 
        inline: false
      });
      }
      if (legend != "") {
        embed.fields.push({
        name: "Legend",
        value: legend, 
        inline: false
      });
      }


    }

    message.channel.send({embed : utils.buildEmbed(embed)});

  }


};
