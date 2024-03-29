const Command = require("../Command.js");
const { SlashCommandBuilder,  PermissionFlagsBits } = require('discord.js');

module.exports = class Unban extends Command {
  
  constructor(client) {
    super(client, {
      name: 'unban',
      aliases: [],
      syntax: 'unban <username/ID>',
      description: `Removes the ban from target user`,
      category: client.categories.UTILITY,
      clientPermissions: [PermissionFlagsBits.BanMembers],
      userPermissions: [PermissionFlagsBits.BanMembers],
      examples: ['unban 608673444061773827'],
      master: false
    });
  }
  
  async execute(message, args) {
     //   try{

    const member = await this.client.utils.resolveUser(message, args);
    if (!member || member.id == message.member.id) {
      throw new message.client.errors.UserInputError("Could not find the user.");
    }
    if (!member.bannable) {
      message.reply("This member is above my might, I can't ban him");
      return;
    }
    args.shift();
    message.guild.members.unban(member.user.id, args.join(" "));

    message.reply(`The cultist <@${member.user.id}> was allowed to come back to this sacred place.`);
    /*	}catch(err){
          console.log(err);
          message.reply("WTF gimme me permissions bruh");
        }*/
  }
   
}