module.exports = async (client, guild) => {
  const channel = client.utils.getSystemChannel(guild);
  channel.send("Don't mind me, I am not here. Really.");
  await client.utils.logGuildCreate(guild); 
};