// initializes button variables
var btnStart = document.querySelector(".btnStart");
var btnNext = document.querySelector(".btnNext");
var btnSubmit = document.querySelector(".btnSubmit");
var btnStartOver = document.querySelector(".btnRestart");
var btnClearScores = document.querySelector(".btnClearScores");

// variables for each page div section
var startDiv = document.querySelector(".startPage");
var questionOneDiv = document.querySelector(".questionOne");
var questionTwoDiv = document.querySelector(".questionTwo");
var questionThreeDiv = document.querySelector(".questionThree");
var endDiv = document.querySelector(".endPage");
var highscoresDiv = document.querySelector(".highscores");

// initializes the quiz timer
var timer = document.querySelector(".timer");

// initializes the progress bar variables
var progressBar = document.querySelector(".progress-bar");
var currentProgress = 0;

// initializes user score
var score = 0;

//---------------------------------------------------------------

// starts the quiz timer
function startTimer() {
    var startTime = 60;
    setInterval(function () {
        if (startTime > 0) startTime--;
        timer.textContent = "Timer: " + startTime + "s";
    }, 1000);
    //Place the question grabbing function 
    //questionGrab()
}

// resets the value of the progress bar
function resetProgress() {
    currentProgress = 0;
    progressBar.setAttribute("style", "width: " + currentProgress + "%");
    progressBar.setAttribute("aria-valuenow", currentProgress);
}

// updates the value of the progress bar
function updateProgress() {
    var interval = 20;
    if (currentProgress < 100) currentProgress += interval;
    progressBar.setAttribute("style", "width: " + currentProgress + "%");
    progressBar.setAttribute("aria-valuenow", currentProgress);
}

// toggles the visibility of a given element
function toggleShowDiv(div) {
    if (div.style.display === "none") div.style.display = "block";
    else if (div.style.display === "block") div.style.display = "none";
}

// adds start button functionality
btnStart.addEventListener("click", function () {
    // start timer
    startTimer();

    // update progress bar
    updateProgress();

    // retrieve and display questions
    getQuestions();

    // hide start page
    toggleShowDiv(startDiv);

    // show first question
    toggleShowDiv(questionOneDiv);
});

//---------------------------------------------------------------

// // adds next button functionality
// btnNext.addEventListener("click", function() {

//     // hide current question

//     // update progress bar

//     // if not last question, show next question

//     // else if last question, show end page
// });

// // adds submit button functionality
// btnSubmit.addEventListener("click", function() {
//     // create variable for initals

//     // save initials and score to localStorage

//     // show highscores page
// });

// // adds start over button functionality
// btnStartOver.addEventListener("click", function() {
//     // hide highscores page

//     // show start page
// });

// // adds clear scores button functionality
// btnClearScores.addEventListener("click", function() {
//     // clear all scores from highscores list
// });

//-----------------------------------------------


// TO DO:
// add toggleShowDiv functionality
// add stopTimer functionality, stop the timer if all questions have been answered
// set next button as disabled until an answer has been chose for that question
// add updateProgress functionality








function getQuestions() {
    // initialize question array index
    var currentQuestionIndex = 0;

    // gets the current question object from the questions array
    var currentQuestion = questions[currentQuestionIndex];

    // takes the title value from the current question object and sets the question title to its value
    var questionTitle = document.getElementById("title");
    questionTitle.textContent = currentQuestion.title;
    
    // takes the question value from the current question object and sets the question text to its value
    var questionText = document.getElementById("question");
    questionText.textContent = currentQuestion.question;

    // iterate through question choices and display them
    currentQuestion.choices.forEach(choice => {
        // ???
    });
}


// const currentQuestionIndex = //stands for the index of the question on the page 
// function getQuestion() {
//     // get current question object from array
//     var currentQuestion = questions[currentQuestionIndex];
  
//     // update title with current question
//     var titleEl = document.getElementById("title");
//     titleEl.textContent = currentQuestion.title;
  
//     // clear out any old question choices
//     choicesEl.innerHTML = "";
  
//     // loop over choices
//     currentQuestion.choices.forEach(function(choice, i) {
//       // create new button for each choice
//       var choiceNode = document.createElement("button");
//       choiceNode.setAttribute("class", "choice");
//       choiceNode.setAttribute("value", choice);
  
//       choiceNode.textContent = i + 1 + ". " + choice;
  
//       // attach click event listener to each choice
//       choiceNode.onclick = questionClick;
  
//       // display on the page
//       choicesEl.appendChild(choiceNode);
//     });
//   }