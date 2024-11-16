import { createRoot } from "react-dom/client";
import Puzzle from "./puzzle";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<Puzzle />);
