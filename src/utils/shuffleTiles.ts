import { Puzzle } from "./types";

export default function shuffleTiles([...puzzle]: Puzzle): Puzzle {
  for (let i = puzzle.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [puzzle[i], puzzle[j]] = [puzzle[j], puzzle[i]];
  }
  return puzzle;
}
