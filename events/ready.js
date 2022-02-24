module.exports = async (client) => {
  
  const STATUS_CHANGE_INTERVAL = 15 * 1000;
  const {prefix} = require("../config.json");
  
  let status = 0;
  
  console.log(`Bot running: ${client.user.tag}`);
 
  const activities = [
    {name: `${prefix}help`, type: "LISTENING"},
    {name: "Someone on the inside", type: "WATCHING"},
    {name: "Underhand", type: "PLAYING"}
  ];
  
  
  setInterval(async () => {
    if(status = activities.length){
      status = 0;
    }
    client.user.setActivity(activities[status]);
    status++;

  }, STATUS_CHANGE_INTERVAL);
  
};