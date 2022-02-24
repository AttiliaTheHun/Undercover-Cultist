const Command = require("../Command.js");

module.exports = class AddMaster extends Command {
  
  constructor(client) {
    super(client, {
      name: 'addmaster',
      aliases: ['defcmd', 'cmddef'],
      usage: 'addmaster <username/ID>',
      description: `Puts target user into the bot Masters group`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['addmaster 608673444061773827', 'addmaster AttilaTheHun'],
      master: true
    });
  }
  
  async execute(message, args) {
    
     let member = await this.client.utils.resolveUser(message, args);
      if(!member || member.id == message.member.id){
        message.channel.send("Couldn't identify the user.");
        return;
      }
      let result = await this.client.utils.query(`INSERT INTO Masters (user, promoted_by) VALUES ('${member.user.id}', '${message.author.id}');`);
      message.reply(`<@${member.user.id}> is now a bot Master.`);
      return;

    } catch (e) {
      console.log(e);
      if (e.name === "SequelizeUniqueConstraintError") {
        message.reply("That user already is a bot Master.");
        return;
      }
      return e;
    }
  }