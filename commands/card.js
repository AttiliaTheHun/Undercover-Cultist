module.exports = { 	
  name: 'card', 	
  description: 'Sends event card image.', 	
  execute(message, args) { 		
if(!isNaN(args[0]) && 0 < args[0] && args[0] < 119){
	
	message.channel.send("Card " + args[0],{
		files:["http://underhand.clanweb.eu/res/Card" + args[0] + ".png"]
	});
}else{
	message.channel.send(`Invalid  argument. Number range should be in between 0-119 excluded`);
	
	
} 	}, };