//--------------------------------------------------------------------------------------------------------------------

// initialize section div variables
var headingDiv = document.querySelector(".headingDiv");
var startPageDiv = document.querySelector(".startPageDiv");
var questionDiv = document.querySelector(".questionDiv");
var endPageDiv = document.querySelector(".endPageDiv");
var highscoresDiv = document.querySelector(".highscoresDiv");

// initialize button variables
var btnStartQuiz = document.querySelector(".btnStartQuiz");
var btnNextQuestion = document.querySelector(".btnNext");
var btnFinishQuiz = document.querySelector(".btnFinishQuiz");
var btnSubmit = document.querySelector(".btnSubmit");
var btnRestart = document.querySelector(".btnRestart");
var btnClear = document.querySelector(".btnClear");

// initialize question page elements
var questionTitle = document.querySelector("#questionTitle");
var questionPrompt = document.querySelector("#questionPrompt");
var choicesDiv = document.querySelector("#choicesDiv");
var buttonDiv = document.querySelector("#buttonDiv");

// initialize end page elements
var initialsForm = document.querySelector("#initialsForm");
var initialsInput = document.querySelector("#initialsInput");

// initializes highscores page elements
var highscoresList = document.querySelector("#highscoresList");

// initializes the quiz timer
var timer = document.querySelector("#timer");
var startTime = 60;
var timerValue;

// initializes the progress bar variables
var progressBar = document.querySelector(".progress-bar");
var currentProgress = 0;

// initializes user score elements
var userScore = document.querySelector("#userScore");
var score = 0;

// initialize questions array index
var currentQuestionIndex = 0;

//--------------------------------------------------------------------------------------------------------------------

function startTimer() {
    // ???
}

function stopTimer() {
    // ???
}

function subtractTimer() {
    // ???
}

function toggleShowElement(element) {
    if (element.getAttribute("style") === "display: none;") element.removeAttribute("style");
    else element.setAttribute("style", "display: none;");
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
    questionTitle.textContent = currentQuestion.title;

    // takes the question value from the current question object and sets the question text to its value
    questionPrompt.textContent = currentQuestion.question;

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
        nextButtonEl.setAttribute("class", "btn btn-primary w-25 btnNext");
        nextButtonEl.setAttribute("type", "button");
        nextButtonEl.textContent = "Next Question";
        buttonDiv.appendChild(nextButtonEl);
    }
    else {
        // create finish quiz button
        var finishQuizButtonEl = document.createElement("button");
        finishQuizButtonEl.setAttribute("class", "btn btn-primary w-25 btnFinishQuiz");
        finishQuizButtonEl.setAttribute("type", "button");
        finishQuizButtonEl.textContent = "Finish Quiz";
        buttonDiv.appendChild(finishQuizButtonEl);
    }
}

function clearQuestionDiv() {
    questionTitle.innerHTML = "";
    questionPrompt.innerHTML = "";
    choicesDiv.innerHTML = "";
    buttonDiv.innerHTML = "";
}

// function submitInitials(event) {
//     // prevent page refresh
//     event.preventDefault();
//     // get userInitials from form input
//     var userInitials = initialsInput.value.trim();
//     // add initials and score to highscoresList
//     var highscoresLi = document.createElement("li");
//     highscoresLi.textContent = `${userInitials}-${score}`;
//     highscoresList.appendChild(highscoresLi);
//     // hide end page
//     toggleShowElement(endPageDiv);
//     // hide heading div
//     toggleShowElement(headingDiv);
//     // show highscores page
//     toggleShowElement(highscoresDiv);
// }

// initialsForm.addEventListener("submit", submitInitials(event));

// btnSubmit.addEventListener("click", submitInitials(event));

//--------------------------------------------------------------------------------------------------------------------

btnClear.addEventListener("click", function () {
    // clear highscores from highscores page
    highscoresList.innerHTML = "";

    // clear highscores from the localStorage
    // ???
});

btnRestart.addEventListener("click", function () {
    // reset user score
    score = 0;

    // reset timer
    startTime = 60;
    timer.textContent = `Timer: ${startTime}s`;

    // reset currentQuestionIndex
    currentQuestionIndex = 0;

    // reset progress bar
    resetProgress();

    // hide highscores page
    toggleShowElement(highscoresDiv);

    // show heading div
    toggleShowElement(headingDiv);

    // show start page
    toggleShowElement(startPageDiv);
});

btnSubmit.addEventListener("click", function (event) {
    // prevent page refresh
    event.preventDefault();

    // get userInitials from form input
    var userInitials = initialsInput.value.trim();

    // assures that the input is not blank
    if (userInitials === "") {
        alert("Initials cannot be blank");
        return;
    }

    // add initials and score to highscoresList
    var highscoresLi = document.createElement("li");
    highscoresLi.textContent = `${userInitials} - ${score}`;
    highscoresList.appendChild(highscoresLi);

    // clear the userInitals input
    initialsInput.value = "";

    // hide end page
    toggleShowElement(endPageDiv);

    // hide heading div
    toggleShowElement(headingDiv);

    // show highscores page
    toggleShowElement(highscoresDiv);
});

questionDiv.addEventListener("click", function () {

    if (event.target && event.target.matches("button.btnNext")) {
        // calculate score
        // ???

        // clear question div elements
        clearQuestionDiv();

        // update currentQuestionIndex
        currentQuestionIndex++;

        // load the next question
        loadQuestion();

        // update progressBar
        updateProgress();
    }

    if (event.target && event.target.matches("button.btnFinishQuiz")) {
        // calculate score
        userScore.textContent = `Your score is: ${score}`;

        // clear question div elements
        clearQuestionDiv();

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
// upon submit button clicked, append the initals and score to the highscores list and store them in localStorage
// hide endPage

// show highscoresPage
// show all highscores with initials
// upon clearHighscores button clicked, clear all highscores from the page and from localStorage

// upon restartQuiz button clicked, reset score, reset timer, reset currentQuestionIndex, reset progressBar
// hide highscoresPage
// show startPage


// TO DO:
// - add startTimer and stopTimer functionality
// - add subtractTimer functionality
// - center ordered list on highscores page
// - add choice button click functionality
// - add score calculation functionality
// - add btnRestart functionality
// - add btnClear functionality
// - add View Highscores link functionality