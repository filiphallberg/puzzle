export type Puzzle = number[];

export type PuzzleConfig = {
  rows: number;
  cols: number;
};

export type PuzzleAxis = "row" | "col";

export type ChunkedPuzzle = Puzzle[];
