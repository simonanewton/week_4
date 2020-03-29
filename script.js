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

// initialize heading elements
var scoreTracker = document.querySelector("#score");
var viewHighscores = document.querySelector("#viewHighscores");
var timer = document.querySelector("#timer");

// initialize question page elements
var questionTitle = document.querySelector("#questionTitle");
var questionPrompt = document.querySelector("#questionPrompt");
var choicesDiv = document.querySelector("#choicesDiv");
var buttonDiv = document.querySelector("#buttonDiv");
var choiceButtons;

// initialize end page elements
var initialsForm = document.querySelector("#initialsForm");
var initialsInput = document.querySelector("#initialsInput");

// initialize highscores page elements
var highscoresList = document.querySelector("#highscoresList");
var currentHighscores = [];

// initialize the timer variables
var startTime = 60;
var timerVal;

// initialize the progress bar variables
var progressBar = document.querySelector(".progress-bar");
var currentProgress = 0;

// initialize user score elements
var userScore = document.querySelector("#userScore");
var score = 0;

// initialize questions array index
var currentQuestionIndex = 0;
// var currentQuestion = questions[currentQuestionIndex];
var currentQuestion;

//--------------------------------------------------------------------------------------------------------------------

function startTimer() {
    timerVal = setInterval(function () {
        // if timer is not done, decrement the startTime and update the displayed timer
        if (startTime > 0) {
            startTime--;
            timer.textContent = `Timer: ${startTime}s`;
        }
        // else, timer is done
        else timerDone();
    }, 1000);
}

function stopTimer() {
    // clears the interval for the timerVal variable
    clearInterval(timerVal);
}

function subtractTimer() {
    // decrement the timer by 10 seconds
    startTime -= 10;
}

function toggleShowElement(element) {
    // if the element is hidden, show it, else, hide it
    if (element.getAttribute("style") === "display: none;") element.removeAttribute("style");
    else element.setAttribute("style", "display: none;");
}

function updateProgress() {
    // set interval proportionate to the number of questions
    var interval = 100 / questions.length;

    // if the progress bar isn't full yet, increase it by the interval amount
    if (currentProgress < 100) currentProgress += interval;

    // update the progress bar attributes
    progressBar.setAttribute("style", `width: ${currentProgress}%`);
    progressBar.setAttribute("aria-valuenow", currentProgress);
}

function resetProgress() {
    // reset the currentProgress value and update the progress bar attributes
    currentProgress = 0;
    progressBar.setAttribute("style", `width: ${currentProgress}%`);
    progressBar.setAttribute("aria-valuenow", currentProgress);
}

function getSelectedAnswer() {
    // for each choice button, determine if selected, if so, return the text content of that button
    for (let i = 0; i < choiceButtons.length; i++) {
        if (choiceButtons[i].getAttribute("selected") === "true") {
            return choiceButtons[i].textContent;
        }
    }
}

function evaluateAnswer() {
    // return whether the user selection matches the question's answer
    return (getSelectedAnswer() === currentQuestion.answer);
}

function updateScore() {
    // increment score by 10, update the score tracker
    score += 10;
    scoreTracker.textContent = `Score: ${score}`;
}

function deselectAll() {
    // for each of the choice buttons, deselect
    choiceButtons.forEach(button => {
        button.setAttribute("selected", "false");
        button.setAttribute("class", "btn btn-outline-primary rounded my-2 btnChoice");
    });
}

function toggleSelected(button) {
    // determine whether button has already been selected
    var isSelected = button.getAttribute("selected");

    // if so, unselect it
    if (isSelected === "true") {
        button.setAttribute("selected", "false");
        button.setAttribute("class", "btn btn-outline-primary rounded my-2 btnChoice");
    }

    // else, deselect all button and select the current one
    else if (isSelected === "false") {
        deselectAll();
        button.setAttribute("selected", "true");
        button.setAttribute("class", "btn btn-primary rounded my-2 btnChoice");
    }
}

function loadQuestion() {
    // gets the current question object from the questions array
    currentQuestion = questions[currentQuestionIndex];

    // set the title and prompt equal to the current questions values
    questionTitle.textContent = currentQuestion.title;
    questionPrompt.textContent = currentQuestion.question;

    currentQuestion.choices.forEach(choice => {
        // create and set attributes for each choice button
        var choiceEl = document.createElement("button");
        choiceEl.setAttribute("class", "btn btn-outline-primary rounded my-2 btnChoice");
        choiceEl.setAttribute("type", "button");
        choiceEl.setAttribute("selected", "false");

        // add click functionality to the choice button
        // choiceEl.onclick = toggleSelected();

        // set the choice button text content
        choiceEl.textContent = choice;

        // display the choice element
        choicesDiv.appendChild(choiceEl);
    });

    // creates an array of the created buttons
    choiceButtons = document.querySelectorAll(".btnChoice");

    if (currentQuestionIndex < (questions.length - 1)) {
        // create next question button and add it to the page
        var nextButtonEl = document.createElement("button");
        nextButtonEl.setAttribute("class", "btn btn-primary w-25 btnNext");
        nextButtonEl.setAttribute("type", "button");
        nextButtonEl.textContent = "Next Question";
        buttonDiv.appendChild(nextButtonEl);
    }
    else {
        // create finish quiz button and add it to the page
        var finishQuizButtonEl = document.createElement("button");
        finishQuizButtonEl.setAttribute("class", "btn btn-primary w-25 btnFinishQuiz");
        finishQuizButtonEl.setAttribute("type", "button");
        finishQuizButtonEl.textContent = "Finish Quiz";
        buttonDiv.appendChild(finishQuizButtonEl);
    }
}

function clearQuestionDiv() {
    // set all the question div element values to an empty string
    questionTitle.innerHTML = "";
    questionPrompt.innerHTML = "";
    choicesDiv.innerHTML = "";
    buttonDiv.innerHTML = "";
}

function sortHighscores() {
    // sorts the score values of the currentHighscores array from highest to lowest
    currentHighscores.sort((a, b) => {
        var comparison = 0;
        if (a.score > b.score) comparison = -1;
        if (a.score < b.score) comparison = 1;
        return comparison;
    });

    // trims the length of the currentHighscores if greater than maxLength
    var maxLength = 5;
    if (currentHighscores.length > maxLength) currentHighscores.length = maxLength;
}

function loadStoredUsers() {
    // create variable for the stored highscores
    var storedHighscores = JSON.parse(localStorage.getItem("highscores"));

    // if the stored highscores array is not empty, concatenate the current highscores array with it
    if (storedHighscores != null) currentHighscores = currentHighscores.concat(storedHighscores);

    // add the array of all highscores to the localStorage
    localStorage.setItem("highscores", JSON.stringify(currentHighscores));

    // sort the array of highscores
    sortHighscores();

    // clear the highscoresList
    highscoresList.innerHTML = "";

    // load the currentHighscores array into the highscores list
    currentHighscores.forEach(user => {
        var highscoresLi = document.createElement("li");
        highscoresLi.setAttribute("class", "border border-dark my-3");
        highscoresLi.textContent = `${user.initials} - ${user.score}`;
        highscoresList.appendChild(highscoresLi);
    });
}

function timerDone() {
    // stop the timer
    stopTimer();

    // calculate score
    userScore.textContent = `Your score is: ${score}`;

    // clear question div elements
    clearQuestionDiv();

    // hide the question div
    toggleShowElement(questionDiv);

    // show the end page div
    toggleShowElement(endPageDiv);
}

//--------------------------------------------------------------------------------------------------------------------

btnClear.addEventListener("click", function () {
    // clear highscores from highscores page
    highscoresList.innerHTML = "";

    // clear highscores from the localStorage
    localStorage.clear();
});

btnRestart.addEventListener("click", function () {
    // reset stored highscores array
    currentHighscores = [];

    // reset timer
    startTime = 60;
    timer.textContent = `Timer: ${startTime}s`;

    // reset user score
    score = 0;
    scoreTracker.textContent = `Score: ${score}`;

    // reset currentQuestionIndex
    currentQuestionIndex = 0;

    // reset progress bar
    resetProgress();

    // hide highscores page
    toggleShowElement(highscoresDiv);

    // reset and show heading div
    toggleShowElement(viewHighscores);
    toggleShowElement(scoreTracker);
    toggleShowElement(headingDiv);

    // show start page
    toggleShowElement(startPageDiv);
});

btnSubmit.addEventListener("click", function (event) {
    // prevent page refresh
    event.preventDefault();

    // get userInitials from form input and trims whitespace
    var userInitials = initialsInput.value.trim();

    // return if the initials input is blank
    if (userInitials === "") return alert("Initials cannot be blank");

    // create object for user data
    var userData = {
        initials: userInitials,
        score: score
    };

    // add the current user to the list of stored users
    currentHighscores.push(userData);

    // load stored users to the highscores list
    loadStoredUsers();

    // hide end page
    toggleShowElement(endPageDiv);

    // hide heading div
    toggleShowElement(headingDiv);

    // show highscores page
    toggleShowElement(highscoresDiv);
});

questionDiv.addEventListener("click", function () {

    // checks if the next question button exists yet
    if (event.target && event.target.matches("button.btnNext")) {
        // evaluate score then update score or timer
        var isCorrect = evaluateAnswer();
        if (isCorrect) updateScore();
        else subtractTimer();

        // clear question div elements
        clearQuestionDiv();

        // update currentQuestionIndex
        currentQuestionIndex++;

        // load the next question
        loadQuestion();

        // update progressBar
        updateProgress();
    }

    // checks if the finish quiz button exists yet
    if (event.target && event.target.matches("button.btnFinishQuiz")) {
        // stop the timer
        stopTimer();

        // evaluate score then update score or timer
        var isCorrect = evaluateAnswer();
        if (isCorrect) updateScore();
        else subtractTimer();

        // update userScore with the calculated score
        userScore.textContent = `Your score is: ${score}`;

        // clear question div elements
        clearQuestionDiv();

        // hide the question div
        toggleShowElement(questionDiv);

        // show the end page div
        toggleShowElement(endPageDiv);
    }
});

choicesDiv.addEventListener("click", function (event) {
    if (event.target && event.target.matches("button")) {
        // initialize which button has been clicked
        var buttonClicked = event.target;

        // toggle the selected button
        toggleSelected(buttonClicked);
    }
})

viewHighscores.addEventListener("click", function () {
    // hide heading elements
    toggleShowElement(viewHighscores);
    toggleShowElement(scoreTracker);
    toggleShowElement(headingDiv);

    // hide the start page
    toggleShowElement(startPageDiv);

    // load stored users
    loadStoredUsers();

    // show the highscores page
    toggleShowElement(highscoresDiv);
});

btnStartQuiz.addEventListener("click", function () {
    // start timer
    startTimer();

    // hide the view highscores button, show the score tracker
    toggleShowElement(viewHighscores);
    toggleShowElement(scoreTracker);

    // hides the start page
    toggleShowElement(startPageDiv);

    // load the first question
    loadQuestion();

    // show the first question
    toggleShowElement(questionDiv);

    // update the progress bar
    updateProgress();
});