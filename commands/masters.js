module.exports = {
  name: "masters",
  syntax: "masters",
  description: "Shows the list of bot Masters",
  note: "",
  permissions: "",
  master: true,
  aliases: ["listmasters", "botmasters"],
  legend: "",
  category: "informative",
  async execute(message, args, utils) {
    try {

      const masters = await utils.query(`SELECT * FROM Masters;`);
      console.log(masters)
      if (masters) {
        if (masters.length > 0) {

          const embed = {
           title: "Bot Masters",
           color: "#ffbc03",
          fields : []
          }
          let master_id;
          let master_member;
          let master_username;
          let promoted_by_id;
          let promoted_by_member;
          let promoted_by_username;

          for (let i = 0; i < masters.length; i++) {
            master_id = masters[i].user;
            master_member = await message.guild.members.cache.get(master_id);
            master_username = utils.getUserNameStringFromMember(master_member);
            promoted_by_id = masters[i].promoted_by;
            promoted_by_member = await message.guild.members.cache.get(promoted_by_id);
            promoted_by_username = utils.getUserNameStringFromMember(promoted_by_member);

            embed.fields.push({
              name: master_username, 
              value: `Promoted by: ${promoted_by_username}`,
              inline: false
            });
          }
          embed.footer = {
            text: "Undercover Cultist#5057"
          };
          message.channel.send(utils.buildEmbed(embed));
          return;
        }
        message.reply("Nothing to display");
      }
      return;


    } catch (err) {
      console.log(err);
      return err;

    }
  },
};