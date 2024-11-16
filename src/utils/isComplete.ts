import { Puzzle } from "./types";

export default function isComplete([...puzzle]: Puzzle): boolean {
  puzzle.unshift(puzzle.pop() as number);
  const current = puzzle.join("");
  const solution = puzzle.sort((a, b) => Number(a) - Number(b)).join("");
  return current === solution;
}
