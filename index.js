function getPathsTree(start, end, visited = [[], [], [], [], [], [], [], []]) {
  const [x, y] = start;

  if (!isValidPosition(start) || !isValidPosition(end)) return null;
  else if (visited[x][y]) return null;
  else if (x === end[0] && y === end[1]) return { position: end };

  visited[x][y] = 1;

  const tree = { position: start };
  const moves = getMoves(start);

  moves.forEach((move, index) => {
    const node = getPathsTree(move, end, visited);
    const isDeadEnd =
      !node ||
      (node &&
        Object.keys(node).length === 1 &&
        !isSamePosition(node.position, end));

    if (!isDeadEnd) tree["move" + index] = node;
  });

  // console.log(visited);
  return tree;
}

const paths = [];
function knightMoves(tree, end) {
  // Does not yet work as required
  if (tree === null) return;
  paths.push(tree.position);
  if (isSamePosition(tree.position, end)) return;
  for (let i = 0; i < Object.keys(tree).length - 1; i++) {
    if (tree["move" + i]) knightMoves(tree["move" + i], end);
  }
}

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

  return moves.filter((move) => isValidPosition(move));
}

function isValidPosition(position) {
  const [x, y] = position;
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

function isSamePosition(pos1, pos2) {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

// Tests

const start = [1, 2];
const end = [5, 3];
const tree = getPathsTree(start, end);
knightMoves(tree, end);

console.clear();
console.log("--------");
console.dir(tree, { depth: null, colors: true });
console.log("--------");
console.log(paths);
