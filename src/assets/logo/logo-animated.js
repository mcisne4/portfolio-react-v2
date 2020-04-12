import React, { useEffect } from "react";
import { getTimeline } from "./logo-animated-logic";
import LogoBlank from "./logo-blank";

export default function LogoAnimated({className, timelineStart}){
  useEffect( () => {
    const timeline = getTimeline(className, timelineStart);

    timeline.play();

    window.addEventListener("resize", timeline.restart);

    return () => {
      window.removeEventListener("resize", timeline.restart);
    }
  }, [className, timelineStart]);

  return (
    <LogoBlank className={className} />
  )
}