module.exports = { 	
  name: 'card', 	
  syntax: 'card [number(0-119)]', 	
  description: "Sends the target card texture",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "number",
  execute(message, args) { 		
    
       if(args[0] == null){
        message.channel.send(`NullPointerException: \`You must provide an argument\``);
        return; 
      }
  
    
if(!isNaN(args[0]) && 0 < args[0] && args[0] < 119){
	
	message.channel.send("Card " + args[0],{
		files:["http://underhand.clanweb.eu/res/Card" + args[0] + ".png"]
	});
}else{
  message.channel.send(`IllegalArgumentException: \`Number range should be in between 0-119 excluded\``);
	
	return; 
	
} 	}, };