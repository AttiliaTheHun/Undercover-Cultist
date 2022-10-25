module.exports = async (client, guild) => {
  const channel = await guild.client.utils.getSystemChannel(guild);
  if (channel) {
    channel.send("Don't mind me, I am not here. Really.");
  }
  await client.logger.guildCreated(guild); 
};