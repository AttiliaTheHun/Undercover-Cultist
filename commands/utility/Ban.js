const Command = require("../Command.js");
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = class Ban extends Command {

  constructor(client) {
    super(client, {
      name: 'ban',
      aliases: [],
      syntax: 'ban <username/ID>',
      description: `Bans target user from the server`,
      category: client.categories.UTILITY,
      clientPermissions: [PermissionFlagsBits.BanMembers],
      userPermissions: [PermissionFlagsBits.BanMembers],
      examples: ['ban 608673444061773827'],
      master: false
    });
  }

  async execute(message, args) {
    //  try{

    let id;
    if (!isNaN(args[0])) {
      id = args[0];
    } else {
      const member = await this.client.utils.resolveUser(message, args);
      if (!member || member.id == message.member.id) {
        throw new message.client.errors.UserInputError("Could not find the user.");
      }
      if (!member.bannable) {
        message.reply("This member is above my might, I can not ban him");
        return;
      }
    }
    args.shift();

    message.guild.members.ban(id, { days: 0, reason: args.join(" ") }).catch(_ => message.channel.send("Could not do the action"));
    message.reply(`The fake cultist <@${id}> was banned from this sacred place.`);
    /*  }catch(err){
        console.log(err);
        message.reply("WTF gimme me permissions bruh");
      }*/
  }

  async backslash(interaction) {
    const user = interaction.options.getMember("user");
    const reason = interaction.options.getString("reason");

    if (!user.bannable) {
      this.client.utils.failedInteraction(interaction, "This member is above my might, I can not ban him");
      return;
    }


    user.ban({ reason: reason }).catch(err => this.client.utils.failedInteraction(interaction, err.message));
    this.client.utils.successfulInteraction(interaction, `The fake cultist <@${user.user.id}> was banned from this sacred place.`, false);

  }

  createDefinition() {
    return new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description)
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
      .addUserOption(option => 
        option.setName("user")
          .setDescription("The user to be banned.")
          .setRequired(true))
      .addStringOption(option => 
        option.setName("reason")
          .setDescription("Describe the reason of the ban."));
  }

}