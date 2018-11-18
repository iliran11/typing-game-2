import React from 'react';

const lettersArray = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['⬆', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
  ['123', '☺', '☺', 'space', '.', 'Go']
];

export default function Keyboard() {
  return (
    <div id="keyboard">
      {lettersArray.map((keyboardRow: any[], index: number) => {
        return (
          <div className="keyboard-row" key={`keyboard-row-${index}`}>
            {keyboardRow.map((letter: any, index: number) => {
              let id;
              switch (letter) {
                case 'space':
                  id = 'space';
                  break;
              }
              return (
                <span
                  className="keyboard-letter"
                  id={id}
                  key={`keyboard-letter-${index}`}
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
