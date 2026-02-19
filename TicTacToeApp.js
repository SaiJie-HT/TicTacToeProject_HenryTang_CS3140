const gameBoard = document.querySelector(".gameBoard");
const button = document.querySelector(".restartGame");
const announcementLine = document.querySelector(".Announcements");
const resultLine = document.querySelector(".gameResults");
const cellList = document.querySelectorAll("td");
//console.log(gameBoard);

let playerTurn = "X";
let amtOfTurns = 0;
let gameActive = true;
let gameState = ["", "", "",
                 "", "", "",
                 "", "", ""];
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                       [0, 3, 6], [1, 4, 7], [2, 5, 8],
                       [0, 4, 8], [2, 4, 6]];

//Anounces current player turn
announcer(currentPlayerTurn());

function currentPlayerTurn() {
    return playerTurn;
}

//updates game board array with player symbol 
//updates html board with player symbol
function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = playerTurn;
    clickedCell.innerHTML = playerTurn;

    //change color of X and O
    clickedCell.style.color = playerTurn === "X" ? "darkred" : "green";
    clickedCell.style.borderColor = playerTurn !== "X" ? "green" : "darkred";
    amtOfTurns++;
}

function handlePlayerChange() {
    playerTurn = playerTurn === "X" ? "O" : "X";
    announcementLine.style.color = playerTurn === "X" ? "red" : "green";
}

function handleResultValidation() {
    //Optimization: validates when more than 5 or more turns took place
    if (amtOfTurns >= 5) {
        //iterate through 2D arry
        for (let i = 0; i < winConditions.length && gameActive; i++) {
            //deconstruts inner array for winning index
            const [a, b, c] = winConditions[i];
            //temporary array to hold symbols indexed by the indexes of the inner arry
            const tempArray = [, , ];
            for (let j = 0; j < winConditions[i].length; j++) {
                tempArray[j] = gameState[winConditions[i][j]];
            }
            //If all conditions are true, then the game has been won, which means the game is no longer active
            //conditions: checks if all states are equal AND if the tempArray does not contain empty string.
            if ((gameState[a] === gameState[b] && gameState[b] === gameState[c] && gameState[a] === gameState[c]) && !tempArray.includes("")) {
                gameActive = false;
                announcementLine.innerHTML = "TicTacToe!!!"
            }
        }

        //Before loop ends: Draw checker conditions = 9 turns occured + no empty string + game is still active
        if (amtOfTurns === 9 && !gameState.includes("") && gameActive) {
            //playerTurn is set to "draw" for string printing after method runs
            playerTurn = "draw";
            gameActive = false;
            announcementLine.innerHTML = "TicTacToe???"
        }   
    } 
}

function handleRestartGame() {
    const cells = [...cellList]
    for (let cel of cells) {
        cel.innerHTML = "";
        cel.style.color = "black";
        cel.style.borderColor = "grey";
    }

    //resets game and all messages on HTML
    playerTurn = "X";
    amtOfTurns = 0;
    gameActive = true;
    gameState.fill("");
    announcer(currentPlayerTurn());
    resultLine.innerHTML = "";
    announcementLine.style.color = "gold";

}

//Essentially controls entire game (other than the reset button)
function handleCellClick(clickedCellEvent) {
    handleCellPlayed(clickedCellEvent.target, parseInt(clickedCellEvent.target.id, 10));
    handleResultValidation();
    gameProcessing();
}

//function to announce and process player turns, or announce game results. 
function gameProcessing() {
    if (gameActive) {
        handlePlayerChange();
        announcer(currentPlayerTurn());

    } else if (playerTurn === "draw") {
        resultLine.innerHTML = "A DRAW. Please Try Again!";
    } else {
        resultLine.innerHTML = "Congrats! Player " + currentPlayerTurn() + " has won!!!!";
    }
}

function announcer(text) {
    announcementLine.innerHTML = "Player " + text + "'s turn. Please make your move.";
}

gameBoard.addEventListener("click", (e) => {
    if (e.target.innerHTML === "" && gameActive) {
        handleCellClick(e)
    }
});

button.addEventListener("click", (e) => {
    handleRestartGame();
});