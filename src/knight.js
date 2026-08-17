import { isSamePosition, isValidPosition, getNextPos } from "./helpers.js";

// Generate all combinations of 'count' moves:
// e.g: All the 2-moves, all the 3-moves, etc.
function getMoveCombos(count, moves) {
  if (count === 1) return moves.map((move) => [move]);
  const nextMoves = getMoveCombos(count - 1, moves);
  return moves
    .map((currMove) => nextMoves.map((next) => [currMove, ...next]))
    .flat();
}

// Make a path of actual chessboard places.
// Start from 'start', and follow 1 single move combination.
function convertComboToPath(start, moveCombo, path = []) {
  if (!isValidPosition(start)) return null;
  path.push(start);
  if (!moveCombo.length) return path;
  const move = moveCombo.shift();
  const nextPos = getNextPos(start, move);
  return convertComboToPath(nextPos, moveCombo, path);
}

// Try to find a possible path from 1 set of combinations.
function findPath(start, finish, combos) {
  for (let combo of combos) {
    const path = convertComboToPath(start, combo);
    if (path && isSamePosition(path.at(-1), finish)) return path;
  }

  return null;
}

// Start with trying to find a path from the 1-move combinations.
// If nothing found, do it for 2-moves combinations and so on.
export function knightMoves(start, finish, count = 1) {
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

  if (!isValidPosition(start) || !isValidPosition(finish)) return null;
  const allCountMoves = getMoveCombos(count, validMoves);
  const possiblePath = findPath(start, finish, allCountMoves);
  return possiblePath || knightMoves(start, finish, (count += 1));
}
