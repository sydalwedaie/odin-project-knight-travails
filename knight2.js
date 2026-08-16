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

const trySomeCombos = getMoveCombos(6, knightValidMoves);
// console.dir(trySomeMoves, { depth: null });

function convertComboToPath(start, moveCombo, path = []) {
  if (!isValidPosition(start)) return null;
  path.push(start);
  if (!moveCombo.length) return path;
  const [moveX, moveY] = moveCombo.shift();
  const nextPosition = [start[0] + moveX, start[1] + moveY];
  return convertComboToPath(nextPosition, moveCombo, path);
}

function tryCombos(start, end, combos) {
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
  const possiblePath = tryCombos(start, end, allCountMoves);
  return possiblePath || knightMoves(start, end, (count += 1));
}

// const solution = tryCombos([0, 9], [7, 7], trySomeCombos);
// console.log(solution);

const s1 = knightMoves([3, 7], [0, 0]);
console.log(s1);

// Utilities
function isValidPosition(position) {
  const [x, y] = position;
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function isSamePosition(pos1, pos2) {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}
