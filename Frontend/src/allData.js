



const dataArrya = [
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    },
    {
        "quiz_title": "Quiz Title",
        "question_number": 50,
        "response_number": 50,
        "quiz_status": "live",
        "creation_time": "5/02/2022 12:02 am"
    }
]

const DemoData = {
    personalInfoRequirement: { status: true, infoField: { Name: true, Email: true, extraField: ["Contact"] } },
    totalPoints : 50,
    quizSettingInfo: {
        randomizeQuestionsAndOptions: true,
        showCorrectAnswer: true,
        showIncorrectMissedQuestions: true,
        showLeaderboard: true,
        showToatalEachPoints: true,
        defaultPoint: "5",
        closingTime: [false, ''],
        quizTimer: [true, { hours: '0', minute: '1' }]
    },
    quizQuestion : [
        {
            option: ['Lion', 'Camel', 'Kangaroo', 'Platipus'],
            point: "5",
            question: "Which animal is known as the 'Ship of the Desert'?",
            type: "mcq"
        },
        {
            option: ['25', '22', '24', '27'],
            point: "5",
            question: "How many hours are there in day?",
            type: "mcq"
        },
        {
            option: ['2022', '2020', '2018', '2021'],
            point: "5",
            question: "Which one of them is Leap year?",
            type: "mcq"
        },
        {
            option: ['3600', '3400', '3606', '3333'],
            point: "5",
            question: "How many seconds make one hour?",
            type: "mcq"
        },
        {
            option: ['Tadpole', 'calf', 'chick', 'cub'],
            point: "5",
            question: "Baby frog is known as.....",
            type: "mcq"
        },
        {
            option: ['4', '3', '5', '6'],
            point: "5",
            question: "How many sides are there in a triangle?",
            type: "mcq"
        },
        {
            option: ['Mars', 'Saturn', 'Jupiter', 'Pluto'],
            point: "5",
            question: "Name the largest planet of our Solar System.",
            type: "mcq"
        },
        {
            option: ['Nile', 'Ganges', 'Mississippi', 'Amazon'],
            point: "5",
            question: "Name the longest river on the Earth.",
            type: "mcq"
        },
        {
            option: ['China', 'Japan', 'Africa', 'India'],
            point: "5",
            question: "Name the country known as the Land of the Rising Sun?",
            type: "mcq"
        },
        {
            option: ['Stone', 'Diamond', 'Graphite', 'Metal'],
            point: "5",
            question: "Name the hardest substance available on Earth?",
            type: "mcq"
        },
    ],
    titleDescription: {
        quizTitle: "Some General Knowledge Questions",
        quizDescription: "General knowledge is an important part of education it not only helps children to gain knowledge but also makes them aware of what is happening across the globe."
    }
}

const correctAnser = [
    {
        answer:'Camel',
        point: "5",
        question: "Which animal is known as the 'Ship of the Desert'?",
    },
    {
        answer: '24',
        point: "5",
        question: "How many hours are there in day?",
    },
    {
        answer:'2020',
        point: "5",
        question: "Which one of them is Leap year?",
    },
    {
        answer: '3600',
        point: "5",
        question: "How many seconds make one hour?",
    },
    {
        answer: 'Tadpole',
        point: "5",
        question: "Baby frog is known as.....",
    },
    {
        answer: '3',
        point: "5",
        question: "How many sides are there in a triangle?",
    },
    {
        answer: 'Jupiter',
        point: "5",
        question: "Name the largest planet of our Solar System.",
    },
    {
        answer: 'Nile',
        point: "5",
        question: "Name the longest river on the Earth.",
    },
    {
        answer: 'Japan',
        point: "5",
        question: "Name the country known as the Land of the Rising Sun?",
    },
    {
        answer:'Diamond',
        point: "5",
        question: "Name the hardest substance available on Earth?",
    },
]

let randomIndex = []
let randomizeOptions = []

for (let index = 0; randomIndex.length < DemoData.quizQuestion.length; index++) {
    let val = Math.floor(Math.random()* DemoData.quizQuestion.length)
    if(!randomIndex.includes(val)){
        let optionIndexArray = []
        randomIndex.push(val)
        for (let id = 0; optionIndexArray.length < DemoData.quizQuestion[val].option.length; id++) {
            let optionIndex = Math.floor(Math.random()* DemoData.quizQuestion[val].option.length)
            if(!optionIndexArray.includes(optionIndex)){
                optionIndexArray.push(optionIndex)
            }
        }
        randomizeOptions.push(optionIndexArray)
    }
}


export {dataArrya, DemoData,randomIndex, randomizeOptions, correctAnser};