var accordions = document.querySelectorAll(".accordion");

accordions.forEach((accordion) => {
  accordion.addEventListener("click", () => {
    accordions.forEach((item) => {
      if (item !== accordion) {
        item.classList.remove("active");
        item.querySelector(".accordion-body").style.display = "none";
      }
    });

    accordion.classList.toggle("active");
    var body = accordion.querySelector(".accordion-body");
    body.style.display = accordion.classList.contains("active")
      ? "block"
      : "none";
  });
});

/* color changer code */

var targetElement = document.querySelector(".color_change");
var changeColorButton = document.querySelector(".changer");

changeColorButton.addEventListener("click", function changeColor() {
  var targetElement = document.querySelector(".color_change");
  // Generate a random color in hexadecimal format (e.g., #RRGGBB)
  var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
  targetElement.style.backgroundColor = randomColor;

  console.log("button clicked");
});

/* countdown code */

var startCountdownButton = document.querySelector(".btn-count");
var countdownTimer;

startCountdownButton.addEventListener("click", function startCountdown() {
  var inputElement = document.querySelector("#date");
  var targetTime = new Date(inputElement.value).getTime();
  var countdownElement = document.querySelector(".countdown");

  if (countdownTimer) {
    clearTimeout(countdownTimer);
  }

  function updateCountdown() {
    var currentTime = new Date().getTime();
    var timeDifference = targetTime - currentTime;

    if (timeDifference < 0) {
      countdownElement.textContent = "0";
      return;
    }

    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    var formattedTime = `${days.toString().padStart(2, "0")}:${hours
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    countdownElement.textContent = `Time remaining: ${formattedTime}`;

    countdownTimer = setTimeout(updateCountdown, 1000);
  }

  updateCountdown();
});

/* Tic Tac Toe */

var currentPlayer = "X";
var board = ["", "", "", "", "", "", "", "", ""];
var cells = document.getElementsByClassName("cell");
var statusCheck = document.getElementById("status");
var restartButton = document.querySelector(".restart");

function makeMove(index) {
  if (board[index] === "") {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWinner();
    togglePlayer();
  } else {
    alert("Cell is already occupied");
  }
}

function togglePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  var winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (var combination of winCombinations) {
    var [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusCheck.textContent = `${currentPlayer} wins!`;
      disableBoard();

      restartButton.style.display = "inline-block";
      return;
    }
  }

  if (board.every((cell) => cell !== "")) {
    statusCheck.textContent = "It's a draw!";
    disableBoard();
  }
}

function disableBoard() {
  for (var cell of cells) {
    cell.onclick = null;
  }

  restartButton.addEventListener("click", function restartGame() {
    board.fill("");
    for (var cell of cells) {
      cell.textContent = ""; // Clear the symbols in the cells
      cell.onclick = function () {
        makeMove(Array.from(cells).indexOf(cell));
      };
    }
    currentPlayer = "X"; // Reset the current player to 'X'
    statusCheck.textContent = ""; //
  });
}
