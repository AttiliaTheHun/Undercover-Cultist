module.exports = { 	
  name: 'restart', 	
  syntax: 'restart',
  description: "Restarts the bot",
  note: "Administration command",
  permissions: "",
  master: true,
  aliases: [],
  legend: "",
  async execute(message, args) { 		
	if(message.author.id == 608673444061773827 || message.author.id == 651459267718545489 || message.author.id == 621030694566625283){
  await  message.channel.send("Restarting...");
    await console.log(`Restarted by ${message.author.tag}`);
    process.exit();
  }
  
  }, };