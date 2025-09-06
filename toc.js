(function () {
  const boxes = Array.from(document.querySelectorAll(".box"));
  const turnLabel = document.getElementById("turnLabel");
  const resetBtn = document.getElementById("reset");

  // Sounds
  const clickSound = new Audio("metal-clang-sound-81634.mp3");
  const winSound = new Audio("game-over-38511.mp3");
  const bgMusic = new Audio("dj-background-music-background-music-free-music-music-free-for-use-221916.mp3");
  bgMusic.loop = true;
  bgMusic.volume = 0.3;
  bgMusic.play().catch(() => {}); 

  const X = "X";
  const O = "O";
  let current = X;
  let board = Array(9).fill("");
  let gameOver = false;

  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function setTurnDisplay() {
    turnLabel.textContent = gameOver ? "-" : current;
  }

  function markCell(idx) {
    if (gameOver || board[idx]) return;
    board[idx] = current;

    const span = boxes[idx].querySelector(".boxtext");
    span.textContent = current;
    span.classList.add(current.toLowerCase());

    clickSound.currentTime = 0;
    clickSound.play();

    if (checkWin()) {
      gameOver = true;
      turnLabel.textContent = `${current} Wins!`;
      winSound.play();
      return;
    }
    if (board.every((v) => v)) {
      turnLabel.textContent = "Draw";
      gameOver = true;
      return;
    }

    current = current === X ? O : X;
    setTurnDisplay();
  }

  function checkWin() {
    for (const [a, b, c] of wins) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        boxes[a].classList.add("win");
        boxes[b].classList.add("win");
        boxes[c].classList.add("win");
        return true;
      }
    }
    return false;
  }

  function reset() {
    board = Array(9).fill("");
    current = X;
    gameOver = false;
    boxes.forEach((box) => {
      const span = box.querySelector(".boxtext");
      span.textContent = "";
      span.classList.remove("x", "o");
      box.classList.remove("win");
    });
    setTurnDisplay();
  }

  // Listeners
  boxes.forEach((box, i) => {
    box.addEventListener("click", () => markCell(i));
  });

  resetBtn.addEventListener("click", reset);

  setTurnDisplay();
})();
