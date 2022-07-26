const Command = require("../Command.js");

module.exports = class Help extends Command {
  
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['commands'],
      syntax: 'help <command>',
      description: `Shows help message`,
      category: client.categories.INFORMATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['help', 'help generate'],
      master: false
    });
  }
  
  async execute(message, args) {
      
    let client = message.client;
    
    let embed = {
      color: "#005E1F",
      timestamp: new Date(),
      footer: {
        text: "We could benefit from having someone on the inside",
        icon_url: client.user.avatarURL()
      }
      
    };
  let prefix = await this.client.utils.getConfig('prefix');
  let command;
    const allowMaster = await this.client.utils.isMaster(message.author.id);
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
        
        underhand_commands = client.commands.filter(cmd => cmd.category == client.categories.UNDERHAND).map(cmd => cmd.name);
        informative_commands = client.commands.filter(cmd => cmd.category == client.categories.INFORMATIVE).map(cmd => cmd.name);
        utility_commands = client.commands.filter(cmd => cmd.category == client.categories.UTILITY).map(cmd => cmd.name);
        administrative_commands = client.commands.filter(cmd => cmd.category == client.categories.ADMINISTRATIVE).map(cmd => cmd.name);
      } else {
        underhand_commands = client.commands.filter(cmd => cmd.category == client.categories.UNDERHAND && cmd.master == false).map(cmd => cmd.name);
        informative_commands = client.commands.filter(cmd => cmd.category == client.categories.INFORMATIVE && cmd.master == false).map(cmd => cmd.name);
        utility_commands = client.commands.filter(cmd => cmd.category == client.categories.UTILITY && cmd.master == false).map(cmd => cmd.name);

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
      const permissions = command.userPermissions;
      const aliases = command.aliases;
      const examples = command.examples;

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
                                        
      if (permissions != []) {
        embed.fields.push({
        name: "Permissions needed",
        value: permissions.join(", "), 
        inline: false
      });
      }
      if (aliases != []) {
        embed.fields.push({
        name: "Aliases",
        value: aliases.join(", "), 
        inline: false
      });
      }

      if (examples != []) {
        embed.fields.push({
        name: "Examples",
        value: examples.join(", "), 
        inline: false
      });
      }



    }

    message.channel.send({embeds: [this.client.utils.buildEmbed(embed)]});


  }
   
}