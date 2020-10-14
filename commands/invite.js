module.exports = { 	
  name: 'invite', 	
  description: 'Sends invite link.', 	
  execute(message, args) { 		
	
	message.channel.send("Do you want to infiltrate another server? Just tap this link:\nhttps://discord.com/api/oauth2/authorize?client_id=672748100007362561&permissions=604503105&scope=bot");
	}, };