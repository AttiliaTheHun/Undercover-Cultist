module.exports = { 	
  name: 'generate', 	
  syntax: 'generate [number(0-21)]/["change"]', 	
  description: "Generates target number of Underhand-themed nicknames, used with \"change\" will change your nickname to Underhand-themed one",
  note: "Please use this command only in bot commands channels",
  permissions: "",
  master: false,
  aliases: ["gen"],
  legend: "number",
  execute(message, args) { 		
    
    try{
       if(args[0] == null){
        message.channel.send(`NullPointerException: \`You must provide an argument\``);
        return; 
      }
  
    
if(!isNaN(args[0]) && 0 < args[0] && args[0] < 21 || args[0] == "change" || args[0] == "set" || args[0] == "ch" || args[0] == "s"){

  if(isNaN(args[0])){
 message.member.setNickname(module.exports.generate()).catch(err => {
   message.reply("WTF gimme me permissions bruh");
 });
  }else{
    let response = "";
  for(let i = args[0]; i > 0; i--){
    response += module.exports.generate() + "\n";
  }
    message.channel.send(response);
  }
}else{
  message.channel.send(`IllegalArgumentException: \`Number range should be in between 0-21excluded\``);
	return; 
} 	
     }catch(err){
      console.log(err);
      ;
    }
    },
generate(){
  const templates = ["[superlative] [person]", "The [person] of [action]", "[person] in [location]"];
  const person = ["Beginner", "Prisoner", "Assassin", "Salesperson", "Milkman", "Vendor", "Cultist", "Soothsayer", "Collector", "Farmer", "Ancestor", "Guest", "Necromancer", "Aeromancer", "Hatchling", "Fisherman"];
  const superlative = ["Mysterious", "Golden", "Dead", "Rival", "Horrific", "Dark", "Eggcelent", "Tea", "Long", "Hungry", "Hideous", "Desperate", "Small", "Failing", "Booming", "Insatiable", "Red", "Greedy", "Holiday", "Ancestral", "Police", "Bountiful", "Suspicious", "Tasty", "Haunted", "Cyclopean", "Sacrificial", "Undercover", "Wandering", "Recruiting", "Travelling", "Losing", "Importing"];
  const action = ["the Wild", "Day", "Beginnings", "War", "Failure", "Harvest", "Darkness", "the Gods", "Time", "Strategy", "Tricks"];
  const location = ["Time", "Town", "Storm", "Rain", "the Deck", "the Future"];
  let template = templates[Math.floor(Math.random() * templates.length)]
  template = template.replace("[person]", person[Math.floor(Math.random() * person.length)]);
  template = template.replace("[superlative]", superlative[Math.floor(Math.random() * superlative.length)]);
  template = template.replace("[action]", action[Math.floor(Math.random() * action.length)]);
  template = template.replace("[location]", location[Math.floor(Math.random() * location.length)]);

return template;

}};