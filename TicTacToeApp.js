const gameBoard = document.querySelector(".gameBoard");
const button = document.querySelector(".restartGame");
let announcementLine = document.querySelector(".Announcements");
let resultLine = document.querySelector(".gameResults");

console.log(gameBoard);

let playerTurn = "X";
let amtOfTurns = 0;
let gameActive = true;
let gameState = ["", "", "",
                 "", "", "",
                 "", "", ""];
const winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
                       [0, 3, 6], [1, 4, 5], [2, 5, 8],
                       [0, 4, 8], [2, 4, 6]];

announcer(currentPlayerTurn());

function currentPlayerTurn() {
    return playerTurn;
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = playerTurn;
    clickedCell.innerHTML = playerTurn;
    //console.log(gameState);
}

function handlePlayerChange() {
    playerTurn = playerTurn === "X" ? "O" : "X";
}

function handleResultValidation() {
    if (amtOfTurns >= 5 && gameState.includes("")) {
        for (let i = 0; i < winConditions.length; i++) {
            let correctCondition = true;
            for (let k = 0; k < 2; k++) {
                if ((gameState[winConditions[i][k]] === "" && gameState[winConditions[i][k+1]] === "") || gameState[winConditions[i][k]] !== gameState[winConditions[i][k + 1]]) {
                    correctCondition = false;
                }
            }
            if (correctCondition) {
                gameActive = false;
            }
        }

    } else if (amtOfTurns === 9) {
        playerTurn = "draw";
        gameActive = false;
    } 

}

function handleRestartGame() {
    console.log("test");
    const cellList = document.querySelectorAll("td");
    console.log(cellList);
    const cells = [...cellList]
    for (let cel of cells) {
        cel.innerHTML = "";
    }

    playerTurn = "X";
    amtOfTurns = 0;
    gameActive = true;
    gameState.fill("");
    announcer(currentPlayerTurn());
    resultLine.innerHTML = "";

}

function handleCellClick(clickedCellEvent) {
    handleCellPlayed(clickedCellEvent.target, parseInt(clickedCellEvent.target.id, 10));
    amtOfTurns++;
    console.log(amtOfTurns);
    handleResultValidation();
    gameProcessing();
}

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
    announcementLine.innerHTML = "Player " + text + "'s turn. Please make your move."    
}

gameBoard.addEventListener("click", (e) => {
    if (e.target.innerHTML === "" && gameActive) {
        handleCellClick(e)
        //console.log(typeof e.target);
    }
})

button.addEventListener("click", (e) => {
    handleRestartGame();
})



//function handleResultValidation() {
//    for (let i = 0; i < winConditions.length; i++) {
//        let correctCondition = true;
//        for (let k = 0; k < 2; k++) {
//            //onsole.log(winConditions[i][k], "and ", winConditions[i][k+1]);
//            //console.log("not '' :", gameState[winConditions[i][k]],"is ", gameState[winConditions[i][k]] === "",  " and comparing: ", gameState[winConditions[i][k]], "to", gameState[winConditions[i][k+1]], "is :", gameState[winConditions[i][k]] !== gameState[winConditions[i][k+1]]);
//            if (gameState[winConditions[i][k]] === "" || gameState[winConditions[i][k]] !== gameState[winConditions[i][k+1]]) {
//                //console.log("I've become false");
//                correctCondition = false;
//            }
//            //console.log(winConditions[i][k], "and ", winConditions[i][k+1]);
//
//        }
//        //console.log("split");
//        //console.log("return true when no change:", found);
//        if (correctCondition) {
//            gameActive = false;
//        }
//        //console.log(winConditions[i]);
//    }
//
//    //console.log("test");
//}

