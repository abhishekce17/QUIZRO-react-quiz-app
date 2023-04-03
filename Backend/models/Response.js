const mongoose = require("mongoose")
const ResponseSchema = mongoose.Schema({
    QuizId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    "personal info" : {
        type : Object
    },
    "Quiz Answers" : {
        type : Object
    },
    "submited at" : {
        type : Date,
    },
    "Total Point" : {
        type : Number
    }
})

module.exports = mongoose.model("Response", ResponseSchema)