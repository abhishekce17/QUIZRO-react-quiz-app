const express = require("express");
const FormQuestion = require("../models/FormQuestion");
const FormResponses = require("../models/FormResponses");
const Questions = require("../models/Questions");
const Response = require("../models/Response");
const Answers = require("../models/Answers");
// const loginStatus = require("../middleware/loginstatus");
const router = express.Router();

router.post("/getQuizQestions", async (req, res) => {
    try {
        const id = req.body.quizId

        let randomIndex = []
        let randomizeOptions = []

        const quizData = await Questions.findById(id).select("-userId")
        if (quizData.QuizStatus) {
            if (quizData["Quiz Setting Info"].randomizeQuestionsAndOptions) {
                for (let index = 0; randomIndex.length < quizData["Questions and MCQ/MSQ"].length; index++) {
                    let val = Math.floor(Math.random() * quizData["Questions and MCQ/MSQ"].length)
                    if (!randomIndex.includes(val)) {
                        let optionIndexArray = []
                        randomIndex.push(val)
                        for (let id = 0; optionIndexArray.length < quizData["Questions and MCQ/MSQ"][val].option.length; id++) {
                            let optionIndex = Math.floor(Math.random() * quizData["Questions and MCQ/MSQ"][val].option.length)
                            if (!optionIndexArray.includes(optionIndex)) {
                                optionIndexArray.push(optionIndex)
                            }
                        }
                        randomizeOptions.push(optionIndexArray)
                    }
                }
                res.status(200).json({ quizData, randomIndex, randomizeOptions })
            } else {
                for (let index = 0; randomIndex.length < quizData["Questions and MCQ/MSQ"].length; index++) {
                    randomIndex.push(index)
                }
                res.status(200).json({ quizData, randomIndex })
            }
        } else {
            res.status(498).json({ "message": "link is expired" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }

})
router.post("/getFormQestions", async (req, res) => {
    try {
        const id = req.body.quizId
        const formQuestions = await FormQuestion.findById(id).select("-userId")
        if (formQuestions.QuizStatus) {
            res.status(200).json({ formQuestions })
        } else {
            res.status(498).json({ "message": "link is expired" })
        }
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }

})
router.post("/submitPersonalInfo", (req, res) => {
    try {
        const respo = req.body.type === "quiz" ? Response.create({ "personal info": req.body["personal info"], QuizId: req.body.QuizId }) : FormResponses.create({ "personal info": req.body["personal info"], QuizId: req.body.QuizId })
        respo.then((data) => {
            if (data) {
                const respoCount = req.body.type === "quiz" ? Questions.findByIdAndUpdate(req.body.QuizId, { $inc: { "Response Count": 1 } }) : FormQuestion.findByIdAndUpdate(req.body.QuizId, { $inc: { "Response Count": 1 } })
                respoCount.then(res.status(200).json({ success: true, responseId: data.id }))
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
})
router.put("/submitAnswers", async (req, res) => {
    try {
        if (req.body.type === "quiz") {
            const checkAnswers = Answers.findOne({ QuizId: req.body.quizId })
            const questionSettInfo = Questions.findById(req.body.quizId)
            questionSettInfo.then((qdata) => {
                checkAnswers.then(async (data) => {
                    let totalPonts = 0
                    let answers = req.body.quizAnswers
                    data["quiestion and answers"].map((val, index) => {
                        if (answers[val.questionId] === undefined) {
                            answers = { ...answers, [val.questionId]: "(Not answered)" }
                        }
                        else if (answers[val.questionId].toString() === val.answer.toString()) {
                            totalPonts += val.Points
                        } else {
                            if(qdata["Quiz Setting Info"].showCorrectAnswer){
                                answers = { ...answers, [val.questionId]: answers[val.questionId] + "     (wrong)  Correct :"+ val.answer }
                            }
                            else{
                                answers = { ...answers, [val.questionId]: answers[val.questionId] + "     (wrong) " }
                            }
                        }
                    })
                    await Response.findByIdAndUpdate(req.body.responseId, { "Quiz Answers": answers, "Total Point": totalPonts, "submited at": Date.now() })
                })
                if (qdata["Quiz Setting Info"].showLeaderboard) {
                    res.status(302).json({ updated: true })

                } else {
                    res.status(200).json({ updated: true })
                }
            })
        } else {
            await FormResponses.findByIdAndUpdate(req.body.responseId, { Response: req.body.quizAnswers, "submited at": Date.now() })
            res.status(200).json({ updated: true })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
})

module.exports = router