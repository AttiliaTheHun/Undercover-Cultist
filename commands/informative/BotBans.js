const Command = require("../Command.js");
const { SlashCommandBuilder } = require('discord.js');

module.exports = class Botbans extends Command {
  
  constructor(client) {
    super(client, {
      name: 'botbans',
      aliases: ['bans', ''],
      syntax: 'botbans <-local/-global>',
      description: `Shows users prohibited from the use of the bot`,
      category: client.categories.INFORMATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['botbans', 'botbans -local', 'botbans -global'],
      master: true
    });
  }
  
  async execute(message, args) {
    let where = "";
    try {
      if (args[0] == "-global") {
        where = "WHERE global = 1";
      } else if (args[0] == "-local") {
        where = `WHERE server = ${message.guild.id} AND global = 0`;
      } else if (args[0] == "clear"){
        const query = await this.client.utils.query(`DELETE FROM Bans;`);
        if(query){
message.channel.send("Amnesty completed")
        }
        return;
      } else {
        where = `WHERE (server = ${message.guild.id} AND global = 0) OR (global = 1)`;
      }
      const bans = await this.client.utils.query(`SELECT * FROM Bans ${where};`);
      if (bans) {
        if (bans.length > 0) {
          let embed = {
            title: "Bot Bans",
            color: "#FFBC03",
            fields: []
          }

          let member;
          let username;
          let id;
          let banned_by_member;
          let banned_by_username;
          let banned_by_id;
          for (let i = 0; i < bans.length; i++) {
            id = bans[i].user;
            member = message.guild.members.cache.get(id);
            username = member.user.tag;
            username += (bans[i].global) ? " Global" : " Local";
            banned_by_id = bans[i].banned_by;
            banned_by_member = message.guild.members.cache.get(banned_by_id);
            banned_by_username = banned_by_member.user.tag;
            embed.fields.push({
              name: username,
              value: `**Banned By:** ${banned_by_username}\n**Reason:** ${bans[i].reason}`,
              inline: false
            });
          }
          embed.footer = {
            text: message.client.user.tag
          };
          
          message.channel.send({embeds: [this.client.utils.buildEmbed(embed)]});
          return;
        }
      }
      message.reply("No banned users found");
      return;


    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async backslash(interaction) {
    const option = interaction.options.getString('scope');
    
    let where = "";
    try {
      if (option == "global") {
        where = "WHERE global = 1";
      } else if (option == "local") {
        where = `WHERE server = ${interaction.guild.id} AND global = 0`;
      } else if (option == "clear"){
        const query = await this.client.utils.query(`DELETE FROM Bans;`);
        if(query){
           interaction.reply({ content: "Amnesty completed" });
        }
        return;
      } else {
        where = `WHERE (server = ${interaction.guild.id} AND global = 0) OR (global = 1)`;
      }
      const bans = await this.client.utils.query(`SELECT * FROM Bans ${where};`);
      if (bans) {
        if (bans.length > 0) {
          let embed = {
            title: "Bot Bans",
            color: "#FFBC03",
            fields: []
          }

          let member;
          let username;
          let id;
          let banned_by_member;
          let banned_by_username;
          let banned_by_id;
          for (let i = 0; i < bans.length; i++) {
            id = bans[i].user;
            member = interaction.guild.members.cache.get(id);
            username = member.user.tag;
            username += (bans[i].global) ? " Global" : " Local";
            banned_by_id = bans[i].banned_by;
            banned_by_member = interaction.guild.members.cache.get(banned_by_id);
            banned_by_username = banned_by_member.user.tag;
            embed.fields.push({
              name: username,
              value: `**Banned By:** ${banned_by_username}\n**Reason:** ${bans[i].reason}`,
              inline: false
            });
          }
          embed.footer = {
            text: interaction.client.user.tag
          };
          
          interaction.reply({embeds: [this.client.utils.buildEmbed(embed)]});
          return;
        }
      }
      interaction.reply({ content: "No banned users found"});
      return;


    } catch (err) {
      console.log(err);
      throw new this.client.errors.slashCommandExecutionError(err.message);
    }
  }

  createDefinition() {
    return new SlashCommandBuilder()
                  .setName(this.name)
                  .setDescription(this.description)
                  .addStringOption(option => 
                          option.setName("scope")
                          .setDescription("Scope of the ban.")
                          .addChoices(
				{ name: 'Local (Server)', value: 'local' },
				{ name: 'Global (Discord)', value: 'global' },
        { name: 'Clear bans', value: 'clear' }
			));
  }
   
}