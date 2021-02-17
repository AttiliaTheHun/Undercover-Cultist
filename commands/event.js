const Discord = require('discord.js');
const cardwipfile = require('../cardwip.json');
const cardwip = JSON.parse(JSON.stringify(cardwipfile));
module.exports = {
name: "event",
description: "event [number]",
action: "Shows target event sample",
note: "",
legend: "number",
async execute(message, args){ 
      if(args[0] == null){
        message.channel.send(`NullPointerException: \`You must provide an argument\``);
        return; 
      }
  
  if(!isNaN(args[0]) && 0 < args[0] && args[0] < 119){
	
             class Option{
          constructor(){
            this.defined = false,
            this.consume_values = [],
            this.consume_emojis = "",
            this.provide_values = [],
            this.provide_emojis = "",
            this.option_text = "",
            this.output_text = ""
          }
        }
    
   let event = cardwip[args[0]];
    
    if(args[1] == "raw"){
      message.channel.send(JSON.stringify(event));
      return;
    }
   
    const resources_discord_emojis = ["<:exchange_relic:644177849606995978>", "<:exchange_money:644177896575074323>", "<:exchange_cultist:644175421755097098>", "<:exchange_food:644178025809707157>","<:exchange_prisoner:644177784876433408>", "<:exchange_suspicion:644177968536748032>"];
    const cultist_equals_prisoner_emoji = "<:exchange_cultist_prisoner:766628698963050566>";
    
    let options = [new Option(), new Option(), new Option()]
    let  option_property = "";
    
     for(let option_number = 0; option_number < 3; option_number++){
        option_property = `option${option_number + 1}`;

        
        if(event[option_property].optiontext != ""){
            options[option_number].option_text = event[option_property].optiontext;
            options[option_number].defined = true;
           if(event[option_property].outputtext != "" && event[option_property].outputtext != undefined){
            options[option_number].output_text = event[option_property].outputtext;
           }else if(event[option_property].islose == 1){
             options[option_number].output_text = "You Lose";
           }
          }else{
            break;
          }
        
        options[option_number].consume_values = [event[option_property].requirements.relic, event[option_property].requirements.money, event[option_property].requirements.cultist, event[option_property].requirements.food, event[option_property].requirements.prisoner, event[option_property].requirements.suspicion];
        options[option_number].provide_values = [event[option_property].rewards.relic, event[option_property].rewards.money, event[option_property].rewards.cultist, event[option_property].rewards.food, event[option_property].rewards.prisoner, event[option_property].rewards.suspicion];
       
       for(let resource_number = 0; resource_number < 6; resource_number++){
          /*420 is a magic number indicating the bigger half of player's resources of given type*/
          if(options[option_number].consume_values[resource_number] == 420){
              options[option_number].consume_values[resource_number] = 2;
              options[option_number].consume_emojis = "*";
          }  
       }
       /*Create consumes and provides emoji sets for each resource*/
        for(let resource_number = 0; resource_number < 6; resource_number++){
          /*420 is a magic number indicating the bigger half of player's resources of given type*/
          /*create consumes emoji set*/
          for(let resource_count = 0; resource_count < options[option_number].consume_values[resource_number]; resource_count++){
            if(option_number == 2 && event[option_property].cultistequalsprisoner == 1){
              options[option_number].consume_emojis = options[option_number].consume_emojis + " " + cultist_equals_prisoner_emoji;
            }else{
              if(options[option_number].consume_values[resource_number] > 3){
                options[option_number].consume_emojis = options[option_number].consume_emojis + ` ${options[option_number].consume_values[resource_number]}x ${resources_discord_emojis[resource_number]}`;
                break;
              }
              options[option_number].consume_emojis = options[option_number].consume_emojis + " " + resources_discord_emojis[resource_number];   
            }                 
          }
          
          
          for(let resource_count = 0; resource_count < options[option_number].provide_values[resource_number]; resource_count++){
              if(options[option_number].provide_values[resource_number] > 3){
                options[option_number].provide_emojis = options[option_number].provide_emojis + ` ${options[option_number].provide_values[resource_number]}x ${resources_discord_emojis[resource_number]}`;
                break;
              }
            options[option_number].provide_emojis = options[option_number].provide_emojis + " " + resources_discord_emojis[resource_number];                  
          }
        }
        if(options[option_number].consume_emojis== ""){
            options[option_number].consume_emojis = "-";
          }
        if(options[option_number].provide_emojis == ""){
            options[option_number].provide_emojis = "-";
          }
        
      
          
         
        
      }
      const embed = new Discord.MessageEmbed();
        for(let option of options){
          if(!option.defined){
            break;
          }
          embed.addField(`${option.option_text}`, `:x: ${option.consume_emojis}\n:white_check_mark:${option.provide_emojis}\n${option.output_text}`);
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