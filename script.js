let quizDescript = document.getElementById("quizDescipt");
let startBtn = document.getElementById("startBtn");
const questionContEl = document.getElementById("ques-container");
let randomQues;
let currentQuestionIndex;
const questionEl = document.getElementById("question");
const answerBtnEl = document.getElementById("answer-btns");
let timerStart = parseInt(75);
let timerInterval;
let timer = document.getElementById("timer");
// let button = document.createElement("button");

let questions = [
  {
    question: "What is 2+2?",
    answers: [
      { text: "4", correct: true },
      { text: "34", correct: false },
      { text: "60", correct: false },
      { text: "15", correct: false },
    ],
  },
  {
    question: "What is 5+5?",
    answers: [
      { text: "10", correct: true },
      { text: "60", correct: false },
      { text: "4", correct: false },
      { text: "15", correct: false },
    ],
  },
  {
    question: "What is 30+5?",
    answers: [
      { text: "24", correct: false },
      { text: "35", correct: true },
      { text: "90", correct: false },
      { text: "7", correct: false },
    ],
  },
  {
    question: "What is 1+2?",
    answers: [
      { text: "3", correct: true },
      { text: "89", correct: false },
      { text: "7", correct: false },
      { text: "15", correct: false },
    ],
  },
];

startBtn.addEventListener("click", startQuiz);
startBtn.addEventListener("click", startTimer);

function startTimer() {
  timerInterval = setInterval(function () {
    timerStart--;
    timer.textContent = "Timer: " + timerStart;

    if (timerStart === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function startQuiz() {
  startBtn.classList.add("hide");
  randomQues = questions.sort(function () {
    Math.random() - 0.5;
  });
  currentQuestionIndex = 0;
  quizDescript.classList.add("hide");
  questionContEl.classList.remove("hide");
  nextQuestion();
}

function nextQuestion() {
  resetBtn();
  displayQues(randomQues[currentQuestionIndex]);
}
function displayQues(question) {
  questionEl.innerText = question.question;
  question.answers.forEach(function (answer) {
    let button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.setAttribute("data-correct", true);
    }
    button.addEventListener("click", selectedAns);
    answerBtnEl.appendChild(button);
  });
}
function resetBtn() {
  while (answerBtnEl.firstChild) {
    answerBtnEl.removeChild(answerBtnEl.firstChild);
  }
}
function selectedAns(e) {
  let selectedAns = e.target;
  let rightAns = selectedAns.dataset.correct;
  if (!rightAns) {
    timerStart = timerStart - 10;
  }

  console.log(answerBtnEl.children);
  Array.from(answerBtnEl.children).forEach(function (button) {
    console.log(button);
    btnClass(button, button.dataset.correct);
  });

  if (randomQues.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setTimeout(() => {
      nextQuestion();
    }, 1500);
  } else {
    alert("game over!");
  }
}
function btnClass(element, correct) {
  clearBtnClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearBtnClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
