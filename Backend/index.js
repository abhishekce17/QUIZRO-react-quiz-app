//jshint esversion:6
const connectToMongo = require("./db")
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")


const app = express();
app.use(cors())

connectToMongo();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/quizoperations", require("./routes/quizoperations"));
app.use("/api/submit/responses", require("./routes/submitresponse"));

app.listen(5000, function (err) {
  if (!err) {
    console.log("server is running on port 5000");
  }
})