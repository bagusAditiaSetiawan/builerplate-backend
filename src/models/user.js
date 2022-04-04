const {  DataTypes, Model } = require('sequelize');
const {db} = require("./../config/db");
const {Op} = require("sequelize");
const {hashing} = require("./../helpers/password");
class User extends Model {
  static async getAll() {
    return this.findAll({
      attributes:["id","email","username"],
    });
  }
  static async userExist({email, username}){
    return await this.findOne({
        where:{
            [Op.or]:[
                {
                    email,
                },
                {                        
                    username,
                }
            ]
        }
    });
  }
  static async signUp({
    username, email, password
  }){
    try{
      const hash = await hashing(password);
      return await this.create({username, email, password: hash});
    }catch(error){
      throw Error(error);
    }
  }
}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
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