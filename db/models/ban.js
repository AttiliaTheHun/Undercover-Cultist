module.exports = (sequelize, DataTypes, Model) => {

  class Ban extends Model {}

  const Bans = Ban.init({
    id : {
	    type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
	  },
    server: {
      type: DataTypes.STRING(20),
      unique: false
    },
    global: {
      type: DataTypes.BOOLEAN,
      unique: false
    },
    user: {
      type: DataTypes.STRING(20),
      unique: false
    },
    banned_by: {
      type: DataTypes.STRING(20),
      unique: false
    },
    reason: {
      type: DataTypes.STRING(600),
      unique: false
    }
  }, {
    sequelize, 
    modelName: 'Ban',
    tableName: 'Bans',
    timestamps: true
  });
  
  return Bans;
  
}