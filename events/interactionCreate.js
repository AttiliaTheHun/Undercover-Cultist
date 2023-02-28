module.exports = async (client, interaction) => {
  console.log(interaction.constructor)
  if (!interaction.isChatInputCommand()) return;
    console.log("interacted")
   const command = await interaction.client.commands.get(interaction.commandName);
  
  if (!command) {
    client.util.failedInteraction(interaction, "Command not found");
    throw new client.errors.ConfigError("Slash command not found: " + interaction.toString());
    return;
  }
  console.log("1");
  if (await client.utils.isBanned(interaction.user.id, interaction.guild.id)) {
      await client.logger.interactionIgnored(interaction);
      client.utils.failedInteraction(interaction, "You have been banned from the bot usage!");
      return;
  }
  console.log("2");
  if (command.master && !await client.utils.isMaster(interaction.user.id)) {
      await client.logger.interactionIgnored(interaction);
      client.utils.failedInteraction(interaction, "This command is master-only! Nice try tho :)");
      return;
  }
  console.log("3");
  if ( await client.utils.isGuildIgnored(interaction.guild)) {
        await client.logger.interactionIgnored(interaction);
        client.utils.failedInteraction(interaction, "This server is banned from the bot usage!");
        return;
  }
  console.log("4");
  if ( await client.utils.isChannelIgnored(interaction.channel)){
         await client.logger.interactionIgnored(interaction);
         client.utils.failedInteraction(interaction, "This channel is banned from the bot usage!");
        return;
  }
  console.log("5");
  /*if ( await client.utils.isCommandIgnoredInChannel(commandName, interaction.channel)) {
    console.log("6");
         await client.logger.interactionIgnored(interaction);
         client.util.failedInteraction(interaction, "The command can not be used in this channel!");
         return;
  }*/
console.log("7");
  try {
    console.log("made it so far");
       client.utils.checkClientPermissions(interaction, command.clientPermissions, {});
       client.utils.checkUserPermissions(interaction.member, command.userPermissions);
		   await command.backslash(interaction);
       await client.logger.slashCommand(interaction, command.name);
  
	} catch(err) {
    console.log(err);
        if (silent_errors.includes(err.name)) {
             await client.logger.slashCommand(interaction, command.name);
             client.utils.failedInteraction(interaction, err.message);
             return;
        }
        await client.logger.slashCommandError(interaction, err, command.name);
        client.utils.failedInteraction(interaction, "Something went wrong...");
  }
  
}