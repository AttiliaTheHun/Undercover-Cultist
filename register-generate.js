const { REST, Routes, GatewayIntentBits } = require('discord.js');
const Client = require('./util/Client.js');
const fs = require('node:fs');
const clientId = '820435139335028757';
const commands = [];


const client = new Client({ 
  intents: [GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.DirectMessageReactions,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildPresences],
   partials: [
        'CHANNEL', // Required to receive DMs
    ]});
	const command = require(`./commands/underhand/Generate.js`);
  const commandInstance = new command(client)
	commands.push(commandInstance.definition.toJSON());


// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
