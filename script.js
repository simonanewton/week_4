//--------------------------------------------------------------------------------------------------------------------

// initialize button variables
var btnStartQuiz = document.querySelector(".btnStartQuiz");
var btnNextQuestion = document.querySelector(".btnNext");
var btnFinishQuiz = document.querySelector(".btnFinishQuiz");

// variable for section divs
var startPageDiv = document.querySelector(".startPageDiv");
var questionDiv = document.querySelector(".questionDiv");
var choicesDiv = document.querySelector(".choicesDiv");
var buttonDiv = document.querySelector(".buttonDiv");
var endPageDiv = document.querySelector(".endPageDiv");

// initializes the quiz timer
var timer = document.querySelector("#timer");

// initializes the progress bar variables
var progressBar = document.querySelector(".progress-bar");
var currentProgress = 0;

// initializes user score elements
var score = 0;
var userScore = document.querySelector("#userScore");

// initialize question array index
var currentQuestionIndex = 0;
// var lastQuestionIndex = questions.length;

//--------------------------------------------------------------------------------------------------------------------

function startTimer() {
    var startTime = 60;
    setInterval(function () {
        if (startTime > 0) startTime--;
        timer.textContent = "Timer: " + startTime + "s";
    }, 1000);
}

function toggleShowElement(div) {
    if (div.getAttribute("style") === "display: none;") div.removeAttribute("style");
    else div.setAttribute("style", "display: none;");
}

function updateProgress() {
    var interval = 25;
    if (currentProgress < 100) currentProgress += interval;
    progressBar.setAttribute("style", `width: ${currentProgress}%`);
    progressBar.setAttribute("aria-valuenow", currentProgress);
}

function resetProgress() {
    currentProgress = 0;
    progressBar.setAttribute("style", `width: ${currentProgress}%`);
    progressBar.setAttribute("aria-valuenow", currentProgress);
}

function loadQuestion() {
    // gets the current question object from the questions array
    var currentQuestion = questions[currentQuestionIndex];

    // takes the title value from the current question object and sets the question title to its value
    var questionTitle = document.getElementById("questionTitle");
    questionTitle.textContent = currentQuestion.title;

    // takes the question value from the current question object and sets the question text to its value
    var questionText = document.getElementById("questionPrompt");
    questionText.textContent = currentQuestion.question;

    // iterate through question choices and display them
    currentQuestion.choices.forEach(choice => {
        // create and set attributes for each choice button
        var choiceEl = document.createElement("button");
        choiceEl.setAttribute("class", "btn btn-outline-primary rounded my-2");
        choiceEl.setAttribute("type", "button");
        // choiceEl.setAttribute("choice", choice);

        // add click functionality to the choice button
        // ???

        // set the choice button text content
        choiceEl.textContent = choice;

        // display the choice element
        choicesDiv.appendChild(choiceEl);
    });

    if (currentQuestionIndex < (questions.length - 1)) {
        // create next button
        var nextButtonEl = document.createElement("button");
        nextButtonEl.setAttribute("class", "btn btn-primary w-25 rounded btnNext");
        nextButtonEl.setAttribute("type", "button");
        nextButtonEl.textContent = "Next Question";
        buttonDiv.appendChild(nextButtonEl);
    }
    else {
        // create finish quiz button
        var finishQuizButtonEl = document.createElement("button");
        finishQuizButtonEl.setAttribute("class", "btn btn-primary w-25 rounded btnFinishQuiz");
        finishQuizButtonEl.setAttribute("type", "button");
        finishQuizButtonEl.textContent = "Finish Quiz";
        buttonDiv.appendChild(finishQuizButtonEl);
    }
}

//--------------------------------------------------------------------------------------------------------------------

questionDiv.addEventListener("click", function () {

    if (event.target && event.target.matches("button.btnNext")) {
        // calculate score
        // ???
        
        // clear current question content
        choicesDiv.innerHTML = "";
        buttonDiv.innerHTML = "";

        // update currentQuestionIndex
        currentQuestionIndex++;
        // console.log(lastQuestionIndex);

        // load the next question
        loadQuestion();

        // update progressBar
        updateProgress();
    }

    if (event.target && event.target.matches("button.btnFinishQuiz")) {
        // calculate score
        userScore.textContent = `Your score is: ${score}`;

        // hide the question div
        toggleShowElement(questionDiv);

        // show the end page div
        toggleShowElement(endPageDiv);
    }

});

btnStartQuiz.addEventListener("click", function () {
    // start timer
    startTimer();

    // hides the start page
    toggleShowElement(startPageDiv);

    // load the first question
    loadQuestion();

    // show the first question
    toggleShowElement(questionDiv);

    // update the progress bar
    updateProgress();
});

//--------------------------------------------------------------------------------------------------------------------

// upon startQuiz button clicked, start timer
// hide startPage

// update progressBar
// show questionPage
// if not the last question, show nextButton
// upon nextButton clicked, get user choice, compare choice to answer value, modify score, modify timer
// hide current question
// show next question

// repeat until last question

// on last question, show finshQuiz button
// upon finishQuiz button clicked, stop timer, add timer to score

// show endPage, show score, show input for initials
// upon submit button clicked, store initals and score in localStorage
// hide endPage

// show highscoresPage
// show all highscores with initials
// upon clearHighscores button clicked, clear all highscores from localStorage

// upon restartQuiz button clicked, reset score, reset timer, reset currentQuestionIndex, reset progressBar
// hide highscoresPage
// show startPage