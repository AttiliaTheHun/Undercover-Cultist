# Undercover Cultist
Undercover Cultist is a discord bot made by AttilaTheHun using `discord.js` library.
It is focused on the Underhand game and several commands are Underhand-oriented. Other commands can be used for basic administration or some miscellaneous utilities
## Project Structure
### index.js
The app starts in the `index.js` file, that is the entry point, where the bot connects to discord and handles events.
### config.json
This file contains default variables that are required for the bot running properly
`token` bot token is supposed to be secret and so it's inside the .env file.
`prefix` is bot's global prefix, messages starting with the prefix will be parses as bot command messages.
`default_master` bot masters is a group of members allowed to run administrative commands, `addmaster` is an administrative command and so you need one master to assign other masters.
`log_guild` is if of the guild (server) that contains log channels.
`complete_log_channel` is ID of channel where the bot will produce completely activity log.
`event_log_channel`  is ID of channel where the bot will log important events such as bot errors, guild addition or removal and undefined bot operations.
`dm_dump_channel` ID of channel where the bot will log messages from his DM.
NOTE that variable values from `config.json` are bot's priority as long as you don't set variables with the same names via `config` command, enabling to change them on the run.
### commands [dir]
This directory contains all the logic behind each of bot's commands, each having it's own file. 
### util [dir]
This folder contains files, responsible for bot's utilities that are not core (index.js) or command (/commands/) utilities. For example handling DM or predefined functions.
## How to use the bot
### User guide
Currently, the bot's commands can be sorted in three categories
__texture commands__ these commands will respond with the corresponding texture, the textures are usually game resources from the game Underhand.
__informative command__ these commands usually display some information, for example information about target user.
__utility commands__ these commands perform some actions, for example kicking target user from the server.

Use the `help` command to find out all the commands you can use, use the `help` command with other command's name as an argument, for example `help userinfo` to find cool stuff about the command.
### Admin guide
Some of the bot's commands are restricted only to people with certain permissions.
`kick` - KICK_MEMBERS.
`ban`, `unban` - BAN_MEMBERS.
`addnote`, `delnote` - MANAGE_MESSAGES.
`clearnotes` - ADMINISTRATOR.
`setnick` - MANAGE_NICKNAMES.
__What are notes?__
Notes (as the name hints) are notes. You can imagine them like pinned messages with the difference that notes are not bound to a channel. It's an accessible collection of text messages. They are supposed to be used when you need to *note* something so you don't forget about it. Notes are not encrypted and anyone on the server can view them, means they should not contain sensitive information.
### Bot Master Guide
Some commands are considered to be bot administration commands and are not executable by standard users or even server admins. These commands can globally affect bot's behavior and should be used carefully.
`restart` - immediately restarts the bot.
`globalban`/`globalunban` - prohibits target user from global use (on all servers) of the bot commands / removes the globally banned status from the target user.
`localban`/`localunban` - prohibits target user from local use (only on the current server) of the bot commands / removes the locally banned status from the target user.
`bans` - lists all the users prohibited from bot use in the current server (global and server local)
`addmaster`/`delmaster` - adds / removes target user from the database of bot masters, allowing him to execute bot administration commands, default bot master (from `config.json`) can not be removed.
`masters` - lists all the bot masters.
`listservers` - lists all the servers the bot is in and basic information about them (tons of spam).
`config` - enables to manage bot configuration variables such as prefix, log channels, command disabled channels.
