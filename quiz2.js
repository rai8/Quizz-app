const question=document.querySelector("#question");
const choices=Array.from(document.querySelectorAll(".choice-text"));
const progressText=document.querySelector("#progressText");
const progressBarFull=document.querySelector("#progressBarFull");

//console.log(choices) 
let currentQuestion={}
let acceptingAnswers= true
let score=0
let questionCounter=0
let availableQuestions=[]

let questions=[
    {
        question: "Which is the most sensitive of the senses?",
        choice1: "Smell",
        choice2: "Touch",
        choice3: "Taste",
        choice4: "Hearing",
        answer: 1,
    },
    {
        question: "Ascorbic acid is a form of which vitamin?",
        choice1: "Vitamin A",
        choice2: "Vitamin B",
        choice3: "Vitamin C",
        choice4: "Vitamin D",
        answer: 3,
    },
    {
        question: "Humans and chimpanzees share roughly how much DNA?",
        choice1: "50%",
        choice2: "98%",
        choice3: "37%",
        choice4: "76%",
        answer: 2,
    },
    {
        question: "How many hearts do octopuses have?",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 3,
    }, 
    {
        question: "Which is the largest internal organ in the human body?",
        choice1: "Beijing",
        choice2: "Liver",
        choice3: "Heart",
        choice4: "Small intestines",
        answer: 2,
    }, 
    {
        question: "What is the collective name for a group of crows?",
        choice1: "A crew",
        choice2: "A murder",
        choice3: "A badge",
        choice4: "A flair",
        answer: 2,
    }, 
    {
        question: "What is the largest moon of Saturn called?",
        choice1: "Sagitarius",
        choice2: "Salina",
        choice3: "Titan",
        choice4: "Triton",
        answer: 3,
    }, 
    {
        question: "How many ribs do you have?",
        choice1: "18",
        choice2: "13",
        choice3: "14",
        choice4: "9",
        answer: 1,
    }, 
    {
        question: "What is the soft spot on a babies head known as?",
        choice1: "The Plantalium",
        choice2: "The Nalithiulm",
        choice3: "The Fontanelle",
        choice4: "The Zilthra",
        answer: 3,
    }, 
    {
        question: " On the periodic table, what symbol stands for silver?",
        choice1: "Ag",
        choice2: "Si",
        choice3: "S",
        choice4: "Na",
        answer: 1,
    }, 
]
const SCORE_POINTS= 10
const MAX_QUESTIONS= 10

startGame=()=>{
    questionCounter=0
    score = 0
    availableQuestions=[...questions]
    getNewQuestion()
}

getNewQuestion=()=>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
return window.location.assign('/end.html') //keep track to the score
    }
    questionCounter++
    progressText.innerText =`Question  ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width= `${(questionCounter/MAX_QUESTIONS)*100}%`

    const questionsIndex = Math.floor(Math.random()*availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]

    question.innerText=  currentQuestion.question

    choices.forEach(choice =>{
        const number= choice.dataset['number']
        choice.innerText= currentQuestion['choice'+ number]
    })

availableQuestions.splice(questionsIndex, 1)

acceptingAnswers= true
}

choices.forEach(choice=>{
    choice.addEventListener('click', e =>{
      if(!acceptingAnswers) return
      acceptingAnswers= false
      const selectedChoice= e.target
      const selectedAnswer= selectedChoice.dataset['number']

      let classToApply= selectedAnswer  == currentQuestion.answer ? 'correct': 'incorrect'
      if ( classToApply === 'correct'){
          incrementScore(SCORE_POINTS )
      }
    selectedChoice.parentElement.classList.add(classToApply)

    setTimeout(()=>{
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
    }, 1000)
    })
})

incrementScore=num=>{
    score += num
    score.innerText= score
}

startGame() 