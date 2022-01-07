const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const questionContainerElement = document.getElementById('Qcontainer')
const questionElement = document.getElementById('question')
const answerBtnElement  = document.getElementById('answers')

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

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function beginGame(){
  $('#rules').addClass('hidden');
  $('#Qcontainer').removeClass('hidden');
  startBtn.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  timer()
}

function setNextQuestion (){
  let currentQuestionIndex = 0
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerBtnElement.appendChild(button)
  })
}

function resetState(){
  clearStatusClass(document.body)
  nextBtn.classList.add('hide')
  while(answerBtnElement.firstChild){
    answerBtnElement.removeChild(answerBtnElement.firstChild)
  }
}

function selectAnswer(e){
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerBtnElement.children).forEach(button => {
    setStatusClass (button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1){
    nextBtn.classList.remove('hide')
  }else{
    startBtn.innerText = 'Restart'
    startBtn.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}



// start the timer for 90 seconds
function timer(){
  var sec = 90;
  var timer = setInterval(function(){
    document.getElementById('timerDisplay').innerHTML='00:'+ sec + '  second(s)';
    sec--;
    if (sec<0){
      clearInterval(timer);
    }
  },1000);
  wrong();
  right();
}

function wrong(){
  secondsLeft = secondsLeft - 5;
  document.getElementById("correct").textContent = "false";
}

function right(){
  document.getElementById("correct").textContent = "true";
  secondsLeft= secondsLeft - 0
}