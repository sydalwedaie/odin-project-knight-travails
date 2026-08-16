export function isValidPosition(position) {
  const [x, y] = position;
  return x >= 0 && x <= 7 && y >= 0 && y <= 7;
}

export function isSamePosition(pos1, pos2) {
  return pos1[0] === pos2[0] && pos1[1] === pos2[1];
}

export function getNextPos(pos, move) {
  const [posX, posY] = pos;
  const [moveX, moveY] = move;
  return [posX + moveX, posY + moveY];
}

export function drawBoard(path) {
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

export function printMessage(path) {
  console.log(
    ` You made it from [${path[0]}] to [${path.at(-1)}] in ${path.length - 1} moves! Here's your path:`,
  );
  path.forEach((move) => console.log(" ", move));
}
