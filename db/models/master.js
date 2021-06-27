module.exports = (sequelize, DataTypes, Model) => {

  class Master extends Model {}

  const Masters = Master.init({
    id : {
	    type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
  	},
    user: {
      type: DataTypes.STRING(20),
      unique: true
    },
    promoted_by: {
      type: DataTypes.STRING(20),
      unique: false
    }
  }, {
    sequelize, 
    modelName: 'Master',
    tableName: 'Masters',
    timestamps: true
  });
  
  return Masters;
  
}
