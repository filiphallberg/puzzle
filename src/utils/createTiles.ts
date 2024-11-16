import { Puzzle, PuzzleConfig } from "./types";

export default function createTiles(config: PuzzleConfig): Puzzle {
  const items = Array.from({ length: config.rows * config.cols }, (_, i) => i);
  items.push(items.shift() as number);
  return items;
}
