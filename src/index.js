import { knightMoves } from "./knight.js";
import { drawBoard, printMessage } from "./helpers.js";

function testRandomCases() {
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
    [[[-1, 0]], [[1, 9]]],
  ];

  console.clear();
  cases.forEach(([start, finish]) => {
    const path = knightMoves(start, finish);
    console.log();
    printMessage(path);
    drawBoard(path);
    console.log();
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
          // drawBoard(shortestPath);
          all.push(shortestPath);
        }
      }
    }
  }

  console.log("Must print 4096:", all.length);
  all.sort((a, b) => b.length - a.length);
  console.log(all);
}

testRandomCases();
// testAllCases();
