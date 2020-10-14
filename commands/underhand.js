const Discord = require('discord.js');
const cardwipfile = require('../cardwip.json');
const cardwip = JSON.parse(JSON.stringify(cardwipfile));
const prefix = require('../config.json').prefix;
module.exports = { 	
  name: 'underhand', 	
  description: 'Who wants to play Underhand?', 	
  async execute(message, args, client) { 		
	if(args[0] == "play" || args[0] == "p"){
    let base_deck = [];
    let discard_deck = [];
    
        base_deck.push(29); //Rhybaax
    base_deck.push(106); //Jhai'ti
    base_deck.push(85); //Kekujira
    base_deck.push(79); //Yacare
    base_deck.push(57); //Uhl'Uht'C
    
    if(args[1] != null){
      if(args[1].indexOf("g") != -1){
        base_deck.push(96, 98);
      }else if(args[1].indexOf("r") != -1){
        base_deck.push(21, 70);
      }else if(args[1].indexOf("w") != -1){
        base_deck.push(23, 97);
      }else if(args[1].indexOf("j") != -1){
        base_deck.push(112, 114);
      }else if(args[1].indexOf("k") != -1){
        base_deck.push(72, 113);
      }else if(args[1].indexOf("y") != -1){
       base_deck.push(38, 111);
      }else if(args[1].indexOf("u") != -1){
       base_deck.push(22, 25);
      }
    }

    let randoms = [1, 3, 4,6, 7, 8, 9, 10, 13, 14, 24, 26, 28, 37, 45, 51, 67, 68, 69];
    for(let i = 0; i < 9; i++){
      let random = Math.floor(Math.random() * randoms.length);
      base_deck.push(randoms[random]);
      randoms = randoms.filter(function(value, index, arr){ return value != randoms[random];});
    }
//  message.channel.send(base_deck.map(r => `${r}`).join(' '));
    let resources = [0, 2, 2, 2, 2, 0];
 
    while(true){
      if(base_deck.length != 0){
        let event = cardwip[base_deck[0]];
// => {name: "Albania", code: "AL"}
//console.log(event["title"]);
        const embed = new Discord.MessageEmbed()
.setAuthor(event.option1.optiontext)
.setDescription(event.option1.outputtext)
        .addField("<:exchange_relic:644177849606995978>", "<:exchange_relic:644177849606995978>", false)
        
        // message.channel.send(cardwip.substring(0, 250));
    //    message.channel.send(event.title);
        await message.channel.send("",{
files:[`http://underhand.clanweb.eu/res/Card${base_deck[0]}.png`]
});
        message.channel.send(embed);
         module.exports.print_deck(message, resources);
        break;
      }else{
        break;
      }
      
    }
  }else{
    message.channel.send(`Do you want to play a game? Type **${prefix}underhand play** to start a new game. You can also apply blessings by adding argument with capital letters of the respective god. Example: **${prefix}underhand play kyg** goes for *Kekujira*, *Yacare*, *God of Beginnings*.`);
  }

	},
print_deck(message, resources, client){ 
  let name = ["<:exchange_relic:77849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>","<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:8536748032>"];
  let string = "";
  for(let i = 0; i < resources.length + 1; i++){  
  //  message.channel.send(i);
    for(let i2 = 0; i2 < resources[i]; i2++){
      // message.channel.send("i2 " + i2);
     // message.channel.send(resource);
      
      string += " " + name[i];
    }
  }
  const embed = new Discord.MessageEmbed()
//.setAuthor('Option 1')
.setDescription(string);
  message.channel.send(embed);
},};