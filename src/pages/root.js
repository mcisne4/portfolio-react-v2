import React, { useContext } from "react";
// import {WindowSizeContext} from "../utils/window/windowSizeContext";
// import { WindowSizes } from "../utils/window/windowContext";

import { WindowContext } from "../utils/window/windowContext";

export default function Root(){
  const temp = useContext(WindowContext);
  return (
    <div>
      <h1>Root Route</h1>
      <h4>Font Size: {temp.fontSize}</h4>
      <h4>Window Width: {temp.innerWidth}</h4>
      <h4>Window Height: {temp.innerHeight}</h4>
    </div>
  );
}
