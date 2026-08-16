import { isSamePosition, isValidPosition, getNextPos } from "./helpers.js";

function getMoveCombos(count, moves) {
  if (count === 1) return moves.map((move) => [move]);
  const nextMoves = getMoveCombos(count - 1, moves);
  return moves
    .map((currMove) => nextMoves.map((next) => [currMove, ...next]))
    .flat();
}

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

export function knightMoves(start, end, count = 1) {
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
