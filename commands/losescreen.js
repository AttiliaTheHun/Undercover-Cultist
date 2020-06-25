module.exports = { 	
  name: 'losescreen', 	
  description: 'Sends LoseScreen image.', 	
  execute(message, args) { 		
	
	message.channel.send("LoseScreen",{
		files:["http://underhand.clanweb.eu/res/LoseScreen.png"]
	});
	}, };