const fs = require("fs");
const Discord = require("discord.js");

const client = new Discord.Client();

/**
* Create a Collection of all the bot commands to easily access
* their properties
*/
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync(__dirname + "/../commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`../commands/${file}`);
  client.commands.set(command.name, command);
}

/*
* Usuallz for debug purposes
client.on("debug", () => {
  console.log
});

client.on("warn", () => {
  console.log
});
*/

module.exports = client;