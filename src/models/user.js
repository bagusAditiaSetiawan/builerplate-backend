const {  DataTypes, Model } = require('sequelize');
const {db} = require("./../config/db");

class User extends Model {
  static async getAll() {
    return this.findAll({});
  }
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize: db, // We need to pass the connection instance
  modelName: "user",
  tableName: "users",
  // I don't want createdAt
  createdAt: "created_at",

  // I want updatedAt to actually be called updateTimestamp
  updatedAt: 'updated_at'
});

module.exports = {
    User,
}