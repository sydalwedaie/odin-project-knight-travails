import { knightMoves } from "./knight.js";
import { drawBoard, printMessage } from "./helpers.js";

function testCases() {
  const cases = [
    [
      [0, 0],
      [3, 3],
    ],
    [
      [3, 3],
      [0, 0],
    ],
    [
      [0, 0],
      [7, 7],
    ],
    [
      [3, 3],
      [4, 3],
    ],
  ];

  console.clear();
  cases.forEach(([start, end]) => {
    const path = knightMoves(start, end);
    printMessage(path);
    drawBoard(path);
  });
}

function testAllCases() {
  const all = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      for (let k = 0; k < 8; k++) {
        for (let l = 0; l < 8; l++) {
          const shortestPath = knightMoves([i, j], [k, l]);
          console.clear();
          drawBoard(shortestPath);
          all.push(shortestPath);
        }
      }
    }
  }

  console.log("Must pring 4096:", all.length);
}

testCases();
// testAllCases();
