const Discord = require('discord.js');
const cardwipfile = require('../cardwip.json');
const cardwip = JSON.parse(JSON.stringify(cardwipfile));
const prefix = require('../config.json').prefix;
module.exports = { 	
  name: 'underhand', 	
  description: 'Who wants to play Underhand?', 	
  async execute(msg, args, client) { 	
    let base_deck = [];
    let discard_deck = [];
    let message = msg;
    let resources = [];
    
    
    let mode = "play";
    
    if(args[0] == "load" || args[0] == "l"){
      if(args[1] == null /*|| !args[1].includes("{\"base\"}:[")*/){
        message.channel.send("Missing the data string, don\'t forget to provide it.")
        return;
      }else{
        //get data from data string
        let game_data = JSON.parse(args[1]);
        //load data
         base_deck = game_data.base;
     discard_deck = game_data.discard;
        resources = game_data.resources;
        mode = "load";
                
      }
    }else	if(args[0] == "play" || args[0] == "p" || args[0] == null){
   new_game()
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
    
    
    
    }else if(args[0].includes("g") || args[0].includes("r") || args[0].includes("w") || args[0].includes("j") || args[0].includes("k") || args[0].includes("y") || args[0].includes("u")){
      new_game()
       if(args[0] != null){
      if(args[0].indexOf("g") != -1){
        base_deck.push(96, 98);
      }
      if(args[0].indexOf("r") != -1){
        base_deck.push(21, 70);
      }
      if(args[0].indexOf("w") != -1){
        base_deck.push(23, 97);
      }
      if(args[0].indexOf("j") != -1){
        base_deck.push(112, 114);
      }
      if(args[0].indexOf("k") != -1){
        base_deck.push(72, 113);
      }
      if(args[0].indexOf("y") != -1){
       base_deck.push(38, 111);
      }
      if(args[0].indexOf("u") != -1){
       base_deck.push(22, 25);
      }
    }
    }else{
    message.channel.send(`Do you want to play a game? Type **${prefix}underhand play** to start a new game. You can also apply blessings by adding argument with capital letters of the respective god. Example: **${prefix}underhand play kyg** goes for *Kekujira*, *Yacare*, *God of Beginnings*.`);
 return;
  }
    
    function new_game(){
       resources = [0, 2, 2, 2, 2, 0];
    // base_deck.push(110);
        base_deck.push(29); //Rhybaax
    base_deck.push(106); //Jhai'ti
    base_deck.push(85); //Kekujira
    base_deck.push(79); //Yacare
    base_deck.push(57); //Uhl'Uht'C
    
         let randoms = [1, 3, 4,6, 7, 8, 9, 10, 13, 14, 24, 26, 28, 37, 45, 51, 67, 68, 69]; //random events to be inserted into the deck
   
     for(let i = 0; i < 9; i++){
      let random = Math.floor(Math.random() * randoms.length);
      base_deck.push(randoms[random]);
      randoms = randoms.filter(function(value, index, arr){ return value != randoms[random];});
    }
    
    }
   
    /*TODO
 L:check other options before allowing to lose
    */
    

    const harvests = [39, 40, 41, 42, 43, 44]; //harvest events
    const necronomicons = [15, 16, 17, 18, 19, 20]; //reading the necronomicon events
    const spoils = [46, 47, 48, 49, 50]; //spoild of war events
    const ancestors = [52, 53, 54, 55]; //ancestor events
    const catches = [86, 87, 88, 89]; //catch of the day events
    const teatimes = [115, 116, 117, 118]; //teatime events
   //emotes to show on dicord
  const name = ["<:exchange_relic:644177849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>","<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:644177968536748032>"];
 //exchange cultist prisoner emote
    const ecp = "<:exchange_cultist_prisoner:766628698963050566>";
    
    
    //game controlling boolean
 let run = true;
    
    //cheat variables
  let cheats = false;
    let greedprotect = false;
    let nopolice = false;
    let marco = false;
    
    
    
      let optsel = 0;
      let foresight = false;
      let with_discard = false;
      let recurring = false;
    
    let event;
    //shuffle the deck before game starts
    base_deck = module.exports.shuffle(base_deck);
    
    
    //the game loop
    game:
    while(run){
      //prevent app from fall
      if(base_deck.length == 0 || base_deck[0] == null){
        message.channel.send("Game Terminated: *Ran out of cards in deck*");
        return run = false;
      }
      if(foresight){
        message.channel.send("",{
files:[`http://underhand.clanweb.eu/res/Card${base_deck[0]}.png`, `http://underhand.clanweb.eu/res/Card${base_deck[1]}.png`, `http://underhand.clanweb.eu/res/Card${base_deck[2]}.png`]
});
         const filter = m => message.author.id === m.author.id;
//wait for response
	await message.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time'] })
		.then(messages => {
    //message content matters only if discarding
       if(with_discard){
         
    //get selected otpion
    if(messages.first().content.toLowerCase().trim() == "a" || messages.first().content.toLowerCase().trim() == "1"){

      optsel = 1;
    }else if((messages.first().content.toLowerCase().trim() == "b" || messages.first().content.toLowerCase().trim() == "2") && o[1] == true){
      optsel = 2;
      
    }else if((messages.first().content.toLowerCase().trim() == "c" || messages.first().content.toLowerCase().trim() == "3") && o[2] == true){
      optsel = 3;
      //check if save call happened
    }else if(messages.first().content.toLowerCase().trim() == "save" || messages.first().content.toLowerCase().trim() == "s"){
      message.channel.send(`Here is your data string, you can load it using the *load* argument\n\`\`\`{"base":[${base_deck}],"discard":[${discard_deck}],"resources":[${resources}]}\`\`\`Game Terminated`);
      return run = false;
    }else{
      //no option selected
optsel = null;
    }
    if(optsel != null){
      if(recurring){
        discard_deck.push(base_deck[optsel - 1]);
      }
      base_deck.splice(optsel - 1,1);
    }
         
       }
        }).catch(() => {
     message.channel.send("Game Terminated");
   //  console.log(`card: ${base_deck[0]} option: ${optsel} o: ${o[optsel - 1]} log: 1`);  
    run = false;
  })
      }      
      foresight = false;
      with_discard = false;
            recurring = false;
      //get current event from data file
      event = cardwip[base_deck[0]];
      
      //check if event is registrede in the source file
     try{
       let check = event.title;
       check = check.length.toString(); //fails if check is undefined
     }catch(err){
       message.channel.send("**UndefinedEventException:** one event was skiped because of null information about this event");
   base_deck.shift(); //remove the event from the deck
     continue game; //skip the loop for we have no event to work with
     }
       if(marco){
      message.channel.send("[" +base_deck.map(r => `${r}`).join(' ') + "]\n[" + discard_deck.map(r => `${r}`).join(' ') + "]");
       }
      
      //void the values 
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
          //initialize requirements and rewards
           consarr = [event[`option${(i + 1)}`].requirements.relic, event[`option${(i + 1)}`].requirements.money, event[`option${(i + 1)}`].requirements.cultist, event[`option${(i + 1)}`].requirements.food, event[`option${(i + 1)}`].requirements.prisoner, event[`option${(i + 1)}`].requirements.suspicion];
           provarr = [event[`option${(i + 1)}`].rewards.relic, event[`option${(i + 1)}`].rewards.money, event[`option${(i + 1)}`].rewards.cultist, event[`option${(i + 1)}`].rewards.food, event[`option${(i + 1)}`].rewards.prisoner, event[`option${(i + 1)}`].rewards.suspicion];
       
          //check for variable consume value
          if(consarr.findIndex((num) =>{
        //420 in the data file means bigger half of curent number of resources
         if(num == 420){
           return true;
         }
         return false;
       }) != -1 ){
            //get reource type to halve
         let index = consarr.findIndex((num) =>{
         if(num == 420){
           return true;
         }
         return false;
       });
            //do the halving
            if(resources[index] != 1){ //if he has only one card, he should keep it
         consarr[index] = Math.ceil(resources[index] / 2);    
            }
       }      
         
  for(let i2 = 0; i2 < 6; i2++){  //indicates type of resource
     //create consume emote set if cultist equals prisoner
   if(event[`option${(i + 1)}`].cultistequalsprisoner == 1 && i2 == 2){
    for(let i3 = 0; i3 < consarr[i2]; i3++){ //indicates count of resource
      
        consumes[i] = consumes[i] + " " + ecp;
      
     // console.log(null);
     // console.log("i:"+ i + "c[i]:" + consumes[i] + "i2:" + i2 + "i3:" + i3);
    }
     }else{
       //create consume emote set
       for(let i3 = 0; i3 < consarr[i2]; i3++){
      consumes[i] = consumes[i] + " " + name[i2];
      }
     }
  }
           //create provide emote set
for(let i2 = 0; i2 < 6; i2++){  
    for(let i3 = 0; i3 < provarr[i2]; i3++){
      provides[i] += " " + name[i2];
    }
  }
          //provide text to prevent emote size change
          if(consumes[i] == ""){
            consumes[i] = "-";
          }
          if(provides[i] == ""){
            provides[i] = "-";
          }
          //get option text
          if((event[`option${(i + 1)}`].optiontext).length != 0){
            optiontext[i] = event[`option${(i + 1)}`].optiontext;
          o[i] = true;
          }else{
            optiontext[i] = "";
            o[i] = false;
          }
          //get output text
          if(event[`option${(i + 1)}`].outputtext != null){
            outputtext[i] = event[`option${(i + 1)}`].outputtext;
            
          }else{
            //get rid of undefined
            outputtext[i] = "";
           
          }
      }
       //create the options embed
         const embed = new Discord.MessageEmbed()
.setAuthor(optiontext[0])
.setDescription(":x: "+ consumes[0] + "\n" + ":white_check_mark: " + provides[0] + "\n" + outputtext[0] )
      if(o[1]){
         embed.addField(optiontext[1] , ":x: "+ consumes[1] + "\n" + ":white_check_mark: " + provides[1] + "\n" + outputtext[1] , false)
      }
      if(o[2]){
         embed.addField( optiontext[2] , ":x: "+ consumes[2] + "\n" + ":white_check_mark: " + provides[2] + "\n" + outputtext[2] , false)
         }
        
//sent event texture
        await message.channel.send("",{
files:[`http://underhand.clanweb.eu/res/Card${base_deck[0]}.png`]
});
      //send embed with options
      await  message.channel.send(embed);
//send emebd with player resources
         await message.channel.send(module.exports.print_deck(message, resources))
      
      
      //handling the input now\\
      
  const filter = m => (message.author.id === m.author.id && message.content.startsWith("//") == false);
//wait for response
	await message.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time'] })
		.then(messages => {

    //get selected otpion
    if(messages.first().content.toLowerCase().trim() == "a" || messages.first().content.toLowerCase().trim() == "1"){

      optsel = 1;
    }else if((messages.first().content.toLowerCase().trim() == "b" || messages.first().content.toLowerCase().trim() == "2") && o[1] == true){
      optsel = 2;
      
    }else if((messages.first().content.toLowerCase().trim() == "c" || messages.first().content.toLowerCase().trim() == "3") && o[2] == true){
      optsel = 3;
      //check if save call happened
    }else if(messages.first().content.toLowerCase().trim() == "save" || messages.first().content.toLowerCase().trim() == "s"){
      message.channel.send(`Here is your data string, you can load it using the *load* argument\n\`\`\`{"base":[${base_deck}],"discard":[${discard_deck}],"resources":[${resources}]}\`\`\`Game Terminated`);
      return run = false;
    }else if(messages.first().content.toLowerCase().trim() == "i r winner"){
      message.channel.send("**You Won**")
      cheats = true;
    return run = false;  
      
    }else if(messages.first().content.toLowerCase().trim() == "resign"){
      message.channel.send("You lost")
      cheats = true;
    return run = false;  
      
    }else if(messages.first().content.toLowerCase().trim() == "marco"){
      if(marco){
        marco = false;
      }else{
      marco = true;
      }
      cheats = true;
    return;  
      
    }else if(messages.first().content.toLowerCase().trim() == "robin hood"){
      resources[1] = resources[1] + 100;
      cheats = true;
    return;
    }else if(messages.first().content.toLowerCase().trim() == "man undercover"){
      resources[2] = resources[2] + 100;
      cheats = true;
    return;
    }else if(messages.first().content.toLowerCase().trim() == "cheese steak jimmy\'s"){
      resources[3] = resources[3] + 100;
      cheats = true;
    return;
    }else if(messages.first().content.toLowerCase().trim() == "suspected suspect"){
      resources[5] = resources[5] + 100;
      cheats = true;
    return;
    }else if(messages.first().content.toLowerCase().trim() == "no police"){
      if(nopolice){
        nopolice = false;
      }else{
        nopolice = true;
      resources[5] = 0;
      cheats = true;
      if(base_deck[0] == 2){
        base_deck.shift();
      }
      }
    return;
    }else if(messages.first().content.toLowerCase().trim() == "not greedy"){
      if(greedprotect){
        greedprotect = false;
      }else{
        greedprotect = true;
      cheats = true;
      if(base_deck[0] == 56){
        base_deck.shift();
      }
      }
    return;
    }else{
      message.channel.send('Game Terminated');
      console.log(`card: ${base_deck[0]} option: ${optsel} o: ${o[optsel - 1]} input: ${messages.first().content.trim()}`);
    return run = false;
    }
    
    
    //check if event has foresight
    if(event[`option${(optsel)}`].foresight.hasforesight == 1){
    foresight = true;
      //check if event can discard
      if(event[`option${(optsel)}`].foresight.candiscard == 1){
    with_discard = true;
      }
      if(event[`option${(optsel)}`].isrecurring == 1){
    recurring = true;
      }
    }
    //check if player won
    if(event[`option${(optsel)}`].iswin != ""){
      let god = event[`option${(optsel)}`].iswin;
      message.channel.send("**You Won**",{
files:[`http://underhand.clanweb.eu/res/${god}.png`]
})
    return run = false;  
      //check if player lost
    }else if (event[`option${(optsel)}`].islose == 1){
      message.channel.send("You Lose");
      //break the game cycle
      return run = false;
    }
    //refresh consumed resources
     consarr = [event[`option${(optsel)}`].requirements.relic, event[`option${(optsel)}`].requirements.money, event[`option${(optsel)}`].requirements.cultist, event[`option${(optsel)}`].requirements.food, event[`option${(optsel)}`].requirements.prisoner, event[`option${(optsel)}`].requirements.suspicion];
           
    //check for variable consume value
          if(consarr.findIndex((num) =>{
        //420 in the data file means bigger half of curent number of resources
         if(num == 420){
           return true;
         }
         return false;
       }) != -1){
            //get reource tyoe to halve
         let index = consarr.findIndex((num) =>{
         if(num == 420){
           return true;
         }
         return false;
       });
            //do the halving
            if(resources[index] != 1){ //if he has only one card, he should keep it
         consarr[index] = Math.ceil(resources[index] / 2);    
            }       
       }      
   // console.log(resources + " c " + consarr)
         for(let i = 0; i < 6; i++){ 
           if(i == 0){ //you don't wanna double up player's relics
             if(consarr[i] > resources[i]){ //check if enough of relics
               
           message.channel.send("No enough resources");
        return
        }else{
          resources[i] = resources[i] - consarr[i]; 
        }
           }else{
      if(consarr[i] > resources[i] + resources[0]){ //check if enough resources 
        
      message.channel.send("No enough resources");
        return
      }else{
        if(consarr[i] > resources[i]){ //check if relics needed
          let overflow = consarr[i] - resources[i]; //get how many relics needed
          resources[i] = 0; //reset the resource
          resources[0] = resources[0] - overflow; //remove the relics
        }else{
          resources[i] = resources[i] - consarr[i]; 
        }
      }
           }
     }
    //refresh provided resources
    provarr = [event[`option${(optsel)}`].rewards.relic, event[`option${(optsel)}`].rewards.money, event[`option${(optsel)}`].rewards.cultist, event[`option${(optsel)}`].rewards.food, event[`option${(optsel)}`].rewards.prisoner, event[`option${(optsel)}`].rewards.suspicion];
       
   // console.log(resources + " p " + provarr)
    //add rewards
    for(let i = 0; i < 6; i++){ //for every resource
    resources[i] = resources[i] + provarr[i]; 
    
    }
			//message.channel.send(`You've entered: ${messages.first().content}`);

    
    //reinsert if event is recurring
      if(event.isrecurring == 1){    
        
    discard_deck.push(base_deck[0]);        
      }
    //remove current event from the base deck
    base_deck.shift();
    //get target specificids
    let specificids = event[`option${(optsel)}`].shuffle.specificids;
    //some options inserts the same card multiple times
    if(specificids.length == 1){
      for(let i = 0; i < event[`option${(optsel)}`].shuffle.numcards; i++){
      discard_deck.push(specificids[0]);
    }
    }else{
    //insert target specificids into discard deck
    for(let i = 0; i < specificids.length; i++){
      discard_deck.push(specificids[i]);
    }
    }
    if(event[`option${(optsel)}`].outputtext != null){
    if(specificids[0] == null && event[`option${(optsel)}`].outputtext.includes("Insert")){
      
      let type = event[`option${(optsel)}`].outputtext.substring(event[`option${(optsel)}`].outputtext.indexOf("\'") + 1, event[`option${(optsel)}`].outputtext.lastIndexOf("\'")).toLowerCase();
      let count = event[`option${(optsel)}`].shuffle.numcards;
    
      let random;
      
      switch(type){
          
        case "harvest":       
          for(let i = 0;i < count; i++){
            random = Math.floor(Math.random() * harvests.length -1) + 1;
            discard_deck.push(harvests[random]);
          }
          break;
        case "reading the necronimocon":
            for(let i = 0;i < count; i++){
            random = Math.floor(Math.random() * necronomicons.length -1) + 1;
            discard_deck.push(necronomicons[random]);
          }
          break;
          case "ancestor":
            for(let i = 0;i < count; i++){
            random = Math.floor(Math.random() * ancestors.length -1) + 1;
            discard_deck.push(ancestors[random]);
          }
          break;
          case "spoils of war":
            for(let i = 0;i < count; i++){
            random = Math.floor(Math.random() * spoils.length -1) + 1;
            discard_deck.push(spoils[random]);
          }
          break;
          case "tea time":
            for(let i = 0;i < count; i++){
            random = Math.floor(Math.random() * teatimes.length -1) + 1;
            discard_deck.push(teatimes[random]);
          }
          break;
          case "catch of the day":
            for(let i = 0;i < count; i++){
            random = Math.floor(Math.random() * catches.length -1) + 1;
            discard_deck.push(catches[random]);
          }
          break;
      }
      
    }
    }
    //work off random requirements
    let indexes = [0, 1, 2, 3, 4, 5]; //indexes of all resources in the resources array
  let ranreq = event[`option${(optsel)}`].randomrequirements; //get the random requirements
   
    randloop:
    for(let f = 0; f < ranreq; f++){ 
      indexes = [];
      for(let i = 0; i < 6; i++){
      if (resources[i] != 0) {
        indexes.push(i);
                         }}
      if(indexes.length == 0){ //break the loop if no more resources available
      break randloop;
    }
    let random = Math.floor(Math.random() * indexes.length); //get random number applyable to the indexes array as index
      resources[indexes[random]] = resources[indexes[random]] - 1; //decrease random resource by one
    console.log(indexes)
    }
    
   
    

    //reshuffle if deck is empty
    if(base_deck.length == 0){ 
 base_deck = discard_deck;
      discard_deck = [];
// setTimeout(() => {message.channel.send("Reshuffling deck from discard...")}, 1000);
      message.channel.send("Reshuffling deck from discard...")
     base_deck = module.exports.shuffle(base_deck);
  }
    //we want to add only one punishment at the time
    let punishment = false;
    //check food for Windigoo
    if(resources[3] == 0 && punishment == false){
      let random = Math.floor(Math.random() * 2);
      if(random == 0){
        base_deck.unshift(27);
        punishment = true;
      }
    }
    //check suspicion for police raid    
    if(resources[5] > 4 && punishment == false){
      let random = Math.floor(Math.random() * 2);
      if(random == 0){
        base_deck.unshift(2);
        punishment = true;
      }
    }
    //check card count for greed
    if(resources[0] + resources[1] +resources[2] + resources[3] + resources[4] + resources[5]> 15 && punishment == false && greedprotect == false){
      let random = Math.floor(Math.random() * 2);
      if(random == 0){
        base_deck.unshift(56);
        punishment = true;
      }
    }
  }).catch((err) => {
			message.channel.send('Game Terminated');
 //   console.log(err);
  //   console.log(`card: ${base_deck[0]} option: ${optsel} o: ${o[optsel - 1]} log: 2`);
    return run = false;
}); 
          

      }   

     
            
    //}
    
 

	},
print_deck(message, resources, client){ 
  let name = ["<:exchange_relic:644177849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>","<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:644177968536748032>"];
  let string = "";
  for(let i = 0; i < 6; i++){  //type of resource
    for(let i2 = 0; i2 < resources[i]; i2++){ //number of resources   
      string += " " + name[i];
    }
  }
  
  
  if(string.length > 4000){
   string = `${resources[0]}x <:exchange_relic:644177849606995978> ${resources[1]}x <:exchange_money:644177896575074323> ${resources[2]}x <:exchange_cultist:644175421755097098> ${resources[3]}x <:exchange_food:644178025809707157> ${resources[4]}x <:exchange_prisoner:644177784876433408> ${resources[5]}x <:exchange_suspicion:644177968536748032>`
 }
  
  
  
  
  string += ` (${resources[0] + resources[1] +resources[2] + resources[3] + resources[4] + resources[5]})`
 
  const embed = new Discord.MessageEmbed()
.setDescription(string);
  return embed;
},
 shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

};