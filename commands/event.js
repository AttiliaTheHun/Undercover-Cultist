const Discord = require('discord.js');
const cardwipfile = require('../cardwip.json');
const cardwip = JSON.parse(JSON.stringify(cardwipfile));
module.exports = {
name: "event",
description: "send event sample",
async execute(message, args){ 
      if(args[0] == null){
        
        return message.channel.send(`NullPointerException: \`You must provide and argument\``);
      }
  
  if(!isNaN(args[0]) && 0 < args[0] && args[0] < 119){
	
    event = cardwip[args[0]];
   
  //  let resources;
    let consumes = [];
         let provides = [];
          let optiontext = [];
          let outputtext = [];
      let consarr = [];
      let provarr = [];
      let o = [];
    //resources emotes
    const name = ["<:exchange_relic:644177849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>","<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:644177968536748032>"];
 //exchange cultist prisoner emote
    const ecp = "<:exchange_cultist_prisoner:766628698963050566>";
    
	for(let i = 0; i < 3; i++){ //indicates option number
          consumes[i] = "";
          provides[i] = "";
          //initialize requirements and rewards
           consarr = [event[`option${(i + 1)}`].requirements.relic, event[`option${(i + 1)}`].requirements.money, event[`option${(i + 1)}`].requirements.cultist, event[`option${(i + 1)}`].requirements.food, event[`option${(i + 1)}`].requirements.prisoner, event[`option${(i + 1)}`].requirements.suspicion];
           provarr = [event[`option${(i + 1)}`].rewards.relic, event[`option${(i + 1)}`].rewards.money, event[`option${(i + 1)}`].rewards.cultist, event[`option${(i + 1)}`].rewards.food, event[`option${(i + 1)}`].rewards.prisoner, event[`option${(i + 1)}`].rewards.suspicion];
    //   console.log(consarr + provarr);
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
          //  if(resources[index] != 1){ //if he has only one card, he should keep it
         consarr[index] = 2;    //we need it to look legit
          //  }
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
files:[`http://underhand.clanweb.eu/res/Card${args[0]}.png`]
});
      //send embed with options
      await  message.channel.send(embed);
    
    
}else{
	return message.channel.send(`IllegalArgumentException: \`Number range should be in between 0-119 excluded\``);
	
	
}
  
/*const embed = new Discord.MessageEmbed()
.setColor("#7a11ab")
.setDescription("There's now an opportunity to play Underhand right here on Discord. Just go in one of the gaming channels\n<#721735042682060853>\n<#766993942242787369>\nand type\n**!c underhand play**\nto start a new game.\n\nIf the bot is not online, you can go at http://undercover-cultist.glitch.me and wait until the page loads, then the bot should be online for you :heart:\nYou should react on this message with <:exchange_cultist:644175421755097098> to get the cultist role, othewise you are considered a prisoner, food or suspicion.\nReact with <:eye_of_sacrifice:719878415850799205> to get access to the game channels.");
message.channel.send(embed);
*/

  
},
};