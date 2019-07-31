let winStatus = false;
const button = document.querySelector(".btn");
let boardGame = [];

const setupBoard = () => {
  document.querySelectorAll("tr").forEach((tr) => {
    const row = [];
    tr.document.querySelectorAll("td").forEach((td) => {
      row.push(td);
    });
    boardGame.push(row);
  });
}

const checkValidMove = (doraemon, direction) => {
  let movement = [0, 0];
  const row = doraemon.parentElement.rowIndex + 1;
  const column = doraemon.cellIndex + 1;
  if (winStatus) {
    return movement;
  }
  if (direction === "ArrowDown" && row < boardGame.length) {
    movement = [0, 1];
  } else if (direction === "ArrowUp" && row > 1) {
    movement = [0, -1];
  } else if (direction === "ArrowRight" && column < boardGame[row - 1].length) {
    movement = [1, 0];
  } else if (direction === "ArrowLeft" && column > 1) {
    movement = [-1, 0];
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
  const movement = checkValidMove(doraemon, event);
  const nextPos = boardGame[row + movement[1]][column + movement[0]];
  // 4. Remove doraemon class in current cell and add it to the right cell.
  doraemon.classList.remove("doraemon");
  nextPos.classList.add("doraemon");
};

const startGame = () => {
  setupBoard();
  document.addEventListener("keyup", moveDoraemon);
};

button.addEventListener("click", startGame);

