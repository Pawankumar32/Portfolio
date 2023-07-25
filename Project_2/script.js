document.addEventListener("DOMContentLoaded", () => {
    const gameCells = document.querySelectorAll('.cell');
    const player1 = document.querySelector('.player-1');
    const player2 = document.querySelector('.player-2');
    const restartBtn = document.querySelector('.restartBtn');
    const alertBox = document.querySelector('.alertBox');
    const popup = document.querySelector('.popup');
    const popupButtons = document.querySelectorAll('.popup-button');

    let currentPlayer = '';
    let nextPlayer = '';
    let playerTurn = currentPlayer;
    let delay = 3000; // 3 seconds delay between player 1 and player 2 moves

    const startGame = () => {
        currentPlayer = '';
        nextPlayer = '';
        playerTurn = currentPlayer;

        restartBtn.style.display = 'none';
        popup.style.display = 'flex';
    };

    const chooseSymbol = (symbol) => {
        currentPlayer = symbol.toUpperCase();
        nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        player1.textContent = `User : ${currentPlayer}`;
        player2.textContent = `Computer : ${nextPlayer}`;

        popup.style.display = 'none';

        gameCells.forEach(cell => {
            cell.addEventListener('click', handleClick);
        });
        playerTurn = currentPlayer;
    };

    const handleClick = (e) => {
        if (e.target.textContent === '') {
            e.target.textContent = playerTurn;
            if (checkWin()) {
                showAlert(`${playerTurn} is a Winner!`);
                disableCells();
                restartBtn.style.display = 'block';
            } else if (checkTie()) {
                showAlert(`This Game Tie!`);
                disableCells();
                restartBtn.style.display = 'block';
            } else {
                changePlayerTurn();
                if (playerTurn === nextPlayer) {
                    // Add a delay before player 2 makes a move
                    setTimeout(player2Move, delay);
                }
            }
        }
    };

    const changePlayerTurn = () => {
        playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
    };

    const player2Move = () => {
        const availableCells = Array.from(gameCells).filter(cell => cell.textContent === '');

        // Check if there's a cell where player 2 can win on the next move
        for (const cell of availableCells) {
            cell.textContent = nextPlayer; // Simulate player 2's move
            if (checkWin()) {
                showAlert(`${playerTurn} is a Winner!`);
                disableCells();
                restartBtn.style.display = 'block'; // Show the Restart button after the game ends
                return; // Stop the function if player 2 wins
            }
            cell.textContent = ''; // Reset the cell for the next iteration
        }

        // Check if there's a cell where player 1 can win on the next move
        for (const cell of availableCells) {
            cell.textContent = currentPlayer; // Simulate player 1's move
            if (checkWin()) {
                cell.textContent = nextPlayer; // Block player 1's winning move
                if (checkWin()) {
                    showAlert(`${playerTurn} is a Winner!`);
                    disableCells();
                    restartBtn.style.display = 'block'; // Show the Restart button after the game ends
                    return; // Stop the function if player 2 wins
                }
            }
            cell.textContent = ''; // Reset the cell for the next iteration
        }

        // If no winning move, choose an available cell randomly
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        availableCells[randomIndex].textContent = playerTurn;

        if (checkWin()) {
            showAlert(`${playerTurn} is a Winner!`);
            disableCells();
            restartBtn.style.display = 'block'; // Show the Restart button after the game ends
        } else if (checkTie()) {
            showAlert(`This Game Tie!`);
            disableCells();
            restartBtn.style.display = 'block'; // Show the Restart button after the game ends
        } else {
            changePlayerTurn();
        }
    };

    const checkWin = () => {
        const winningConditions = [
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
        }
        return false;
    };

    const checkTie = () => {
        let emptyCellsCount = 0;
        gameCells.forEach(cell => {
            if (cell.textContent === '') {
                emptyCellsCount++;
            }
        });
        return emptyCellsCount === 0 && !checkWin();
    };

    const disableCells = () => {
        gameCells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
            cell.classList.add('disabled');
        });
    };

    const restartGame = () => {
        gameCells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('disabled');
        });
        startGame();
    };

    const showAlert = (msg) => {
        alertBox.textContent = msg;
        alertBox.style.display = 'block';
        setTimeout(() => {
            alertBox.style.display = 'none';
        }, 3000);
    };

    restartBtn.addEventListener('click', restartGame);

    popupButtons.forEach(button => {
        button.addEventListener('click', () => {
            const symbol = button.textContent;
            chooseSymbol(symbol);
        });
    });

    startGame();
});