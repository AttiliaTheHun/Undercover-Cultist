module.exports = { 	
  name: 'losescreen', 	
  syntax: 'losescreen',
  description: "Sends lose screen texture",
  note: "",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "",
  execute(message, args) { 		
	
	message.channel.send("LoseScreen",{
		files:["http://underhand.clanweb.eu/res/LoseScreen.png"]
	});
	}, };