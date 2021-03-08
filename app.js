"use strict"

const squares = Array.from($(".game-light"));
const startButton = $(".game-start-button")
const currentScoreDisplay = $(".level-info")
const bestScoreDisplay = $(".score-info")

const startingLevel = 3;
let levelIncrease = 0;
let playedSequence = [];
let userEnteredSequence = [];
let currentLevel = startingLevel + levelIncrease;
let bestScore = JSON.parse(localStorage.getItem("simon-score"))
let actualLevel = currentLevel - startingLevel
let gameInProgress = false;

let initialScoreDispaly = () => {
    if (bestScore != null) {
        bestScoreDisplay.text(bestScore)
    }
}
initialScoreDispaly()

$(".game-light").on("click", (e) => { // adds an event listener to all the game lights/squares
    if (gameInProgress) {
        lightClicked(e.target);
        userEnteredSequence.push(e.target.id)
        checkMatches()
    }
})

let checkMatches = () => {
    for (let i = 0; i < userEnteredSequence.length; i++) {
        if (userEnteredSequence[i] != playedSequence[i]) {
            gameEnd()
        } else if (i + 1 === playedSequence.length) {
            levelIncrease++
            currentLevel = startingLevel + levelIncrease
            updateLevelDisplay()
            setTimeout(activateNext, 1000)
        }
    }
}

startButton.on("click", () => {
    gameStart();
});

let gameStart = () => {
    startButton.prop("disabled", true)
    startingSequence()
    gameInProgress = true
}

let gameEnd = () => {
    resetVariables()
    startButton.prop("disabled", false)   
    window.alert(`You done messed up!`)
    gameInProgress = false
}

let resetVariables = () => {
    playedSequence = [];
    userEnteredSequence = [];
    levelIncrease = 0;
}

let startingSequence = () => {
    activateNext();
    setTimeout( activateNext , 1000 );
    setTimeout( activateNext , 2000 );
};

let activateNext = () => {
    userEnteredSequence = [];
    let nextRandom = Math.floor(Math.random() * 4); // 4 <=> number of squares in the Simon game
    playedSequence.push(nextRandom);
    activateLight(squares[nextRandom]);
    // add repetition prevention later?
};

let activateLight = (target) => {
    target.animate( {
        opacity: 1
    }, 800 );
};

let lightClicked = (target) => {
    target.animate( {
        opacity: 1
    }, 400 );
};

let updateLevelDisplay = () => {
    actualLevel = currentLevel - startingLevel
    currentScoreDisplay.text( actualLevel )
    updateBestScore()
}

let updateBestScore = () => {
    if (actualLevel > bestScore) {
        bestScoreDisplay.text(actualLevel)
        JSON.stringify(localStorage.setItem("simon-score", actualLevel))
    }
}