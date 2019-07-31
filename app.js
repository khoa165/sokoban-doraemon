let winStatus = false;
const button = document.querySelector(".btn");
let boardGame = [];

const setupBoard = () => {
  document.querySelectorAll("tr").forEach((tr) => {
    const row = [];
    tr.querySelectorAll("td").forEach((td) => {
      row.push(td);
    });
    boardGame.push(row);
  });
};

const checkNobitaNextPos = (row, column, movement) => {
  const nextPosRow = row + movement[1];
  const nextPosColumn = column + movement[0];
  const nextPos = boardGame[nextPosRow][nextPosColumn];
  const nobitaNextPosRow = nextPosRow + movement[1];
  const nobitaNextPosColumn = nextPosColumn + movement[0];
  const rowCondition = nobitaNextPosRow < boardGame.length && nobitaNextPosRow >= 0;
  if (rowCondition) {
    const columnCondition = nobitaNextPosColumn < boardGame[nobitaNextPosRow].length && nobitaNextPosColumn >= 0;
    if (columnCondition) {
      const nobitaNextPos = boardGame[nobitaNextPosRow][nobitaNextPosColumn];
      if (nobitaNextPos.classList.contains("takeshi") || nobitaNextPos.classList.contains("nobita")) {
        movement = [0, 0];
      } else {
        nextPos.classList.remove("nobita");
        nobitaNextPos.classList.add("nobita");
      }
    }
  }
  return movement;
};

const checkValidMove = (doraemon, direction) => {
  let movement = [0, 0];
  const row = doraemon.parentElement.rowIndex;
  const column = doraemon.cellIndex;
  if (winStatus) {
    return movement;
  }
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
  if (nextPos.classList.contains("takeshi")) {
    movement = [0, 0];
  }
  if (nextPos.classList.contains("nobita")) {
    movement = checkNobitaNextPos(row, column, movement);
  }
  return movement;
}

const moveDoraemon = event => {
  // 1. Select doraemon.
  const doraemon = document.querySelector(".doraemon");
  const row = doraemon.parentElement.rowIndex;
  const column = doraemon.cellIndex;
  // 2. Check if the game is not won yet and user clicks appropriate key.
  // 3. Move doraemon.
  const movement = checkValidMove(doraemon, event.key);
  const nextPos = boardGame[row + movement[1]][column + movement[0]];
  // 5. Remove doraemon class in current cell and add it to the right cell.
  doraemon.classList.remove("doraemon");
  nextPos.classList.add("doraemon");
};

const checkWin = () => {
  const numSchool = document.querySelectorAll(".school").length;
  const numMatch = document.querySelectorAll(".school.nobita").length;
  if (numSchool === numMatch) {
    const congrats = "<h1>Congratulations!</h1>";
    document.querySelector("div.container").insertAdjacentHTML("afterbegin", congrats);
  }
};

const startGame = () => {
  setupBoard();
  document.addEventListener("keyup", moveDoraemon);
  checkWin();
};

button.addEventListener("click", startGame);

