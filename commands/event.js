const Discord = require('discord.js');
module.exports = {
name: "event",
description: "event test",
async execute(message, args){ 
  while(true){ 
    message.channel.send("L");
    console.log("N")
message.channel.send('Please enter more input.').then(() => {
	const filter = m => message.author.id === m.author.id;

	message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
		.then(messages => {
    console.log("K")
			message.channel.send(`You've entered: ${messages.first().content}`);
		})
		.catch(() => {
			message.channel.send('You did not enter any input!');
		});
});
  }
},
};