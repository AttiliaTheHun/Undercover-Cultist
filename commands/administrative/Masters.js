const Command = require("../Command.js");

module.exports = class Masters extends Command {
  
  constructor(client) {
    super(client, {
      name: 'masters',
      aliases: ['botmasters', 'listmasters'],
      usage: 'masters',
      description: `Shows the list of the bot Masters`,
      type: client.types.ADMINISTRATIVE,
      userPermissions: [],
      examples: ['masters'],
      master: true
    });
  }
  
  async execute(message, args) {
    try {

      const masters = await this.client.utils.query(`SELECT * FROM Masters;`);
      console.log(masters)
      if (masters) {
        if (masters.length > 0) {

          const embed = {
           title: "Bot Masters",
           color: "#ffbc03",
          fields : []
          }
          let master_id;
         // let master_member;
          let master;
          let promoted_by_id;
          let promoter;
        //  let promoted_by_username;

          for (let i = 0; i < masters.length; i++) {
            master_id = masters[i].user;
            console.log(master_id)
            master = await message.guild.members.cache.get(master_id);
           // master_username = utils.getUserNameStringFromMember(master_member);
            promoted_by_id = masters[i].promoted_by;
            promoter= await message.guild.members.cache.get(promoted_by_id);
           // promoted_by_username = utils.getUserNameStringFromMember(promoted_by_member);

            embed.fields.push({
              name: master.user.tag, 
              value: `Promoted by: ${promoter.user.tag}`,
              inline: false
            });
          }
          embed.footer = {
            text: "Undercover Cultist#5057"
          };
          console.log(embed);
          message.channel.send({embeds: [this.client.utils.buildEmbed(embed)]});
          return;
        }
        message.reply("Nothing to display");
      }
      return;


    } catch (err) {
      console.log(err);
      return err;

    }
  }
   
}