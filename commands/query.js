module.exports = {
  name: "query",
  syntax: "query [SQL code-block]",
  description: "Executes an SQL query directly from the input",
  note: "It is recommended not to use this command if not necessary",
  permissions: "",
  master: true,
  aliases: ["rawquery"],
  legend: "",
  category: "utility",
  async execute(message, args, utils) {
    try {
      let result = await utils.query(args.join(" "));
      message.channel.send("Result length: " + result.length);
      console.log(result);
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};