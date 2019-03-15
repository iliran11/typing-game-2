import React from 'react';

const lettersArray = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['⬆', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ['123', '☺', '☺', 'space', '.', 'Go']
];

interface Props {
  letter: number;
  row: number;
}

export function Keyboard(props: Props) {
  return (
    <div id="keyboard">
      {lettersArray.map((keyboardRow: any[], rowindex: number) => {
        return (
          <div className="keyboard-row" key={`keyboard-row-${rowindex}`}>
            {keyboardRow.map((letter: any, letterIndex: number) => {
              let id;
              switch (letter) {
                case 'space':
                  id = 'space';
                  break;
              }
              const isHighlighted =
                props.letter === letterIndex && props.row === rowindex;
              const letterClass = `keyboard-letter ${
                isHighlighted ? 'highlight-letter' : null
              }`;
              return (
                <span
                  className={letterClass}
                  id={id}
                  key={`keyboard-letter-${letterIndex}`}
                >
                  {letter}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
