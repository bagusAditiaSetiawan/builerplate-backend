const {Sequelize} = require("@sequelize/core");

const sequelize = new Sequelize(process.env.MYSQL_DB, process.env.MYSQL_USERNAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: "mariadb"
});

module.exports = sequelize;