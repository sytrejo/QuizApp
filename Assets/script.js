const startBtn = document.getElementById('startBtn');
const questionContainerElement = document.getElementById('Qcontainer')
const questionElement = document.querySelector('.question');
const answerBtnElement  = document.querySelector('.answers');
const scoreElement = document.getElementById('userScore')
const timerElement = document.querySelector('.timerDisplay')

let score = 25;
let results = localStorage.getItem("results")
var timer
var timerCount = 90


const questions = [
  {
    question:'Do you enjoy Learning JavaScript?',
    answers:[
      {text:'For sure!', correct: true},
      {text:'Sometimes', correct: false},
      {text:'Eww!!', correct: false},
      {text:'What is JavaScript?', correct: false}
    ]
  },

  {
    question:'Commonly used data types DO NOT include:',
    answers:[
      {text:'alerts', correct: true},
      {text:'strings', correct: false},
      {text:'booleans', correct: false},
      {text:'numbers', correct: false}
    ]
  },

  {
    question:'The condition in an if / else statement is enclosed within ____.',
    answers:[
      {text:'quotes', correct: false},
      {text:'curly brackets', correct: false},
      {text:'parentheses', correct: true},
      {text:'square', correct: false}
    ]
  },

  {
    question:'Arrays in JavaScript can be used to store ________',
    answers:[
      {text:'numbers ', correct: false},
      {text:'other arrays', correct: false},
      {text:'booleans', correct: false},
      {text:'all of the above', correct: true}
    ]
  },
  {
    question:'String values must be enclosed within ____ when being assigned to variables.',
    answers:[
      {text:'commas', correct: false},
      {text:'quotes', correct: true},
      {text:'curly brackers', correct: false},
      {text:'parentheses', correct: false}
    ]
  },
  {
  question:'A very useful tool used during development and debugging for printing content to the debugger is:',
  answers:[
    {text:'JavaScript', correct: false},
    {text:'terminal', corrext: false},
    {text:'console.log', corrext: true},
    {text:'bash for loops', corrext: false}
  ]
  }
]

let shuffledQuestions
let currentQuestionIndex

startBtn.addEventListener('click',beginGame)

//function begins the quiz  and hides the rules
function beginGame(){
  $('#rules').addClass('hidden');
  $('#Qcontainer').removeClass('hidden');
  startBtn.classList.add('hide')
  questionContainerElement.classList.remove('hide')
  showQuestion()
  timer()
}


function showQuestion(){
  resetState()
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionElement.innerText = questions[0].question
  questions[0].answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct === true){
      button.dataset.correct = 'true'
    }
    button.addEventListener('click', selectAnswer)
    answerBtnElement.appendChild(button)
  })
  questions.shift()
}


function resetState(){
  while(answerBtnElement.firstChild){
    answerBtnElement.removeChild(answerBtnElement.firstChild)
  }
}

function selectAnswer(e){
  const selectedButton = e.target
  if (selectedButton.dataset.correct == 'false'){
    score -=5
    scoreElement.textContent = score
    if (question.length === 0){
      endQuiz()
    }else{
      showQuestion()
    }
  } else{
    timerCount -= 10
    if (question.length == 0){
      endQuiz()
    }else if(timerCount === 0){
      window.alert("Sorry! Your time is up!")
      endQuiz()
    }else{
      showQuestion()
    }
  }
}



// start the timer for 90 seconds
function timer(){
  timer = setInterval(function(){
    timerCount--;
    timerElement.textContent = timerCount
    if (timerCount === 0){
      window.alert("Sorry! Your time is up!")
      endQuiz()
    }
  },1000);
}

function endQuiz(){
  $('#Qcontainer').addClass('hidden');
  $('#scoreInput').removeClass('hidden');
}


const saveBtn = document.getElementById('save');
saveBtn.addEventListener('click',save)
function save(){
  // console.log("Cool!")
  location.href = 'scores.html'
}



















// function wrong(){
//   secondsLeft = secondsLeft - 5;
//   document.getElementById("correct").textContent = "false";
// }

// function right(){
//   document.getElementById("correct").textContent = "true";
//   secondsLeft= secondsLeft - 0
// }


// nextBtn.addEventListener('click', () => {
//   currentQuestionIndex++
//   setNextQuestion()
// })

// function setNextQuestion (){
//   let currentQuestionIndex = 0
//   resetState()
//   showQuestion(shuffledQuestions[currentQuestionIndex])
// }

// function setStatusClass(element, correct) {
//   //   clearStatusClass(element)
//   //   if (correct) {
//   //     element.classList.add('correct')
//   //   } else {
//   //     element.classList.add('wrong')
//   //   }
//   // }
  
//   // function clearStatusClass(element) {
//   //   element.classList.remove('correct')
//   //   element.classList.remove('wrong')
//   // }


// function timer(){
//   var sec = 90;
//   timer = setInterval(function(){
//     document.getElementById('timerDisplay').innerHTML= '' + sec +'  second(s)';
//     sec--;
//     if (sec === 0){
//       window.alert("Sorry! Your time is up!")
//     }
//   },1000);
// }