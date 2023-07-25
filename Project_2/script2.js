const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

// Making variables
let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;

player1.textContent = `Player 1 : ${currentPlayer}`;
player2.textContent = `Player 2 : ${nextPlayer}`;

// Function to start your game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

const handleClick = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if (checkWin()) {
            // console.log(`${playerTurn} is a Winner!`);
            showAlert(`${playerTurn} is a Winner!`);
            disableCells();
        }
        else if (checkTie()) {
            // console.log(`This Game Tie!`);
            showAlert(`This Game Tie!`);
            disableCells();
        }
        else {
            changePlayerTurn();
        }
    }
}

// Function to change player's turn
const changePlayerTurn = () => {
    // if (playerTurn === currentPlayer) {
    //     playerTurn = nextPlayer;
    // }
    // else {
    //     playerTurn = currentPlayer;
    // }
    // Above if else condition using ternary Operator
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
}

// Function to check win or tie
const checkWin = () => {
    const winningConditions =
        [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
    for (let i = 0; i < winningConditions.length; i++) {
        const [pos1, pos2, pos3] = winningConditions[i];

        if (gameCells[pos1].textContent !== '' &&
            gameCells[pos1].textContent === gameCells[pos2].textContent &&
            gameCells[pos2].textContent === gameCells[pos3].textContent) {
            return true;
        }
        // console.log('${pos1} ${pos2} ${pos3}');
    }
    return false;;
}

// Function to check for a tie
const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCellsCount++;
        }
    });
    return emptyCellsCount === 0 && !checkWin();
}

// Function to disable game-board cells after a win or tie.
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
        cell.classList.add('disabled');
    });
}

// function to restart Button
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        // cell.classList.remove('disabled');
    });
    startGame();
}
restartBtn.addEventListener('click', restartGame);
// Function to show Alert-Box
const showAlert = (msg) => {
    alertBox.style.display = 'block';
    alertBox.textContent = msg;
}

// Calling Start Game Function
startGame();