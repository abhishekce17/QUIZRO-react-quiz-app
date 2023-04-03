const mongoose = require("mongoose")
const FormQuestionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    Title: {
        type: String,
        required: true
    },

    Description: {
        type: String,
    },

    QuizStatus : {
        type : Boolean,
        default : true,
        required : true
    },

    "Required Information": {
        status: {
            type: Boolean,
            required: true
        },
        infoFields: {
            Name: {
                type: Boolean,
                required: true
            },
            Email: {
                type: Boolean,
                required: true
            },
            extraFields: []
        }
    },

    "Form Questions" : [{
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "mcq"
        },
        option: { type: Array }
    }],

    "Created at": {
        type: Date,
        default: Date.now,
    },

    "Response Count": {
        type: Number
    }


});

module.exports = mongoose.model("Form question", FormQuestionSchema);