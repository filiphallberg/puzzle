import { KeyboardEvent, MouseEvent } from "react";
import { Puzzle, PuzzleConfig } from "./types";
import switchAxis from "./switchAxis";

const VALID_KEYS = ["Enter", "Space"];

function isKeyboardEvent(
  event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>
): event is KeyboardEvent<HTMLElement> {
  return event.type === "keydown";
}

export default function rearrangePuzzle(
  event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  [...puzzle]: Puzzle,
  config: PuzzleConfig
): Puzzle {
  if (isKeyboardEvent(event) && !VALID_KEYS.includes(event.code)) {
    return puzzle;
  }
  const { currentTarget } = event;
  if (!currentTarget) return puzzle;
  const { parentElement } = currentTarget;
  if (!parentElement) return puzzle;
  const emptyTile = parentElement.querySelector('[data-value="0"]');
  if (!emptyTile) return puzzle;
  const emptyIndex = [...parentElement.children].indexOf(emptyTile);
  const emptyRow = Math.floor(emptyIndex / config.cols);
  const emptyCol = emptyIndex - emptyRow * config.cols;

  const tileIndex = [...parentElement.children].indexOf(currentTarget);
  const tileRow = Math.floor(tileIndex / config.cols);
  const tileCol = tileIndex - tileRow * config.cols;

  if (emptyRow === tileRow) {
    const newPuzzle = [...puzzle];
    const offset = tileRow * config.cols;
    if (emptyCol > tileCol) {
      const tiles = newPuzzle.splice(tileCol + offset, emptyCol - tileCol + 1);
      tiles.unshift(tiles.pop() as number);
      newPuzzle.splice(tileCol + offset, 0, ...tiles);
    } else if (emptyCol < tileCol) {
      const tiles = newPuzzle.splice(emptyCol + offset, tileCol - emptyCol + 1);
      tiles.push(tiles.shift() as number);
      newPuzzle.splice(emptyCol + offset, 0, ...tiles);
    }
    return newPuzzle;
  } else if (emptyCol === tileCol) {
    const newPuzzle = switchAxis(puzzle, config, "col");
    const offset = tileCol * config.rows;
    if (emptyRow > tileRow) {
      const tiles = newPuzzle.splice(tileRow + offset, emptyRow - tileRow + 1);
      tiles.unshift(tiles.pop() as number);
      newPuzzle.splice(tileRow + offset, 0, ...tiles);
    } else if (emptyRow < tileRow) {
      const tiles = newPuzzle.splice(emptyRow + offset, tileRow - emptyRow + 1);
      tiles.push(tiles.shift() as number);
      newPuzzle.splice(emptyRow + offset, 0, ...tiles);
    }
    return switchAxis(newPuzzle, config, "row");
  }
  return puzzle;
}
