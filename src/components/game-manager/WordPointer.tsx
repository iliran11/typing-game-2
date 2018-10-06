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
    width: width,
    height: height,
    left: x,
    top: y
  };

  return <div style={style} id="word-pointer" />;
}

export default WordPointer;
