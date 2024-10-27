window.addEventListener("DOMContentLoaded", () => {
    // Generates the game board
    const board = document.getElementById("board");
    const squares = board.querySelectorAll("div");

    function generateBoard() {
        for (const square of squares) {
            square.className = "square";
            square.textContent = "";
        }
    }

    // Alternates between 'X' and 'O'
    function Clicked(event) {
        const square = event.target;

        if (square.textContent === "" && isActive) {
            square.textContent = currentPlayer;
            square.classList.add(currentPlayer);
            checkGameStatus();
            if (currentPlayer === "X") {
                    currentPlayer = "O";
                } else {
                    currentPlayer = "X";
                }
        }
    }

    // Add clicked functinality to each square
    for (const square of squares) {
        square.addEventListener("click", Clicked);
    }

    // On hover
    function hoverOn(event) {
        event.target.classList.add("hover");
    }

    // Off hover
    function hoveroff(event) {
        event.target.classList.remove("hover");
    }

    // Add hover on/off functinality to each square
    for (const square of squares) {
        square.addEventListener("mouseover", hoverOn);
        square.addEventListener("mouseout", hoveroff);
    }

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

        const status = document.getElementById("status");
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        
    // Check if there's a winner or a draw
    function checkGameStatus() {
        let winner = null;
    
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                squares[a].textContent !== "" &&
                squares[a].textContent === squares[b].textContent &&
                squares[a].textContent === squares[c].textContent
            ) {
                winner = squares[a].textContent;
            }
        }

        if (winner) {
            status.className = "you-won";
            status.textContent = `Congratulations! ${winner} is the winner!`;
            isActive = false;
        }
        else if (Array.from(squares).every(square => square.textContent !== "")) {
            status.textContent = "It's a draw!";
            isActive = false;
        }
    }

    // Reset the game
    function newGame() {
        isActive = true;
        currentPlayer = "X";
        status.textContent = "Move your mouse over a square and click to play an X or an O.";
        status.className = "";
        generateBoard();
    }

    // Add event listener to the "New Game" button
    const newGameButton = document.querySelector(".btn");
    newGameButton.addEventListener("click", newGame);

    // Start game
    generateBoard();
    let isActive = true;
    let currentPlayer = "X"
});
