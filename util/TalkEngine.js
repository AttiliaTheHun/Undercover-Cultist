const {responses, includes, randoms} = require('../constants/dm_lines.js');

class TalkEngine {
  dm (message) {
    message.channel.send(this.proccess(message));
  }

  proccess (message) {
    for (let response of Object.keys(responses)) {
      if (message.content.toLowerCase() == response) {
        return responses[response];
      }
    }
     for (let include of Object.keys(includes)) {
      if (message.content.toLowerCase() == include) {
        return includes[include];
      }
    }
    if (message.client.utils.randomNumber(0, 4) == 2) {
      return message.client.utils.randomArrayItem(randoms);
    }
  }
  
}

module.exports = TalkEngine;