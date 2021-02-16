module.exports = { 	
  name: 'option', 	
  description: 'option ["active"/"dormant"/"ready"/"down"/"back"]',
  action: "Sends option texture",
  note: "oy oy",
  legend: "",
  execute(message, args) { 		
    if(args[0] == null){
      message.channel.send('You must provide an argument. Use `help` command or check the bot help page http://underhand.clanweb.eu/undercover_cultist for more info.')
    return;
    }
      
    const arg = args[0].substring(0, 1).toUpperCase() + args[0].substring(1, args[0].length);
    if(arg == "Ready" || arg == "Active" || arg == "Dormant" || arg == "Down" || arg == "Back"){
      message.channel.send("Option" + arg,{
		files:["http://underhand.clanweb.eu/res/Option" + arg + ".png"]
	});
    }else{
      message.channel.send('Unknown argument. Try to looks for mistypes or use `help` command.');
    }
  

	}, };