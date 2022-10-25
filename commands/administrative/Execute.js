const Command = require("../Command.js");

module.exports = class Execute extends Command {
  
  constructor(client) {
    super(client, {
      name: 'execute',
      aliases: ['exec', 'eval', 'run', 'rce'],
      syntax: 'exec <js-code>',
      description: `Remote Code Execution, it is not recommended to use this`,
      category: client.categories.ADMINISTRATIVE,
      clientPermissions: [],
      userPermissions: [],
      examples: ['execute message.channel.send("Remote Code Execution is real");'],
      master: true
    });
  }
  
  async execute(message, args) {
    console.log(args.join(" "));
    eval(args.join(" "));
  }
   
}