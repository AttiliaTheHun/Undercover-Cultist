module.exports = async (client, interaction) => {
  console.log(interaction.constructor)
  if (!interaction.isChatInputCommand()) return;
    console.log("interacted")
   const command = await interaction.client.commands.get(interaction.commandName);
  
  if (command) {
		await command.backslash(interaction);
	}
  
}