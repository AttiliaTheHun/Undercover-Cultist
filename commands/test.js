module.exports = { 	
  name: 'test', 	
  description: 'card [number]', 	
  action: "sends card texture specified by it's number",
  note: "",
  legend: "number",
  async execute(message, args) { 		

  let id = args[0] || '738415237400756246';
    let guild = message.guild;
let member = await guild.members.fetch(id);
    console.log(member)
   // member = user;
	message.channel.send(member.user.username + "#" + member.user.discriminator + " " + member.displayName)
 	
  member = guild.members.cache.get(id);
    message.channel.send(member.user.username + "#" + member.user.discriminator + " " + member.displayName);
  member = message.member;
 message.channel.send(member.user.username + "#" + member.user.discriminator + " " + member.displayName);
message.channel.send(message.member.id == message.member.user.id);
  }, };