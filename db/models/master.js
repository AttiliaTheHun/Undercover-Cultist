module.exports = (sequelize, DataTypes, Model) => {

  class Master extends Model {}

  const Masters = Master.init({
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
