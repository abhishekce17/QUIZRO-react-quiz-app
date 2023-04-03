const mongoose = require("mongoose")
const ResponseSchema = mongoose.Schema({
    QuizId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    "personal info" : {
        type : Object
    },
    Response : {
        type : Object
    },
    "submited at" : {
        type : Date,
    }
})

module.exports = mongoose.model("FormResponse", ResponseSchema)