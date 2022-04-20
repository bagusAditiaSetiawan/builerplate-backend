const {Sequelize} = require("@sequelize/core");
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DBMS
});

module.exports = {
    db
};