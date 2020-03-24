// initializes button variables
var btnStart = document.querySelector(".btnStart");
var btnNext = document.querySelector(".btnNext");
var btnSubmit = document.querySelector(".btnSubmit");
var btnStartOver = document.querySelector(".btnRestart");
var btnClearScores = document.querySelector(".btnClearScores");

// initializes the quiz timer
var timer = document.querySelector(".timer");

// elements on the starting page
var startText = document.querySelector(".startText");

// starts the quiz timer
function startTimer() {
    var startTime = 60;
    setInterval(function () {
        if (startTime > 0) startTime--;
        timer.textContent = "Timer: " + startTime + "s";
    }, 1000);
}

// adds start button functionality
btnStart.addEventListener("click", function (event) {
    // hide start button and start text
    btnStart.style.display = "none";
    startText.style.display = "none";

    // start timer
    startTimer();

    // show progress bar

    // show first question
});

// adds next button functionality
btnNext.addEventListener("click", function (event) {
    // hide current question

    // update progress bar

    // if not last question, show next question

    // else if last question, show end page
});

// adds submit button functionality
btnSubmit.addEventListener("click", function (event) {
    // create variable for initals

    // save initials and score to localStorage

    // show highscores page
});

// adds start over button functionality
btnStartOver.addEventListener("click", function (event) {
    // hide highscores page

    // show start page
});

// adds clear scores button functionality
btnClearScores.addEventListener("click", function (event) {
    // clear all scores from highscores list
});