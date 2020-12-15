const Sequelize = require("sequelize");
const connection = require("./database");
const Question = require("./Question");

//model Answer
const Answer = connection.define("answer", {
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    questionId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

   
});

Answer.sync({
    force: false
});
Question.hasMany(Answer); // allows question Id to be referenced in many questions
Answer.belongsTo(Question, {foreignKey: "questionId", targetKey: "id"}); // defines questionId as foreign key in answer table to question attribute
module.exports = Answer;