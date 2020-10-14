module.exports = { 	
  name: 'god', 	
  description: 'Sends god texture.', 	
  execute(message, args) { 
    if(args[0] < 1 || args[0] > 7 || isNaN(args[0])){
      return message.channel.send('IlegalArgumentException: \`only integers in range from 1 to 7 included are accepted \`');
    }
    let gods = [null, "God of Beginnings", "Rhybaax", "Windigoo", "Jhat\'Ti", "Kekujira", "Yacare", "Uhl\'Uht\'C"];
    let name = gods[args[0]];
    let url = null;

    if(args[0] == 4){
      url = "Jhai\'lungr";
    }else if(args[0] == 3){
      url = "Wiindigoo";
    }else if(args[0] == 7){
      url = "Uhl\'uht\'c";
    }else{ 
       url = name;
       }
    if(args[1] != null){
      name = name + " Thumbnail";
      url = url + "Thumbnail";
    }
	message.channel.send(`${name}`, {files:[`http://underhand.clanweb.eu/res/${url}.png`]});
	}, };