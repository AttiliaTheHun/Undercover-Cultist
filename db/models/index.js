const { Sequelize, DataTypes, Model } = require("sequelize");
const fs = require("fs");
const path = require("path");

const basename = path.basename(__filename);
/*const sequelize = new Sequelize(process.env.db_name, process.env.db_user, process.env.db_password, {
  host: process.env.db_server,
  //port: process.env.db_port,
  dialect: "sqlite",
  //logging: console.log
  storage: "database.sqlite"
});*/

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
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