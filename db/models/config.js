module.exports = (sequelize, DataTypes, Model) => {

  class Config extends Model {}

  const Configs = Config.init({
    id : {
	    type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
	  },
    name: {
      type: DataTypes.STRING,
      unique: false
    },
    value: {
      type: DataTypes.STRING,
      unique: false
    },
    last_updated_by: {
      type: DataTypes.STRING(20),
      unique: false
    }
  }, {
    sequelize, 
    modelName: 'Config',
    tableName: 'Configs',
    timestamps: true
  });
  
  return Configs;
  
}