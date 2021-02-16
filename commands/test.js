const cardwip = require('../cardwip.json');
module.exports = { 	
  name: 'test', 	
  description: 'card [number]', 	
  action: "sends card texture specified by it's number",
  note: "",
  legend: "number",
  async execute(message, args) { 		
 let event = cardwip[57];
    console.log(event.option3.outputtext)
    message.channel.send(event.option3.outputtext == null)
    message.channel.send(event.option3.outputtext == undefined)
    message.channel.send(event.option3.outputtext == "")
  }, };