module.exports = (sequelize, DataTypes, Model) => {

  class Note extends Model {}

  const Notes = Note.init({
    server: {
      type: DataTypes.STRING(20),
      unique: false
    },
    author: {
      type: DataTypes.STRING(20),
      unique: false
    },
    note: {
      type: DataTypes.STRING(600),
      unique: false
    }
  }, {
    sequelize, 
    modelName: 'Note',
    tableName: 'Notes',
    timestamps: true
  });
  
  return Notes;
  
}
