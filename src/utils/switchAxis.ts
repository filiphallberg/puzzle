import chunkTiles from "./chunkTiles";
import { ChunkedPuzzle, Puzzle, PuzzleAxis, PuzzleConfig } from "./types";

export default function switchAxis(
  [...puzzle]: Puzzle,
  config: PuzzleConfig,
  axis: PuzzleAxis
): Puzzle {
  const length = axis === "row" ? config.rows : config.cols;
  const newPuzzle: ChunkedPuzzle = Array.from({ length }, () => []);
  const oldPuzzle = chunkTiles(puzzle, length);
  for (let i = 0; i < oldPuzzle.length; i += 1) {
    for (let j = 0; j < oldPuzzle[i].length; j += 1) {
      newPuzzle.at(j)?.push(oldPuzzle[i][j]);
    }
  }
  return newPuzzle.flat(2);
}
