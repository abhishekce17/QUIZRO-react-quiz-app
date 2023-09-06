//jshint esversion:6
const connectToMongo = require("./db")
const express = require("express");
const cors = require("cors")
var session = require('cookie-session');
const passport = require("passport");


const app = express();
connectToMongo();

app.set('trust proxy', 1)

app.use(session({
  cookie: {
    secure: true,
    maxAge: 60000
  },
  secret: 'clientsSecretQuizroAuthentication',
  saveUninitialized: true,
  resave: false
}))

app.use(cors(
  { origin: "https://quizro-quiz.vercel.app", credentials: true }));

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json())
// app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/quizoperations", require("./routes/quizoperations"));
app.use("/api/submit/responses", require("./routes/submitresponse"));

app.listen(5000, function (err) {
  if (!err) {
    console.log("server is running on port 5000");
  }
})