import { Puzzle, PuzzleConfig } from "./types";

export default function chunkTiles(
  [...tiles]: Puzzle,
  config: PuzzleConfig["rows"] | PuzzleConfig["cols"]
): Puzzle[] {
  return tiles.length > config
    ? [tiles.slice(0, config), ...chunkTiles(tiles.slice(config), config)]
    : [tiles];
}
