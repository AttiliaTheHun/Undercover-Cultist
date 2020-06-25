module.exports = { 	
  name: 'option', 	
  description: 'Sends option card image dependent on given arguments.', 	
  execute(message, args) { 		
    switch (args[0].toLowerCase()){
      case "ready":
        break;
        case "active":
        break;
        case "dormant":
        break;
        case "down":
        break;
        case "back":
        break;
      default:
    }

	message.channel.send("Option" + args[0].substring(0, 1).toUpperCase() + args[0].substring(1, args[0].length,{
		files:["http://underhand.clanweb.eu/res/Card" + args[0] + ".png"]
	});
	}, };