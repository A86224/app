const Sequelize = require("sequelize");
const connection = require("./database");

//model Question
const Question = connection.define('question', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});
//creates table in DB - force false means only if doesn't exist
Question.sync({
    force: false
});

module.exports = Question;