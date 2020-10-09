// Variables for Coding Quiz
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
let scoreForm = document.getElementById("scoreForm");
let quizDone = false;
let submitBtn = document.getElementById("submitBtn");
let userScore = document.getElementById("userScore");
let highScoreEl = document.getElementById("highscores");
let highscoreListEl = document.getElementById("scoreList");
let highScoreLink = document.getElementById("highScoreList");

// Questions for Quiz
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
  {
    question: "What is 7+10?",
    answers: [
      { text: "17", correct: true },
      { text: "5", correct: false },
      { text: "7", correct: false },
      { text: "55", correct: false },
    ],
  },
];

// Event listeners for startBtn
startBtn.addEventListener("click", startQuiz);
startBtn.addEventListener("click", startTimer);

// Event listener for Highscores

// Timer is started when startBtn is clicked
function startTimer() {
  if (!quizDone) {
    timerInterval = setInterval(function () {
      timerStart--;
      timer.textContent = "Timer: " + timerStart;

      if (
        timerStart === 0 &&
        confirm("Out of time! Would you like to try again?") === true
      ) {
        clearInterval(timerInterval);
        location.reload("./quiz.html");
      }
    }, 1000);
  }
}

// Quiz is started when startBtn is clicked
function startQuiz() {
  startBtn.classList.add("hide");
  // Questions are randomly chosen
  randomQues = questions.sort(function () {
    Math.random() - 0.5;
  });
  currentQuestionIndex = 0;
  quizDescript.classList.add("hide");
  questionContEl.classList.remove("hide");

  nextQuestion();
}

// The next question is displayed from the current random question index
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

function selectedAns(event) {
  let selectedAns = event.target;
  let rightAns = selectedAns.dataset.correct;
  if (!rightAns) {
    timerStart = timerStart - 10;
  }

  console.log(answerBtnEl.children);
  Array.from(answerBtnEl.children).forEach(function (button) {
    btnClass(button, button.dataset.correct);
  });

  if (randomQues.length > currentQuestionIndex + 1) {
    currentQuestionIndex++;
    setTimeout(() => {
      nextQuestion();
    }, 800);
  } else if (
    confirm("Game over! Would you like to record your score?") === true
  ) {
    scoreForm.classList.remove("hide");
    questionContEl.classList.add("hide");
    clearInterval(timerInterval);

    submitBtn.addEventListener("click", function (event) {
      event.preventDefault();
      highScoreEl.classList.remove("hide");
      scoreForm.classList.add("hide");

      let finalScore = {
        user: userScore.value.trim(),
        score: timerStart,
      };

      if (finalScore === "") {
        alert("You must enter a name!");
      }

      let scoreArray = localStorage.getItem("finalScore")
        ? JSON.parse(localStorage.getItem("finalScore"))
        : [];
      scoreArray.push(finalScore);
      localStorage.setItem("finalScore", JSON.stringify(scoreArray));

      let showScores = JSON.parse(localStorage.getItem("finalScore"));
      let highScoreListMaker = function (scoreArray) {
        let li = document.createElement("li");
        li.textContent = scoreArray.user + ":  " + scoreArray.score;
        highscoreListEl.appendChild(li);
      };

      showScores.forEach((scoreArray) => {
        highScoreListMaker(scoreArray);
      });
      let restartQuizBtn = document.createElement("button");
      highScoreEl.appendChild(restartQuizBtn);
      restartQuizBtn.textContent = "Restart Quiz";
      restartQuizBtn.addEventListener("click", function () {
        location.reload("./quiz.html");
      });
    });
  }
}

highScoreLink.addEventListener("click", () => {
  highScoreEl.classList.remove("hide");
  startBtn.classList.add("hide");
  quizDescript.classList.add("hide");
  questionContEl.classList.add("hide");
  answerBtnEl.classList.add("hide");

  clearInterval(timerInterval);
  let scoreArray = localStorage.getItem("finalScore")
    ? JSON.parse(localStorage.getItem("finalScore"))
    : [];
  let showScores = JSON.parse(localStorage.getItem("finalScore"));
  let highScoreListMaker = function (scoreArray) {
    let li = document.createElement("li");
    li.textContent = scoreArray.user + ":  " + scoreArray.score;
    highscoreListEl.appendChild(li);
  };

  showScores.forEach((scoreArray) => {
    highScoreListMaker(scoreArray);
  });
  let returnToQuizBtn = document.createElement("button");
  highScoreEl.appendChild(returnToQuizBtn);
  returnToQuizBtn.textContent = "Return to Quiz";
  returnToQuizBtn.addEventListener("click", function () {
    location.reload("./quiz.html");
  });
});

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
