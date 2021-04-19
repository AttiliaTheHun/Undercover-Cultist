const { Sequelize, DataTypes, Model } = require("sequelize");
const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
  host: process.env.db_server,
  port: process.env.db_port,
  dialect: "mysql",
  logging: console.log
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file !== basename && file.endsWith(".js")
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes,
      Model
    );
    sequelize[model.name] = model;
  });

sequelize.sync();

module.exports = sequelize;