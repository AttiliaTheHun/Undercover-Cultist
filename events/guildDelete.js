module.exports = async (client, guild) => {
  await client.logger.guildRemoved(guild);
};