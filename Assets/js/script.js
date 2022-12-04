//leftover debugging:
//      fix the event bubbling for the answer bank
//      fix the weirdness with the high scores, it needs to self initialize
//      no sorting of hi-scores
//      starting doesn't clear the initial submit
//formatting to fix:
//      all boxes on the main page, fixed sizes?
//      sizing of the high-score boxes




// list of global dom variables
let startButton = document.querySelector("#start-button");
let timeRemaining = document.querySelector("#time");
let scoreRecord = document.querySelector("#score-container");
let object = document.querySelector("#object");
var mainEl = document.querySelector('#main');
var answerBank = document.querySelector("#answer-bank");
let h4El = document.createElement("h4");
let inputEl = document.createElement("input");
let initialSubmitEl = document.createElement("button");
// question bank arranged as an array within an array, the correct answers are indicated with an @ symbol
let questionBank = [
    ["Which of the following key words is used to define a variable in Javascript?", "var", "letVar", "const", "@Both a and c"],
    ["Which of the following methods would display an alert via a pop-up window?", "document.display", "@window.alert", "console.log", "var.textContent"],
    ["Which is the correct method for turning a string into an array?",".arrayify()","@.split()",".array()",".open()"],
    ["What methods can be used to target an element via the DOM tree?",".querySelector()",".getElementById()","getElementsByClass()","@All of the above"],
    ["Which of the following logical expressions would result in a true result?","1===one","'1'===1","@1=='1'","Both a and c"]
]
// list of various variables that need to be called globally accross multiple functions
let secondsRemaining = 0;
let correctAnswerCount = 0;
let incorrectAnswerCount = 0;
let timerInterval = "";
let questionBankProgress = 0;
let hiScoreList = [];
let scoreObjectArray = [];
let playerInitials = "";

// initialize function selects the question from the questionBank array, then creates elements through manipulation of the dom tree, the check function and addAnswerClass are called within this function, as described below
function initialize() {
    question = questionBank[questionBankProgress];
    questionBankProgress = questionBankProgress + 1;
    if (questionBankProgress > questionBank.length) {
        gameOver();
    }
    object.textContent = question[0];
    buttonA = document.createElement("button");
    buttonB = document.createElement("button");
    buttonC = document.createElement("button");
    buttonD = document.createElement("button");
    buttonA.textContent = "A. " + check(1);
    buttonB.textContent = "B. " + check(2);
    buttonC.textContent = "C. " + check(3);
    buttonD.textContent = "D. " + check(4);
    answerBank.appendChild(buttonA);
    answerBank.appendChild(buttonB);
    answerBank.appendChild(buttonC);
    answerBank.appendChild(buttonD);
    console.log(questionBankProgress);
    addAnswerClass();
}

// the check function checks if the answer associated with each of the possible answers includes the @ symbol, and returns an answer to be displayed without the @ symbol indicating the correct answer
function check(x) {
    if (question[x].includes("@")) {
        let rawAnswer = question[x]
        let replacedAnswer = rawAnswer.replace("@", "");
        let answer = replacedAnswer;
        return answer;
    } else {
        let falseAnswer = question[x]
        return falseAnswer;
    }}

// addAnswerClass adds an .answer class to the button element that contains the correct answer
function addAnswerClass() {
    for (let i = 1; i < 5; i++) {
        if (question[i].includes("@")) {
            if (i === 1) {
                return buttonA.setAttribute("class", "answer");
            } else if (i === 2) {
                return buttonB.setAttribute("class", "answer");
            } else if (i === 3) {
                return buttonC.setAttribute("class", "answer");
            } else {
                return buttonD.setAttribute("class", "answer")
            }
        } else {
            continue
        }}}

// the coundown function is a timer for the overall game that has its elements called globally so that the interval can be called and cleared elsewear and with a flexible interval length
function countDown(x) {
    timerInterval = setInterval(function () {
        x--;
        secondsRemaining = x;
        if (x > 1) {
            timeRemaining.textContent = x + " seconds remaining";
        } else if (x === 1) {
            timeRemaining.textContent = x + " second remaining";
        } else if (x <= 0) {
            clearAnswerBank();
            gameOver();
        }
    }, 1000)}

// the clearAnswerBank function removes all of the elements created in the initialize function and creating a blank slate for the next question
function clearAnswerBank() {
    buttonA.remove();
    buttonB.remove();
    buttonC.remove();
    buttonD.remove();
    object.textContent = "";
}

// the countDownMini function is a smaller countdown timer that (as described later) gives the user the opportunity to see if their answer was correct or not with a color change. this function also executes the clearAnswerBank and initialize functions thus starting the next question.
function countDownMini(x) {
    var timerIntervalMini = setInterval(function () {
        x--;
        if (x === 0) {
            clearAnswerBank();
            initialize();
            answerEventListener();
            clearInterval(timerIntervalMini);
        }}, 500)}

// the gameover function clears the timer interval from the countDown function and clears the main box with the clearAnswerBank function before creating an input with a submit button and directions to collect the user's score
function gameOver() {
    clearInterval(timerInterval);
    clearAnswerBank();
    inputEl.setAttribute("type","text");
    inputEl.setAttribute("placeholder","your initials here");
    inputEl.setAttribute("id","initials-input");
    initialSubmitEl.textContent = "Submit"
    h4El.textContent = "Game Over - Please Enter Your Initials to Save Your Score";
    mainEl.appendChild(h4El);
    mainEl.appendChild(inputEl);
    mainEl.appendChild(initialSubmitEl);
    timeRemaining.textContent = "Game Over";
}

// saveScore first checks that the user entered their initials only, and then changes them to upper-case for consistencies sake and creates an array including the players win percentage and their entered initials (saved to the variable playerInitials in the event listiner for the submit button) and is stored locally. additional high scores are appended to the array as they're entered. after submission, the clearGameOver function is executed to provide a clear-slate for the user initials input.
function saveScore() {
    if (playerInitials.length > 3 || playerInitials.length === 0) {
        window.alert("Please Enter Only Your Initials (3 Character Max)");
        inputEl.value = ("");
    } else {
        playerInitials = playerInitials.toUpperCase();
        let totalAnswerCount = incorrectAnswerCount + correctAnswerCount;
        let scoreString = Math.round(((correctAnswerCount/totalAnswerCount)*100)) + "," + playerInitials;
        let scoreArray = scoreString.split(`,`);
        hiScoreList = JSON.parse(localStorage.getItem("High-Score-List"));
        if (hiScoreList === null) {
            hiScoreList = []
        }
        hiScoreList.push(scoreArray);
        localStorage.setItem("High-Score-List", JSON.stringify(hiScoreList));
        clearGameOver();
    }}

// the executeHiSchoresList function writes the high schores into the highschores box by using a for loop to pring the scores in that box using the locally created heading element
function executeHiScoreList() {
    hiScoreList = JSON.parse(localStorage.getItem("High-Score-List"));
    hiScoreList = hiScoreList.sort();
    if (hiScoreList !== null){
    for (let i = 0; i < 5; i++) {
        var score = document.createElement("h6");
        score.textContent = (i+1) + ". " + hiScoreList[i][0] + "% - " + hiScoreList[i][1];
        scoreRecord.appendChild(score);
        }}}

// the clearGameOver function provides a wrap up message for the user after they've submitted their initials
function clearGameOver () {
    inputEl.remove();
    h4El.textContent = "Thanks for Playing. Press 'Start' to play again"
    initialSubmitEl.remove();
}

// the correctAnswer function adds together the user's correct answers throughout the game, it has a the countDownMini function in place to allow the user to briefly see their selected correct answer turn green before clearing the answer bank and initializing a new question
function correctAnswer() {
    correctAnswerCount++;
    countDownMini(2);
}

//the incorrectAnswer function first turns the correct answer green so the user gets the feedback that their answer was wrong, and it tabulates the user's incorrect answers. the timer interval from countDown is then cleared in order to manipulate the time remaining. if a wrong answer is selected, 5 seconds is subtracted from the clock and then the timer is re-initialized at the new time. the countDownMini function creates a brief pause so the user can see the correct answer, before clearing the answer bank and initializing a new question. if the timer is less than 5 seconds remaining and a wrong answer is selected, then the answer bank is immediately cleared using clearAnswerBank and the gameOver function is executed
function incorrectAnswer() {
    answerEl = document.querySelector(".answer");
    answerEl.setAttribute("class", "correct answer");
    incorrectAnswerCount++;
    clearInterval(timerInterval);
    if (secondsRemaining > 5) {
        countDown(secondsRemaining - 5);
        countDownMini(2);
    } else {
        clearAnswerBank();
        gameOver();
    }}

// this is an event listener for the start button looking for a click, and initializing the game with a total time of 60 seconds available. the timer box is reset at the beggining of the local function so another game can be initialized after completing the first. the start button is hidden during the game in order to keep the user from clicking on it during the game
startButton.addEventListener("click", function () {
    startButton.hidden = true;
    timeRemaining.textContent = "";
    countDown(60);
    initialize();
    answerEventListener();
})

// this is an event listener for the div element containing the answers, and using event bubbling it notes the selected answer and checks for the presence of the "answer" class as assigned in the addAnswerClass function. if the correct answer was selected, the class .correct is added in order to turn the button green the the correctAnswer function is initialized. if the incorrect answer was selected then a .incorrect class is added to turn the button red and the incorretAnswer function is executed
function answerEventListener() {answerBank.addEventListener("click", function answerSelect(event) {
    let selectedAnswer = event.target;
    if (selectedAnswer.classList.contains("answer") && (!selectedAnswer.classList.contains("answer-bank"))) {
        selectedAnswer.setAttribute("class", "correct answer");
        correctAnswer();
    } else if (!selectedAnswer.classList.contains("answer") && (!selectedAnswer.classList.contains("answer-bank"))){
        selectedAnswer.setAttribute("class", "incorrect");
        incorrectAnswer();
    }
},AbortSignal.abort())}

// this is the event listener for the submission of user scores and initials and initializes the savescore function upon clicking
initialSubmitEl.addEventListener("click", function(event) {
    playerInitials = inputEl.value;
    startButton.hidden = false;
    saveScore();
})

// the executeHiScoreList function is called upon initialization of the page to ensure the high-scores box is filled
executeHiScoreList();