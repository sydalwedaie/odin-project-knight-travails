function getMoveCombos(count, moves) {
  if (count === 1) return moves.map((move) => [move]);
  const nextMoves = getMoveCombos(count - 1, moves);
  return moves
    .map((currMove) => nextMoves.map((next) => [currMove, ...next]))
    .flat();
}

const knightValidMoves = [
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
  [-2, 1],
  [-1, 2],
];

function convertComboToPath(start, moveCombo, path = []) {
  if (!isValidPosition(start)) return null;
  path.push(start);
  if (!moveCombo.length) return path;
  const move = moveCombo.shift();
  const nextPos = getNextPos(start, move);
  return convertComboToPath(nextPos, moveCombo, path);
}

function findPath(start, end, combos) {
  for (let combo of combos) {
    const path = convertComboToPath(start, combo);
    if (path && isSamePosition(path.at(-1), end)) {
      return path;
    }
  }

  return null;
}

function knightMoves(start, end, count = 1) {
  const validMoves = [
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
    [-2, -1],
    [-2, 1],
    [-1, 2],
  ];

  if (!isValidPosition(start) || !isValidPosition(end)) return null;
  const allCountMoves = getMoveCombos(count, validMoves);
  const possiblePath = findPath(start, end, allCountMoves);
  return possiblePath || knightMoves(start, end, (count += 1));
}

// Utilities
function isValidPosition(position) {
  const [x, y] = position;
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function isSamePosition(pos1, pos2) {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

function getNextPos(pos, move) {
  const [posX, posY] = pos;
  const [moveX, moveY] = move;
  return [posX + moveX, posY + moveY];
}

// Tests
// const trySomeCombos = getMoveCombos(3, knightValidMoves);
// console.dir(trySomeCombos, { depth: null });

// const solution = tryCombos([0, 5], [7, 7], trySomeCombos);
// console.log(solution);

const shortestPath = knightMoves([0, 0], [7, 7]);

const all = [];
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 8; j++) {
    for (let k = 0; k < 8; k++) {
      for (let l = 0; l < 8; l++) {
        const shortestPath = knightMoves([i, j], [k, l]);
        console.clear();
        createBoard(shortestPath);
        // all.push(shortestPath);
      }
    }
  }
}

function createBoard(path) {
  const isEmpty = (cell) => {
    return path.every((move) => !isSamePosition(move, cell));
  };

  for (let i = 7; i >= 0; i--) {
    let row = ` ${i} |`;
    let rowDiv = "   +";
    let rowNum = "    ";

    for (let j = 0; j < 8; j++) {
      row += isEmpty([j, i]) ? "   |" : " # |";
      rowDiv += " - +";
      rowNum += ` ${j}  `;
    }

    if (i === 7) console.log(rowDiv);
    console.log(row);
    console.log(rowDiv);
    if (i === 0) console.log(rowNum);
  }
}

function printMessage(path) {
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((move) => console.log(move));
}

// printMessage(shortestPath);
// createBoard(shortestPath);
