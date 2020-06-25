module.exports = { 	
  name: 'cardback', 	
  description: 'Sends cardback image.', 	
  execute(message, args) { 		
	
	message.channel.send("Cardback",{
		files:["http://underhand.clanweb.eu/res/Cardback.png"]
	});
	}, };