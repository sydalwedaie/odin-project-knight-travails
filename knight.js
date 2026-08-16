function getMoveCombos(count, moves, start) {
  const path = moves.reduce((total, current) => {
    total.push([current[0] + start[0], current[1] + start[1]]);
    return total;
  }, []);
  if (count === 1) return path.map((move) => [move]);
  return path
    .map((move) =>
      getMoveCombos(count - 1, path, start).map((nextMoves) => [
        move,
        ...nextMoves,
      ]),
    )
    .flat()
    .filter((item) => item.every((move) => isValidPosition(move)));
}

const moves = getMoves([0, 0]);
// const trySomeMoves = getMoveCombos(3, moves, [1, 2]);
// console.dir(trySomeMoves, { depth: null });

function knightMoves(start, end) {
  const all6Moves = getMoveCombos(6, moves, [1, 1]);
  console.dir(all6Moves, { depth: null });
}

knightMoves([0, 0], [7, 7]);

// Utilities
function getMoves(pos) {
  const [x, y] = pos;
  const moves = [
    [x + 1, y + 2],
    [x + 2, y + 1],
    [x + 2, y - 1],
    [x + 1, y - 2],
    [x - 1, y - 2],
    [x - 2, y - 1],
    [x - 2, y + 1],
    [x - 1, y + 2],
  ];

  // return moves.filter((move) => isValidPosition(move));
  return moves;
}

function isValidPosition(position) {
  const [x, y] = position;
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function isSamePosition(pos1, pos2) {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

// Tests

function halboos(count, cb, moves, current = moves) {
  if (count === 1) {
    current.map((item) => [item]).forEach((item) => cb(item.flat()));
  } else {
    for (let item of moves) {
      halboos(
        count - 1,
        cb,
        moves,
        current.map((item2) => [item, ...item2]),
      );
    }
  }
}

// halboos(1, console.dir, myMoves);
// halboos(4, (item) => console.dir(item, { depth: null }), myMoves);
