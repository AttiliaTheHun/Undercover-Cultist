module.exports = { 	
  name: 'dm', 	
  description: 'dm [mention]/[id] [message]', 	
  action: "Sends a Direct Message to the target user",
  note: "you need the `BAN_MEMBERS` and `MANAGE_MESSAGES` permission for this command",
  legend: "mention, id",
  execute(message, args) { 		
    
       if(args[0] == null){
        
        return message.channel.send(`NullPointerException: \`You must provide an argument\``);
      }
  
    
if(!isNaN(args[0]) && 0 < args[0] && args[0] < 119){
	
	message.channel.send("Card " + args[0],{
		files:["http://underhand.clanweb.eu/res/Card" + args[0] + ".png"]
	});
}else{
	return message.channel.send(`IllegalArgumentException: \`Number range should be in between 0-119 excluded\``);
	
	
} 	}, };