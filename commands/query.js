module.exports = {
  name: "query",
  syntax: "query [SQL code-block]",
  description: "Executes an SQL query directly from the input",
  note: "It is recommended not to use this command if not necessary",
  permissions: "",
  master: true,
  aliases: [],
  legend: "rawquery",
  category: "utility",
  async execute(message, args, client, Config, Masters, Bans, Notes, sequelize) {
    try {
      await sequelize.query(args.join(" "));
      message.channel.send("Query executed");
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};