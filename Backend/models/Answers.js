const mongoose  = require("mongoose")
const AnswerSchema = new mongoose.Schema({
    UserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    QuizId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    "quiestion and answers" : {
        type : Array,
        required : true
    },
})

module.exports = mongoose.model("answer", AnswerSchema);