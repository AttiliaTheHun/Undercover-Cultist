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
    
    
    }else if(args[0] == "load" || args[0] == "l"){
      
    }else{
    message.channel.send(`Do you want to play a game? Type **${prefix}underhand play** to start a new game. You can also apply blessings by adding argument with capital letters of the respective god. Example: **${prefix}underhand play kyg** goes for *Kekujira*, *Yacare*, *God of Beginnings*.`);
 return;
  }
    let base_deck = [];
    let discard_deck = [];
    
   // base_deck.push(110);
        base_deck.push(29); //Rhybaax
    base_deck.push(106); //Jhai'ti
    base_deck.push(85); //Kekujira
    base_deck.push(79); //Yacare
    base_deck.push(57); //Uhl'Uht'C
    /*TODO
    windigoo food checking
    police raid suspicion checking
    greed card checking
    fix cards where no specificids but insertation must be performed
    make foresight
    make foresight with discard
    make the deck shuffle
    check other options before allowing to lose
    add save option: generate json {base:[base_deck], discard[discard_deck], resources[resources]}
    add load function on argument args[0] "load" || "l" to load game from save output json string
    */
    if(args[1] != null){
      if(args[1].indexOf("g") != -1){
        base_deck.push(96, 98);
      }
      if(args[1].indexOf("r") != -1){
        base_deck.push(21, 70);
      }
      if(args[1].indexOf("w") != -1){
        base_deck.push(23, 97);
      }
      if(args[1].indexOf("j") != -1){
        base_deck.push(112, 114);
      }
      if(args[1].indexOf("k") != -1){
        base_deck.push(72, 113);
      }
      if(args[1].indexOf("y") != -1){
       base_deck.push(38, 111);
      }
      if(args[1].indexOf("u") != -1){
       base_deck.push(22, 25);
      }
    }

    let randoms = [1, 3, 4,6, 7, 8, 9, 10, 13, 14, 24, 26, 28, 37, 45, 51, 67, 68, 69]; //random events to be iinserted into the deck
    const harvests = [39, 40, 41, 42, 43, 44]; //harvest events
    const necronomicons = [15, 16, 17, 18, 19, 20]; //reading the necronomicon events
    const spoils = [46, 47, 48, 49, 50]; //spoild of war events
    const ancestors = [52, 53, 54, 55]; //ancestor events
    const catches = [86, 87, 88, 89]; //catch of the day events
    const teatimes = [115, 116, 117, 118]; //teatime events
    for(let i = 0; i < 9; i++){
      let random = Math.floor(Math.random() * randoms.length);
      base_deck.push(randoms[random]);
      randoms = randoms.filter(function(value, index, arr){ return value != randoms[random];});
    }
  const name = ["<:exchange_relic:644177849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>","<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:644177968536748032>"];
  const ecp = "<:exchange_cultist_prisoner:766628698963050566>";
    
    
    let resources = [0, 2, 2, 2, 2, 0];
 let run = true;
    let yes = false;

    
    
    let event;
    
    game:
    while(run){
      event = cardwip[base_deck[0]];
     
       
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
       
       //   console.log(resources + " p2 " + provarr)
         // console.log(resources + " c2 " + consarr)
          
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
   if(event[`option${(i + 1)}`].cultistequalsprisoner == 1 && i2 == 2){
    for(let i3 = 0; i3 < consarr[i2]; i3++){ //indicates count of resource
      
        consumes[i] = consumes[i] + " " + ecp;
      
     // console.log(null);
     // console.log("i:"+ i + "c[i]:" + consumes[i] + "i2:" + i2 + "i3:" + i3);
    }
     }else{
       for(let i3 = 0; i3 < consarr[i2]; i3++){
      consumes[i] = consumes[i] + " " + name[i2];
      }
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
      
    }else if(messages.first().content.toLowerCase().trim() == "save" || messages.first().content.toLowerCase().trim() == "s"){
      message.channel.send(`Here is your data string, you can load it using the *load* argument\n\`\`\`{"base":[${base_deck}],"discard":[${discard_deck}],"resources":[${resources}]}\`\`\``);
      return run = false;
    }else{
      message.channel.send('Game Interrupted');
    return run = false;
    }
    if(event[`option${(optsel)}`].iswin != ""){
      let god = event[`option${(optsel)}`].iswin;
      message.channel.send("**You Won**",{
files:[`http://underhand.clanweb.eu/res/${god}.png`]
})
    return run = false;  
    }else if (event[`option${(optsel)}`].islose == 1){
      message.channel.send("You Lose");
      return run = false;
    }
     consarr = [event[`option${(optsel)}`].requirements.relic, event[`option${(optsel)}`].requirements.money, event[`option${(optsel)}`].requirements.cultist, event[`option${(optsel)}`].requirements.food, event[`option${(optsel)}`].requirements.prisoner, event[`option${(optsel)}`].requirements.suspicion];
           
   // console.log(resources + " c " + consarr)
         for(let i = 0; i < 6; i++){ 
           if(i == 0){
             
           }else{
      if(consarr[i] > resources[i] + resources[0]){ //fix this for relics pls
      message.channel.send("No enough resources");
        return
      }else{
        if(consarr[i] > resources[i]){
          let overflow = consarr[i] - resources[i]; 
          resources[i] = 0;
          resources[0] = resources[0] - overflow;
        }else{
          resources[i] = resources[i] - consarr[i]; 
        }
      }
           }
     }
    provarr = [event[`option${(optsel)}`].rewards.relic, event[`option${(optsel)}`].rewards.money, event[`option${(optsel)}`].rewards.cultist, event[`option${(optsel)}`].rewards.food, event[`option${(optsel)}`].rewards.prisoner, event[`option${(optsel)}`].rewards.suspicion];
       
   // console.log(resources + " p " + provarr)
    for(let i = 0; i < 6; i++){
    resources[i] = resources[i] + provarr[i];
    
    }
			//message.channel.send(`You've entered: ${messages.first().content}`);
	//	console.log("N");
    
      if(event.isrecurring == 1){ 
        
    discard_deck.push(base_deck[0]);
        
      }
    base_deck.shift();
    let specificids = event[`option${(optsel)}`].shuffle.specificids;
    for(let i = 0; i < specificids.length; i++){
      discard_deck.push(specificids[i]);
    }
   // for(let i = 0; i < event[`option${(optsel)}`].shuffle.specificids.length; i+)
   // discard_deck.concat(specificids);
   // console.log(specificids)
    
    if(base_deck.length == 0){ 
 base_deck = discard_deck;
      discard_deck = [];
      message.channel.send("Reshuffling deck from discard...")
  }
    
    
  }).catch(() => {
			message.channel.send('Game Interrupted');
    return run = false;
}); 
          

      }   

     
            
    //}
    
 

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