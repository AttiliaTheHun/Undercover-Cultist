const Command = require("../Command.js");

module.exports = class Execute extends Command {
  
  constructor(client) {
    super(client, {
      name: 'execute',
      aliases: ['exec', 'eval', 'run', 'rce'],
      usage: 'exec <js-code>',
      description: `Remote Code Execution, it is not recommended to use this`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['execute message.channel.send("Remote Code Execution is real");'],
      master: true
    });
  }
  
  async execute(message, args) {
    console.log(args.join(" "));
    eval(args.join(""));
  }
   
}