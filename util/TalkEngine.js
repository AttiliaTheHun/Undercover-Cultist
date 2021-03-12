const utils = require('./utils.js');
module.exports = {
  dm(message){
    if(message.content.toLowerCase().includes("neither should you")){
          message.channel.send("I see you are a man of culture. Very well!");
        }else{
          message.channel.send(utils.randomArrayItem(module.exports.responses));
        }
  },
  talk(message){
    
  },
  responses : {
  "hi" : "Hello",
  "hello" : "Hi",
  "you shouldn\'t be here.": "Neither should you",
  "neither should you": "I see you are a man of culture. Very well!"
},
  includes : {
    "undercover cultist" : "Shhh, ${message.author.username}, I do not want to be exposed!"
  },
  randoms : [
  'I was thinking about stars. They are so shiny!',
  'Is that all you have to say?',
  'I am waiting for what the future will bring...',
  'Who are you?',
  'Yum']
}