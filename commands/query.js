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
  async execute(message, args, {query}) {
    try {
      await query(args.join(" "));
      message.channel.send("Query executed");
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};