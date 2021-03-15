module.exports = { 	
  name: 'blessing', 	
  syntax: 'blessing [god]', 	
  description: "Shows blessings that belong to the target god",
  note: "",
  permissions: "",
  master: false,
  aliases: [],
  legend: "god",
  execute(message, args) { 
    if(args[0] == null){
      message.channel.send("List of Gods:\n\`1.The God of Beginnings\n2.Rhybaax\n3.Wiindigoo\n4.Jhai\'Ti\n5.Kekujira\n6.Yacare\n7.Uhl\'Uht\'C\`");
   return;
    }
      
    if((args[0] < 1 || args[0] > 7) && !isNaN(args[0])){
      message.channel.send('IllegalArgumentException: \`only integers in range from 1 to 7 included or Strings are accepted \`');
     return;
    }
     
    let gods = [null, "God of Beginnings", "Rhybaax", "Wiindigoo", "Jhat\'Ti", "Kekujira", "Yacare", "Uhl\'Uht\'C"];
    let god = null;
    if(!isNaN(args[0])){
      god = args[0];
     // console.log("yes");
    }else{
      console.log(args[0])
      for(let i = 1; i < gods.length; i++){
      if(args[0] == gods[i]){
        god = i;
        break;
      }
      }
    }
    let blessings = [null, [96, 98], [21, 70], [23, 97], [112, 114], [72, 113], [38, 111], [22, 25]];
  //console.table(blessings);
  console.log(god);
   // console.log(blessings[args[0]][0])
  message.channel.send(`Blessings of ${gods[god]}`, {files:[`http://underhand.clanweb.eu/res/Card${blessings[god][0]}.png`,`http://underhand.clanweb.eu/res/Card${blessings[god][1]}.png`]});

	
	}, };