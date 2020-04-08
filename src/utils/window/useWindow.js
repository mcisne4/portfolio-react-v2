import { useState, useEffect } from "react";

function getWindowSizes(){
  const isClient = typeof window === "object";

  if(isClient === true){

    document.body.insertAdjacentHTML(
      "beforeend",
      "<div id='tempRem' style='position: fixed; height: 1rem; width: 1rem; box-sizing: border-box;'></div>"
    );
    const remElement = document.getElementById("tempRem");
    const fontSize = remElement.offsetHeight;
    remElement.parentNode.removeChild(remElement);

    return {
      fontSize: fontSize,
      innerWidth: window.innerWidth,
      outerWidth: window.outerWidth,
      innerHeight: window.innerHeight,
      outerHeight: window.outerHeight
    };
  } else {
    return {};
  }
}

export function useWindow(){

  let [ windowProps, setWindowProps ] = useState( {} );

  useEffect( () => {
    setWindowProps( getWindowSizes() );

    let timeoutID = null;
    function handleResize(){
      clearTimeout(timeoutID);
      timeoutID = setTimeout( () => setWindowProps( getWindowSizes() ), 250);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowProps;
}
