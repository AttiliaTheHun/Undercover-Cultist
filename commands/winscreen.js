module.exports = { 	
  name: 'winscreen', 	
  description: 'winscreen [nothing]',
  action: "Sends in screen texture",
  note: "",
  legend: "nothing",
  execute(message, args) { 			
	message.channel.send("WinScreen",{
		files:["http://underhand.clanweb.eu/res/WinScreen.png"]
	});
	}, };