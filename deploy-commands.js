const { REST, Routes, GatewayIntentBits } = require('discord.js');
const Client = require('./util/Client.js');
const  { readdirSync } = require("fs");
const {resolve, join} = require("path");
const path = "./commands";
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

const clientId = '672748100007362561';

let commands = [];

readdirSync("./commands").filter(file => !file.endsWith(".js")).forEach(dir => {
      const commandFiles = readdirSync(resolve(/*__basedir,*/ join(path, dir))).filter(file => file.endsWith(".js"));
      commandFiles.forEach(file => {
        const Command = require(resolve(/*__basedir,*/ join(path, dir, file)));
        const command = new Command(client);
        if (command.createDefinition()) {
          commands.push(command)
        }
      })
    });

let definitions = [];

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const command of commands) {
	definitions.push(command.createDefinition().toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${definitions.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: definitions },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
