//creating server new
const express = require("express");
const app = express();
const bodyParser = require("body-parser"); // req body-parser
const connection = require("./database/database"); //importing databade connection
const Question = require("./database/Question"); //importing question model
const Answer = require("./database/Answer"); //importing Answer Model
const port = process.env.PORT || 8080; //environment port, default 8080
//database connection testing
connection.authenticate().then(() => {
    console.log("Successfully connected to database")
}).catch((err) => {
    console.log("Error connecting to database: " + err)
});
//EJS config so express uses EJS as view engine
app.set('view engine', 'ejs');
//Body Parser instance 
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//Use static files
app.use(express.static('public'));
//routes
app.get("/", (req, res) => {
    Question.findAll({
        raw: true,
        order: [
            ['createdAt', 'DESC']
        ] //order by last in 
    }).then(question => {
        res.render("index", {
            question: question
        })
    })
});
app.get("/question", (req, res) => {
    res.render("question");
})
//form question route
app.post("/question", (req, res) => {
    var title = req.body.title;
    var question = req.body.question;
    Question.create({
        title: title,
        question: question
    }).then(() => {
        res.redirect("/");
    });
});

// rout that sends yout to the question view by its id
app.get("/question/:id", (req, res) => {
    var id = req.params.id;
    Question.findOne({
        where: {
            id: id
        }
    }).then(question => {
        if (question != undefined) {
            Answer.findAll({
                where: {
                    questionId: question.id
                }
            }).then(answers => {
                res.render("singlequestion", {
                    question: question,
                    answers: answers
                });
            });
        } else {
            res.redirect("/");
        }
    });
})
// rout to answer a question, writes answer to database
app.post("/answer", (req, res) => {
    var body = req.body.answerBody;
    var Id = req.body.questionId;
    Answer.create({
        body: body,
        questionId: Id
    }).then(() => {
        res.redirect("/question/" + Id);
    });
});

///delete question
app.get("/destroy/:id", (req, res) => {
    var Id = req.params.id
    Question.destroy({
        where: {
            id: Id
        }
    }).then(()=>{
        res.redirect("/");
    });
});


app.listen(port, () => {
    console.log("Server Running on port: "+ port)
});