module.exports = { 	
  name: 'generate', 	
  description: 'generate [count]/["change"]', 	
  action: "generates target number of Underhand-themed nicknames",
  note: "don't spam it hard in legit channels",
  legend: "count",
  execute(message, args) { 		
    
    try{
       if(args[0] == null){
        
        return message.channel.send(`NullPointerException: \`You must provide an argument\``);
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
	return message.channel.send(`IllegalArgumentException: \`Number range should be in between 0-21excluded\``);
	
} 	
     }catch(err){
      console.log(err);
      ;
    }
    },
generate(){
  const templates = ["[superlative] [person]", "The [person] of [action]", "[person] in [location]"];
  const person = ["Beginner", "Prisoner", "Assassin", "Salesperson", "Milkman", "Vendor", "Cultist", "Soothsayer", "Collector", "Farmer", "Ancestor", "Guest", "Necromancer", "Aeromancer", "Hatchling", "Fisherman"];
  const superlative = ["Mysterious", "Golden", "Dead", "Rival", "Horrific", "Dark", "Eggcelent", "Tea", "Long", "Hungry", "Hideous", "Desperate", "Small", "Failing", "Booming", "Insatiable", "Red", "Greedy", "Holiday", "Ancestral", "Police", "Bountiful", "Suspicious", "Tasty", "Haunted", "Cyclopean", "Sacrificial", " Undercover", "Wandering", "Recruiting", "Travelling"];
  const action = ["the Wild", "Day", "Beginnings", "War", "Failure", "Harvest", "Darkness", "the Gods", "Time"];
  const location = ["Time", "Town", "Storm", "Rain", "Deck", "Future"];
  let template = templates[Math.floor(Math.random() * templates.length)]
  template = template.replace("[person]", person[Math.floor(Math.random() * person.length)]);
  template = template.replace("[superlative]", superlative[Math.floor(Math.random() * superlative.length)]);
  template = template.replace("[action]", action[Math.floor(Math.random() * action.length)]);
  template = template.replace("[location]", location[Math.floor(Math.random() * location.length)]);

return template;

}};