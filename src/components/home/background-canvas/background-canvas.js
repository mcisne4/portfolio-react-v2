import React, { useRef } from "react";
import { AnimateCanvas } from "./background-canvas-logic";

export default function HomeCanvas({className}){

  let ref = useRef();

  AnimateCanvas(ref);
  
  return (
    <canvas className={className} ref={ ref } >
      Home Canvas
    </canvas>
  );
};
