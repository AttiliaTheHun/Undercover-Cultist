module.exports = { 	
  name: 'cardback', 	
  syntax: 'cardback', 
  description: "Sends cardback texture",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "",
  category: "underhand",
  execute(message, args) { 		
	  message.channel.send("Cardback",{
		  files:["http://underhand.clanweb.eu/res/Cardback.png"]
	  });
  }, 
};