const Command = require("../Command.js");
const { SlashCommandBuilder,  PermissionFlagsBits } = require('discord.js');

module.exports = class Kick extends Command {
  
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['lick'],
      syntax: 'kick <username/ID>',
      description: `Kicks target user from the server`,
      category: client.categories.UTILITY,
      clientPermissions: [PermissionFlagsBits.KickMembers],
      userPermissions: [PermissionFlagsBits.KickMembers],
      examples: ['kick 608673444061773827'],
      master: false
    });
  }
  
  async execute(message, args) {

    const member = await this.client.utils.resolveUser(message, args);
    if (!member || member.id == message.member.id) {
     throw new message.client.errors.UserInputError("Could not find the user.");
    }
    if (!member.kickable) {
      message.reply("This member is above my might, I can't kick him");
      return;
    }
    args.shift();
    member.kick(args.join(" "));
    message.reply(`The fake cultist <@${member.user.id}> was banished from this sacred place.`);
    /*}catch(err){
      console.log(err);
      message.reply("WTF gimme me permissions bruh");
    }	*/
  }
   
}