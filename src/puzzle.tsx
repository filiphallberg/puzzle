import { useEffect, useState } from "react";
import usePuzzle from "./utils/usePuzzle";
import { PuzzleConfig } from "./utils/types";
import {
  ArrowLongDownIcon,
  ArrowLongRightIcon,
  ArrowPathIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import Confetti from "react-confetti";
import "./index.css";
import { IConfettiOptions } from "react-confetti/dist/types/Confetti";

const DEFAULT_ROWS = 3;
const DEFAULT_COLS = 5;

export default function Puzzle() {
  const [config, setConfig] = useState<PuzzleConfig>({
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
  });
  const [confetti, setConfetti] = useState<Partial<IConfettiOptions>>({
    numberOfPieces: 0,
  });

  const { move, solve, puzzle, shuffle, wrapper, complete } = usePuzzle(config);

  const queueConfetti = () => {
    setConfetti({
      numberOfPieces: 200,
      width: window.innerWidth,
      height: window.innerHeight,
    });
    setTimeout(
      () =>
        setConfetti({
          numberOfPieces: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      5000
    );
  };

  useEffect(() => {
    if (complete) {
      queueConfetti();
      if (window.confirm("Congratulations! Play again?")) {
        setTimeout(() => shuffle(), 1000);
      }
    }
  }, [shuffle, complete]);

  return (
    <section className="max-w-screen-md w-full max-md:px-4 mx-auto grid grid-cols-2 justify-between gap-2 py-4">
      <Confetti {...confetti} />
      <h1 className="text-6xl leading-loose">Puzzle</h1>
      <div
        ref={wrapper}
        data-complete={complete}
        className="border-8 bg-zinc-200 p-px sm:p-1 border-zinc-700 rounded-md data-[complete=true]:border-green-700 flex flex-wrap col-span-2"
      >
        {puzzle.map((tile, index) => (
          <div
            tabIndex={tile === 0 ? -1 : 0}
            key={tile}
            data-value={tile}
            data-complete={tile === index + 1}
            className="group p-px sm:p-1 aspect-square select-none cursor-pointer data-[value=0]:cursor-default container-inline"
            style={{
              flex: `1 1 ${100 / config.cols}%`,
              opacity: tile,
            }}
            onClick={move}
            onKeyDown={move}
          >
            <div className="w-full text-white justify-center text-dynamic group-focus-within:bg-cyan-700 items-center flex h-full bg-zinc-700 rounded-sm group-data-[complete=true]:bg-green-700">
              {tile}
            </div>
          </div>
        ))}
      </div>
      <div className="grid sm:grid-flow-col grid-flow-row gap-2 justify-start px-2">
        <div className="grid grid-flow-col gap-px justify-start">
          <ArrowLongDownIcon className="h-full p-3 aspect-square bg-gray-100 rounded-sm" />
          <select
            className="py-2 px-4 bg-gray-100 rounded-sm"
            value={config.rows}
            onChange={(e) =>
              setConfig((c) => ({ ...c, rows: Number(e.target.value) }))
            }
          >
            {Array.from({ length: 13 }).map((_, i) => (
              <option key={i} value={i + 3}>
                {i + 3} rows
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-flow-col gap-px justify-start">
          <ArrowLongRightIcon className="h-full p-3 aspect-square bg-gray-100 rounded-sm" />
          <select
            className="py-2 px-4 bg-gray-100 rounded-sm"
            value={config.cols}
            onChange={(e) =>
              setConfig((c) => ({ ...c, cols: Number(e.target.value) }))
            }
          >
            {Array.from({ length: 13 }).map((_, i) => (
              <option key={i} value={i + 3}>
                {i + 3} columns
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-flow-col grid-flow-row gap-2 justify-end px-2">
        <button
          onClick={shuffle}
          className="grid grid-flow-col gap-px justify-end"
        >
          <span className="py-2 px-4 bg-gray-100 rounded-sm">Shuffle</span>
          <ArrowPathIcon className="h-full p-3 aspect-square bg-gray-100 rounded-sm" />
        </button>
        <button
          onClick={solve}
          className="grid grid-flow-col gap-px justify-end"
        >
          <span className="py-2 px-4 bg-gray-100 rounded-sm">Solve</span>
          <CheckIcon className="h-full p-3 aspect-square bg-gray-100 rounded-sm" />
        </button>
      </div>
    </section>
  );
}
