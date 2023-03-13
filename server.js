require("dotenv").config();
const express = require("express");
const Client = require("./util/Client.js");
const { GatewayIntentBits, Partials } = require("discord.js");

const app = express();
const token = process.env.TOKEN;


const client = new Client({
  intents: [GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences],
  partials: [
        Partials.Channel, // Required to receive DMs
        Partials.Message
    ]})
      .loadEvents("./events")
      .loadCommands("./commands");

client.login(token).catch(err => {
  console.log(err)
});

/**
* Create an express router to make the app
* listen for http requests, for the purposes of
* waking it up and showing a help page
*/
app.use(require("./public/router.js"));
app.use(express.static("public"));
const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

process.on("uncaughtException", async (err) => {
  await client.logger.error(err);
  console.error(err);
});