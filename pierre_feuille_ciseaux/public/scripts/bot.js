//Variables for sections on the page
const game = document.querySelector("#game");
const winOrLose = document.querySelector("#winOrLose");

//Variables to show or not show part of the code
const winnerOrLoser = document.querySelector(".winnerOrLoser");
const matchResult = document.querySelector(".matchResult");

//Buttons
const restart = document.querySelector("#restart");

//score
const scoreDisplayed = document.querySelector(".actual-score");

//Circles inside game section
const gameCircles = document.querySelectorAll("#game .circle");

//Circle picked by player inside winOrLose
const playerPicked = document.querySelector(".picked-container figure");
const playerPickedImg = document.querySelector(".picked-container figure img");

//Circle picked by House
const housePicked = document.querySelector(".house-picked-container figure");
const housePickedImg = document.querySelector(".house-picked-container figure img");


//variables for the game
const choices = ["paper", "scissors", "rock"];
let picked = "";
let houseChoice = "";
let score = 0;


//store and modify depending on the picked one
function choiceModifier(subject, subjectImg, choosed) {
    //This sill set up the class of the subject to 0 and add circle and the value picked
    subject.classList = "";
    subject.classList.add("circle");
    subject.classList.add(choosed);

    //This will set the image
    subjectImg.src = "/images/icon-" + choosed + ".svg";
}

//This change only the display from the first choice page to the win or lose one
function callNewPage(currentPage, NextPage) {
    currentPage.style.display = "none";
    NextPage.style.display = "grid";
}

//Generate random house choice
function housePick() {
    houseChoice = choices[Math.floor(Math.random() * 3)];
    choiceModifier(housePicked, housePickedImg, houseChoice);
}

//Give the result of the game
function gameCalculator(playerChoice, computerChoice) {
    let result;
    if (playerChoice === computerChoice) { //fair always
        result = "Fair";
    } else if (  //All win possibilities
        (playerChoice === choices[0] && computerChoice === choices[2]) ||
        (playerChoice === choices[1] && computerChoice === choices[0]) ||
        (playerChoice === choices[2] && computerChoice === choices[1])
    ) {
        result = "You Win";
        playerPicked.classList.add("winner");
    } else { //if it is not fair and not win is Lose!
        result = "You Lose";
        housePicked.classList.add("winner");
    }
    getResult(result);
}

//Change the text of the result and give display
function getResult(result) {
    matchResult.textContent = result;
    winnerOrLoser.style.display = "grid";
    if (result === "You Win") {
        score += 1;
        scoreDisplayed.textContent = score;
    } else if (result === "You Lose") {
        score -= 1;
        if (score < 0) {
            score = 0;
        }
        scoreDisplayed.textContent = score;
    }
}

//Restart the game
function restartGame() {
    picked = "";
    houseChoice = "";
    winOrLose.style.display = "none";
    game.style.display = "flex";

}


//This is the full game
for (let i = 0; i < gameCircles.length; i++) {
    gameCircles[i].addEventListener("click", function () {
        for (let i = 0; i < this.classList.length; i++) {
            switch (this.classList[i]) {
                case choices[0]:
                    picked = choices[0];
                    break;
                case choices[1]:
                    picked = choices[1];
                    break;
                case choices[2]:
                    picked = choices[2];
                    break;
                default:
                    break;
            }
        }
        choiceModifier(playerPicked, playerPickedImg, picked);
        callNewPage(game, winOrLose);
        housePick();
        gameCalculator(picked, houseChoice);
    })
}


restart.addEventListener("click", function () {
    restartGame();
});

