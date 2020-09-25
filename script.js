var question = document.getElementById("question");
var choices = document.getElementById("choices");
var RightorWrong = document.getElementById("RorW");
var timer = document.getElementById("timer");
var startBtn = document.createElement("button");
var timerStart = parseInt(76);
var timerInterval;

startBtn.textContent = "Start Quiz";
document.getElementById("RorW").appendChild(startBtn);

var ol = document.createElement("ol");
var liEl1 = document.createElement("li");
var liEl2 = document.createElement("li");
var liEl3 = document.createElement("li");
var liEl4 = document.createElement("li");

// 1. Start button is clicked and the timer starts
startBtn.addEventListener("click", startTimer);
startBtn.addEventListener("click");
function startTimer() {
  timerInterval = setInterval(function () {
    timerStart--;
    timer.textContent = "Timer: " + timerStart;

    if (timerInterval === 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

// 2. First question is loaded onto the screen

//     a. Answer is selected for first question
//     b. If the answer is correct the timer stays the same. "Right" is displayed to user
//     c. If the answer is wrong 10 seconds is subtracted from the timer. "Wrong" is displayed
// 3. Second question is loaded on the screen
//     a. Answer is selected for first question
//     b. If the answer is correct the timer stays the same. "Right" is displayed to user
//     c. If the answer is wrong 10 seconds is subtracted from the timer. "Wrong" is displayed
// 2. Third question is loaded onto the screen
//     a. Answer is selected for first question
//     b. If the answer is correct the timer stays the same. "Right" is displayed to user
//     c. If the answer is wrong 10 seconds is subtracted from the timer. "Wrong" is displayed
// 3. Fourth question is loaded on the screen
//     a. Answer is selected for first question
//     b. If the answer is correct the timer stays the same. "Right" is displayed to user
//     c. If the answer is wrong 10 seconds is subtracted from the timer. "Wrong" is displayed
// 4. If the timer runs out the quiz ends and a "Want to try again?" message is displayed
//     a. The user is taken back to restart the quiz.
// 5. If the user finishes they are prompted to record their high score.
//     a. The user inputs their name and presses submit
//     b. The user is taken to the highscore.html page
//     c. The score is listed and saved
