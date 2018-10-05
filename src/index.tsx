import * as React from "react";
import * as ReactDOM from "react-dom";
// import App from './App';
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { LetterStatus, ILetterProps } from "./components/letter";
import Word from "./components/word";

const liran: ILetterProps[] = [
  { letter: "d", isSelected: false, status: LetterStatus.Correct },
  { letter: "d", isSelected: false, status: LetterStatus.Correct },
  { letter: "d", isSelected: false, status: LetterStatus.Correct }
];
ReactDOM.render(<Word letters={liran} />, document.getElementById(
  "root"
) as HTMLElement);
registerServiceWorker();
