module.exports = { 	
  name: 'playerguide', 	
  syntax: 'winscreen',
  description: "Sends in screen texture",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "",
  category: "underhand",
  execute(message, args) { 			
	  message.channel.send("WinScreen",{
		  files:["http://underhand.clanweb.eu/res/WinScreen.png"]
	  });
	}, 
};