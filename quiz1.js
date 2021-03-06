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
        question: "What is the capital city of Lebanon?",
        choice1: "Beirut",
        choice2: "Bishkek",
        choice3: "Pristina",
        choice4: "Tripoli",
        answer: 1,
    },
    {
        question: "What is the capital city of the Philippines",
        choice1: "Warsaw",
        choice2: "Quezon city",
        choice3: "Manila",
        choice4: "DavaoCity",
        answer: 3,
    },
    {
        question: "Cairo is the capital city of which country?",
        choice1: "Greece",
        choice2: "Jordan",
        choice3: "Kuwait",
        choice4: "Egypt",
        answer: 4,
    },
    {
        question: "What is the capital city of France",
        choice1: "Toulouse",
        choice2: "Paris",
        choice3: "Bordeaux",
        choice4: "Strasbourg",
        answer: 2,
    }, 
    {
        question: "What is the capital city of China",
        choice1: "Beijing",
        choice2: "Shanghai",
        choice3: "Shenzhen",
        choice4: "Xiamen",
        answer: 1,
    }, 
    {
        question: "What is the capital city of Spain",
        choice1: "Madrid",
        choice2: "Port of Spain",
        choice3: "Tunis",
        choice4: "Kampala",
        answer: 1,
    }, 
    {
        question: "What is the capital city of Slovakia",
        choice1: "Honiara",
        choice2: "Bratislava",
        choice3: "Madrid",
        choice4: "Helsinki",
        answer: 2,
    }, 
    {
        question: "What is the capital city of Bangladesh",
        choice1: "Kabul",
        choice2: "Dhaka",
        choice3: "Karachi",
        choice4: "Kathmandu",
        answer: 2,
    }, 
    {
        question: "What is the capital city of Lebanon",
        choice1: "Beirut",
        choice2: "Bishkek",
        choice3: "Pristina",
        choice4: "Tripoli",
        answer: 1,
    }, 
    {
        question: "What is the capital city of Indonesia?",
        choice1: "Budapest",
        choice2: "Kingston",
        choice3: "Jakarta",
        choice4: "Tokyo",
        answer: 3,
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