require('dotenv').config();
const express = require("express");
const sequelize = require("./db/models/index.js");
const Client = require('./util/Client.js');
const { Intents } = require("discord.js");

const app = express();
const token = process.env.TOKEN;

const intents = new Intents()
.add( 'GUILDS',
      'GUILD_MESSAGES',
      'DIRECT_MESSAGES',
      'DIRECT_MESSAGE_REACTIONS',
      'GUILD_MEMBERS',
      'GUILD_PRESENCES'
    );

const client = new Client({
  intents: intents,
   partials: [
        'CHANNEL', // Required to receive DMs
    ]})
      .loadEvents("./events")
      .loadCommands("./commands");

client.login(token).catch( err => {
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
  await client.logger.error(err, {client: client});
  console.error(err);
});