const { ActivityType } = require('discord.js');

module.exports = async (client) => {
  console.log("ready loaded")
  const STATUS_CHANGE_INTERVAL = 15 * 1000;
  
  let status = 0;
  
  console.log(`Bot running: ${client.user.tag}`);
 
  const activities = [
    {name: `/help`, type: ActivityType.Listening },
    {name: "Someone on the inside", type: ActivityType.Watching },
    {name: "Underhand", type: ActivityType.Playing }
  ];
  
  
  setInterval(() => {
    if(status == activities.length){
      status = 0;
    }
    client.user.setActivity(activities[status]);
    status++;

  }, STATUS_CHANGE_INTERVAL);
  
};