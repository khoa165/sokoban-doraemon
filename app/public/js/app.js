let winStatus = false;
const startGameButton = document.getElementById("start-game");
let boardGame = [];
const congrats = document.getElementById("congrats");

const setupBoard = () => {
  document.querySelectorAll("tr").forEach((tr) => {
    const row = [];
    tr.querySelectorAll("td").forEach((td) => {
      row.push(td);
    });
    boardGame.push(row);
  });
};

const checkboxNextPos = (row, column, movement) => {
  const nextPosRow = row + movement[1];
  const nextPosColumn = column + movement[0];
  const nextPos = boardGame[nextPosRow][nextPosColumn];
  const boxNextPosRow = nextPosRow + movement[1];
  const boxNextPosColumn = nextPosColumn + movement[0];
  const rowCondition = boxNextPosRow < boardGame.length && boxNextPosRow >= 0;
  if (rowCondition) {
    const columnCondition = boxNextPosColumn < boardGame[boxNextPosRow].length && boxNextPosColumn >= 0;
    if (columnCondition) {
      const boxNextPos = boardGame[boxNextPosRow][boxNextPosColumn];
      if (boxNextPos.classList.contains("wall") || boxNextPos.classList.contains("box")) {
        movement = [0, 0];
      } else {
        nextPos.classList.remove("box");
        boxNextPos.classList.add("box");
      }
    } else {
      movement = [0, 0];
    }
  } else {
    movement = [0, 0];
  }
  return movement;
};

const checkValidMove = (player, direction) => {
  let movement = [0, 0];
  const row = player.parentElement.rowIndex;
  const column = player.cellIndex;

  if (direction === "ArrowDown" && row < boardGame.length - 1) {
    movement = [0, 1];
  } else if (direction === "ArrowUp" && row > 0) {
    movement = [0, -1];
  } else if (direction === "ArrowRight" && column < boardGame[row].length - 1) {
    movement = [1, 0];
  } else if (direction === "ArrowLeft" && column > 0) {
    movement = [-1, 0];
  }
  const nextPosRow = row + movement[1];
  const nextPosColumn = column + movement[0];
  const nextPos = boardGame[nextPosRow][nextPosColumn];
  if (nextPos.classList.contains("wall")) {
    movement = [0, 0];
  }
  if (nextPos.classList.contains("box")) {
    movement = checkboxNextPos(row, column, movement);
  }
  return movement;
}

const movePlayer = event => {
  // 1. Select player.
  const player = document.querySelector(".player");
  const row = player.parentElement.rowIndex;
  const column = player.cellIndex;
  // 2. Check if the game is not won yet and user clicks appropriate key.
  // 3. Move player.
  const movement = checkValidMove(player, event.key);
  const nextPos = boardGame[row + movement[1]][column + movement[0]];
  // 5. Remove player class in current cell and add it to the right cell.
  player.classList.remove("player");
  nextPos.classList.add("player");
};

const checkWin = () => {
  const numGoal = document.querySelectorAll(".goal").length;
  const numMatch = document.querySelectorAll(".goal.box").length;
  if (numGoal === numMatch) {
    winStatus = true;
    setTimeout(() => {
      const congratsLine = "<h1>Congratulations!</h1>";
      congrats.insertAdjacentHTML("afterbegin", congratsLine);
      startGameButton.innerText = "Play again?";
    }, 1000);
  }
};

const keyupAction = (event) => {
  if (!winStatus) {
    movePlayer(event);
    checkWin();
  }
};

const startGame = () => {
  congrats.innerHTML = "";
  winStatus = false;
  setupBoard();
  document.addEventListener("keyup", keyupAction);
};

startGameButton.addEventListener("click", startGame);

