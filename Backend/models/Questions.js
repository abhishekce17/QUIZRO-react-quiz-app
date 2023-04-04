const mongoose = require("mongoose")
const QuestionSchema = new mongoose.Schema({
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

    "Quiz Setting Info": {
        randomizeQuestionsAndOptions: {
            type: Boolean,
            required: true
        },
        showCorrectAnswer: {
            type: Boolean,
            required: true
        },
        showLeaderboard: {
            type: Boolean,
            required: true
        },
        showToatalEachPoints: {
            type: Boolean,
            required: true
        },
        defaultPoint: {
            type: String,
            required: true
        },
        closingTime: {
            type: Array
        },
        quizTimer: {
            type: Array
        }
    },

    "Questions and MCQ/MSQ": [{
        question: {
            type: String,
            required: true
        },
        type: {
            type: String,
            default: "mcq"
        },
        point: {
            type: String,
            default : ""
        },
        option: { type: Array }
    }],

    "Created at": {
        type: Date,
        default: Date.now,
    },

    "Response Count": {
        type: Number,
    }


});

module.exports = mongoose.model("quiz question", QuestionSchema);