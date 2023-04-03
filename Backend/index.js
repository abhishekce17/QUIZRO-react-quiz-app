//jshint esversion:6
const connectToMongo = require("./db")
const express = require("express");
const cors = require("cors")
const session = require("express-session");
const passport = require("passport");


const app = express();
connectToMongo();

app.use(session({
    secret: "clientsSecretQuizroAuthentication", //any string character
    resave: false,
    saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(
	cors({
		origin: "https://quizro-quiz.vercel.app",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(express.static( __dirname+"/public"));
app.set("view engine", "ejs");
app.use(express.json())
// app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/quizoperations", require("./routes/quizoperations"));
app.use("/api/submit/responses", require("./routes/submitresponse"));


if(process.env.NODE_ENV=='production'){
    const path = require('path')
    
    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'Frontend','build')))
        res.sendFile(path.resolve(__dirname,'Frontend','build','index.html'))
    })
}

 
app.listen(5000, function(err){
    if(!err){
        console.log("server is running on port 5000");
    }
})