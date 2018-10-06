import * as React from "react";

function WordPointer({
  x,
  y,
  width,
  height
}: {
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const style = {
    width: 10,
    height: 10,
    left: x,
    top: 0
  };

  return <div style={style} id="word-pointer" />;
}

export default WordPointer;
