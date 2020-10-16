const Discord = require('discord.js');
const cardwipfile = require('../cardwip.json');
const cardwip = JSON.parse(JSON.stringify(cardwipfile));
const prefix = require('../config.json').prefix;
module.exports = { 	
  name: 'underhand', 	
  description: 'Who wants to play Underhand?', 	
  async execute(msg, args, client) { 	
    let message = msg;
	if(args[0] == "play" || args[0] == "p"){
    let base_deck = [];
    let discard_deck = [];
 //   base_deck.push(6);
        base_deck.push(29); //Rhybaax
    base_deck.push(106); //Jhai'ti
  /*  base_deck.push(85); //Kekujira
    base_deck.push(79); //Yacare
    base_deck.push(57); //Uhl'Uht'C
    */
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
  /*  for(let i = 0; i < 9; i++){
      let random = Math.floor(Math.random() * randoms.length);
      base_deck.push(randoms[random]);
      randoms = randoms.filter(function(value, index, arr){ return value != randoms[random];});
    }*/
  const name = ["<:exchange_relic:644177849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>","<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:644177968536748032>"];
  const ecp = "<:exchange_cultist_prisoner:766628698963050566>";
    
    
    let resources = [0, 2, 2, 2, 2, 0];
 let run = true;
    let yes = false;

    
    
    let event;
    
    game:
    while(run){
      event = cardwip[base_deck[0]];
     
     //  console.log(yes + "\n" + base_deck.length);
      message.channel.send("[" +base_deck.map(r => `${r}`).join(' ') + "]\n[" + discard_deck.map(r => `${r}`).join(' ') + "]");
                 
        let consumes = [];
         let provides = [];
          let optiontext = [];
          let outputtext = [];
      let consarr = [];
      let provarr = [];
      let o = [];
      
        for(let i = 0; i < 3; i++){ //indicates option number
          consumes[i] = "";
          provides[i] = "";
          
           consarr = [event[`option${(i + 1)}`].requirements.relic, event[`option${(i + 1)}`].requirements.money, event[`option${(i + 1)}`].requirements.cultist, event[`option${(i + 1)}`].requirements.food, event[`option${(i + 1)}`].requirements.prisoner, event[`option${(i + 1)}`].requirements.suspicion];
           provarr = [event[`option${(i + 1)}`].rewards.relic, event[`option${(i + 1)}`].rewards.money, event[`option${(i + 1)}`].rewards.cultist, event[`option${(i + 1)}`].rewards.food, event[`option${(i + 1)}`].rewards.prisoner, event[`option${(i + 1)}`].rewards.suspicion];
       if(consarr.findIndex((num) =>{
        
         if(num == 420){
           return true;
         }
         return false;
       }) != -1){
         let index = consarr.findIndex((num) =>{
         if(num == 420){
           return true;
         }
         return false;
       });
         consarr[index] = (resources[index] / 2) + (resources[index] % 2);
         
       }        
  for(let i2 = 0; i2 < 6; i2++){  //indicates type of resource
   
    for(let i3 = 0; i3 < consarr[i2]; i3++){ //indicates count of resource
      consumes[i] = consumes[i] + " " + name[i2];
     // console.log(null);
     // console.log("i:"+ i + "c[i]:" + consumes[i] + "i2:" + i2 + "i3:" + i3);
    }
  }
for(let i2 = 0; i2 < 6; i2++){  
    for(let i3 = 0; i3 < provarr[i2]; i3++){
      provides[i] += " " + name[i2];
    }
  }
          
          if(consumes[i] == ""){
            consumes[i] = "-";
          }
          if(provides[i] == ""){
            provides[i] = "-";
          }
          if(event[`option${(i + 1)}`].optiontext != null){
            optiontext[i] = event[`option${(i + 1)}`].optiontext;
          o[i] = true;
          }else{
            optiontext[i] = "";
            o[i] = false;
          }
          if(event[`option${(i + 1)}`].outputtext != null){
            outputtext[i] = event[`option${(i + 1)}`].outputtext;
          }else{
            outputtext[i] = "";
          }
      }
        
         const embed = new Discord.MessageEmbed()
.setAuthor(optiontext[0])
.setDescription(":x: "+ consumes[0] + "\n" + ":white_check_mark: " + provides[0] + "\n" + outputtext[0] )
      if(optiontext[1] != ""){
         embed.addField(optiontext[1] , ":x: "+ consumes[1] + "\n" + ":white_check_mark: " + provides[1] + "\n" + outputtext[1] , false)
      }
      if(optiontext[2] != ""){
         embed.addField( optiontext[2] , ":x: "+ consumes[2] + "\n" + ":white_check_mark: " + provides[2] + "\n" + outputtext[2] , false)
         }
        
        // message.channel.send(cardwip.substring(0, 250));
    //    message.channel.send(event.title);
        await message.channel.send("",{
files:[`http://underhand.clanweb.eu/res/Card${base_deck[0]}.png`]
});
      await  message.channel.send(embed);

         await message.channel.send(module.exports.print_deck(message, resources))
      
  const filter = m => message.author.id === m.author.id;

	await message.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time'] })
		.then(messages => {
    let optsel;
    if(messages.first().content.toLowerCase().trim() == "a" || messages.first().content.toLowerCase().trim() == "1"){

      optsel = 1;
    }else if((messages.first().content.toLowerCase().trim() == "b" || messages.first().content.toLowerCase().trim() == "2") && o[1] == true){
      optsel = 2;
      
    }else if((messages.first().content.toLowerCase().trim() == "c" || messages.first().content.toLowerCase().trim() == "3") && o[2] == true){
      optsel = 3;
      
    }else{
      message.channel.send('Game Interrupted');
    return run = false;
    }
         for(let i = 0; i < 6; i++){ 
      if(consarr[i] > resources[i] + resources[0]){ //fix this for relics pls
      message.channel.send("No enough resources");
        return
      }else{
        if(consarr[i] > resources[i]){
          let overflow = consarr[i] - resources[i]; 
          resources[i] = 0;
          resources [0] -= overflow;
        }else{
          resources[i] -= consarr[i]; 
        }
      }
     }
			//message.channel.send(`You've entered: ${messages.first().content}`);
	//	console.log("N");
    
      if(event.isrecurring == 1){ 
        
    discard_deck.push(base_deck[0]);
        console.log("true")
      }
    base_deck.shift();
    discard_deck.concat(event[`option${(optsel)}`].shuffle.specifids)
    console.log(event[`option${(optsel)}`].shuffle.specifids)
    
    if(base_deck.length == 0){ 
 base_deck = discard_deck;
      discard_deck = [];
  }
    
    
  }).catch(() => {
			message.channel.send('Game Interrupted');
    return run = false;
}); 
          

      }   

     
            
    //}
    
  }else{
    message.channel.send(`Do you want to play a game? Type **${prefix}underhand play** to start a new game. You can also apply blessings by adding argument with capital letters of the respective god. Example: **${prefix}underhand play kyg** goes for *Kekujira*, *Yacare*, *God of Beginnings*.`);
  }

	},
print_deck(message, resources, client){ 
  let name = ["<:exchange_relic:644177849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>","<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:644177968536748032>"];
  let string = "";
  for(let i = 0; i < resources.length + 1; i++){  
    for(let i2 = 0; i2 < resources[i]; i2++){
;
      
      string += " " + name[i];
    }
  }
  const embed = new Discord.MessageEmbed()

.setDescription(string);
  return embed;
},};