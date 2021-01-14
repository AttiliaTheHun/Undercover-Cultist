module.exports = { 	
  name: 'losescreen', 	
  description: 'losescreen [nothing]',
  action: "sends lose screen texture",
  note: "",
  legend: "nothing",
  execute(message, args) { 		
	
	message.channel.send("LoseScreen",{
		files:["http://underhand.clanweb.eu/res/LoseScreen.png"]
	});
	}, };