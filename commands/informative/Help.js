const Command = require("../Command.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports = class DefaultCommand extends Command {
  
  constructor(client) {
    super(client, {
      name: 'help',
      aliases: ['commands'],
      syntax: 'help <command>',
      description: `Shows help message`,
      category: client.categories.INFORMATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['help', 'help stats'],
      master: false
    });
  }
  
  async execute(message, args) {
      
    const client = message.client;
    
    let embed = {
      color: "#005E1F",
      timestamp: Date.now(),
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
      let commandsData = [];
      for (let category in this.client.categories) {
        commandsData.push({
          name: this.client.categories[category],
          commands: []
        });
      }
      for (let i = 0; i < commandsData.length; i++) {
        if (allowMaster) {
          commandsData[i].commands = client.commands.filter(cmd => cmd.category == commandsData[i].name).map(cmd => cmd.name);
        } else {
          commandsData[i].commands = client.commands.filter(cmd => cmd.category == commandsData[i].name && cmd.master == false).map(cmd => cmd.name);
        }
      }
      
      embed.title = "My Commands";
      embed.description = `Don't forget to use my prefix (${prefix}) before every command! You can also use *help [command]* to gain more precise info.`;
      embed.fields = []
      for (let object of commandsData) {
        if (object.commands.length > 0) {
          embed.fields.push( {
          name: `${this.client.utils.capitalize(object.name)} commands`,
          value: object.commands.join(" "),
          inline: false
        });
        }
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

  async backslash(interaction) {

    const client = interaction.client;
    let command = null;
    let commandName = null;
    let prefix = await this.client.utils.getConfig('prefix');
    const allowMaster = await this.client.utils.isMaster(interaction.user.id);
    
    if (interaction.options.getString('command')) {
      commandName = interaction.options.getString('command');
      command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
      if (command && command.master && !allowMaster) {
        command = undefined;
      }
    }

    
    
    let embed = {
      color: "#005E1F",
      timestamp: Date.now(),
      footer: {
        text: "We could benefit from having someone on the inside",
        icon_url: client.user.avatarURL()
      }
      
    };
  
    // Return if the command doesn't exist
    if (!command) {
      let commandsData = [];
      for (let category in this.client.categories) {
        commandsData.push({
          name: this.client.categories[category],
          commands: []
        });
      }
      for (let i = 0; i < commandsData.length; i++) {
        if (allowMaster) {
          commandsData[i].commands = client.commands.filter(cmd => cmd.category == commandsData[i].name).map(cmd => cmd.name);
        } else {
          commandsData[i].commands = client.commands.filter(cmd => cmd.category == commandsData[i].name && cmd.master == false).map(cmd => cmd.name);
        }
      }
      
      embed.title = "My Commands";
      embed.description = `Don't forget to use my prefix (${prefix}) before every command! You can also use *help [command]* to gain more precise info. You can now type `/` to see my slash commands.`;
      embed.fields = []
      for (let object of commandsData) {
        if (object.commands.length > 0) {
          embed.fields.push( {
          name: `${this.client.utils.capitalize(object.name)} commands`,
          value: object.commands.join(" "),
          inline: false
        });
        }
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

    interaction.reply({embeds: [this.client.utils.buildEmbed(embed)]});
    
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription(this.description)
                  .addStringOption(option => 
                          option.setName("command")
                          .setDescription("Help for a specific command."));
  }
   
}