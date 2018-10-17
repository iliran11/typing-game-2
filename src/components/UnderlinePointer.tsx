import * as React from "react";
interface Props {
  y: number;
  x: number;
  width:number;
}

export default function UnderlinePointer(props: Props) {
  const style = {
    width: props.width,
    height: 2,
    top: props.y,
    left: props.x
  };
  return <div style={style} id="underline-pointer" />;
}
