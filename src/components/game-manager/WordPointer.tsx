import * as React from "react";

function WordPointer({
  x,
  y,
  width,
  height,
  input
}: {
  x: number;
  y: number;
  width: number;
  input: string;
  height: number;
}) {
  const style = {
    width: width,
    height: height,
    left: x,
    top: y
  };

  return (
    <div style={style} id="word-pointer">
      {input}
    </div>
  );
}

export default WordPointer;
