const express = require("express");
// const { body, validationResult } = require("express-validator");
const Questions = require("../models/Questions");
const loginStatus = require("../middleware/loginstatus");
const Answers = require("../models/Answers");
const FormQuestion = require("../models/FormQuestion");
const FormResponses = require("../models/FormResponses");
const Response = require("../models/Response");
const router = express.Router();

router.post("/create", loginStatus, (req, res) => {
    try {
        const question = Questions.create({ ...req.body.quizData, userId: req.userId })
        question.then((data) => {
            let answerArray = req.body.answerData.map((value, index) => {
                return { ...value, questionId: data["Questions and MCQ/MSQ"][index]._id, Points : data["Questions and MCQ/MSQ"][index].point === "" ? Number(data["Quiz Setting Info"].defaultPoint) :Number(data["Questions and MCQ/MSQ"][index].point) }
            })
            Answers.create({ UserId: req.userId, QuizId: data._id, "quiestion and answers": answerArray }).then(() => {
                res.status(200).json({ success: true })
            })
        })
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }

})

router.post("/createForm", loginStatus, (req, res) => {
    try {
        const formQuestion = FormQuestion.create({ ...req.body.quizData, userId: req.userId })
        formQuestion.then(res.status(200).json({ success: true })
        )
    } catch (error) {
        res.status(500).json("Internal Server Error")
    }

})

router.post("/getdataQuiz", loginStatus, async (req, res) => {
    try {
        UserId = req.userId;
        const quizData = await Questions.find({ "userId": UserId })
        res.status(200).json({ quizData })
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post("/getdataForm", loginStatus, async (req, res) => {
    try {
        UserId = req.userId;
        const quizData = await FormQuestion.find({ "userId": UserId })
        res.status(200).json({ quizData })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
router.post("/getQuizquestions", loginStatus, async (req, res) => {
    try {
        quizId = req.body.quizId;
        const quizData = await Questions.findById(quizId)
        const quizAnswers = await Answers.find({ QuizId: quizId }).select("-UserId")
        res.status(200).json({ quizData, quizAnswers })
    } catch (error) {
        res.status(500).send(error)
    }
})
router.post("/getFormquestions", loginStatus, async (req, res) => {
    try {
        quizId = req.body.quizId;
        const quizData = await FormQuestion.findById(quizId)
        res.status(200).json({ quizData })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post("/getResponseDetails", loginStatus, async (req, res) => {
    try {
        const respo = req.body.type === "quizes" ? Response.find({ QuizId: req.body.quizId }) : FormResponses.find({ QuizId: req.body.quizId })
        const question = req.body.type === "quizes" ? Questions.findById(req.body.quizId) : FormQuestion.findById(req.body.quizId)
        question.then((data) => {
            respo.then((respoData) => {
                let responseArray = respoData.map((val, index) => {
                    let tempArray = data[req.body.type === "quizes" ? "Questions and MCQ/MSQ" : "Form Questions"].map((eQ) => {
                        return { [eQ.question]: req.body.type === "quizes" ?( val["Quiz Answers"] !== undefined ? val["Quiz Answers"][eQ.id] : "(Not answered)" ) : (val.Response !== undefined ? val.Response[eQ.id] : "(Not answered)" )  }
                    })
                    return {...val._doc , Response : tempArray}
                })
                if (responseArray.length !== 0) {
                    res.status(200).json(responseArray)
                }
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})
router.post("/leaderboardDetails", async (req, res) => {
    try {
        const respo =  Response.findById(req.body.responseId)
        const question = Questions.findById(req.body.quizId) 
        question.then((data) => {
            respo.then((respoData) => {
                    let tempArray = data["Questions and MCQ/MSQ"].map((eQ) => {
                        return { [eQ.question]: (data["Quiz Setting Info"].showToatalEachPoints && !respoData["Quiz Answers"][eQ.id].includes("(wrong)")) ? `${respoData["Quiz Answers"][eQ.id]} ( point : ${eQ.point !== "" ? eQ.point : data["Quiz Setting Info"].defaultPoint})`  : respoData["Quiz Answers"][eQ.id] }
                    })
                    res.status(200).json({...respoData._doc , Response : tempArray})
            })
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.delete("/deleteData", loginStatus, async (req, res) => {
    try {
        quizId = req.body.quizId;
        if (req.body.type === "quizes") {
            await Questions.findByIdAndDelete(quizId)
            await Answers.findOneAndDelete({QuizId  : quizId})
            await Response.findOneAndDelete({QuizId : quizId})
       } else {
           await FormQuestion.findByIdAndDelete(quizId)
           await FormResponses.findOneAndDelete({QuizId : quizId})
       }
       res.status(200).json()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.put("/stopResponse", loginStatus, async (req, res) => {
    try {
        if (req.body.type === "quizes") {
            await Questions.findByIdAndUpdate(req.body.quizId, {QuizStatus : false})
       } else {
           await FormQuestion.findByIdAndUpdate(req.body.quizId, {QuizStatus : false})
       }
        res.status(200).json()
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

module.exports = router