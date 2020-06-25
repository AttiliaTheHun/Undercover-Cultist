module.exports = { 	
  name: 'winscreen', 	
  description: 'Sends WinScreen image.', 	
  execute(message, args) { 			
	message.channel.send("WinScreen",{
		files:["http://underhand.clanweb.eu/res/WinScreen.png"]
	});
	}, };