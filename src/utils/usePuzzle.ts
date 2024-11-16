import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import shuffleTiles from "./shuffleTiles";
import { PuzzleConfig } from "./types";
import rearrangePuzzle from "./rearrangePuzzle";
import createTiles from "./createTiles";
import isComplete from "./isComplete";

export default function usePuzzle(config: PuzzleConfig) {
  const [wrapper] = useAutoAnimate({ duration: 100, easing: "ease-in-out" });
  const [puzzle, setPuzzle] = useState<number[]>(() =>
    shuffleTiles(createTiles(config))
  );
  const [complete, setComplete] = useState<boolean>(false);

  const move = useCallback(
    (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      setPuzzle(rearrangePuzzle(event, puzzle, config));
    },
    [config, puzzle]
  );

  const solve = useCallback(() => {
    if (window.confirm("Are you sure?")) {
      setPuzzle(createTiles(config));
    }
  }, [config]);

  const shuffle = useCallback(() => {
    setPuzzle(shuffleTiles(createTiles(config)));
  }, [config]);

  useEffect(() => setComplete(isComplete(puzzle)), [puzzle]);
  useEffect(() => setPuzzle(shuffleTiles(createTiles(config))), [config]);

  return {
    move,
    solve,
    puzzle,
    shuffle,
    wrapper,
    complete,
  };
}
