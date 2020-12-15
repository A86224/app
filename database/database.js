//conncetion to database
const Sequelize = require('sequelize');
const connection = new Sequelize('faqs', 'root', 'peixoto2017', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
