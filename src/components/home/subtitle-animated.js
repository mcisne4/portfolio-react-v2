import React, { useEffect} from "react";
import anime from "animejs/lib/anime.es";

export default function HomeSubtitleAnimated({className, timelineStart}){
  useEffect(() => {
    const tl = anime.timeline({
      easing: "easeOutQuad"
    });

    // --- Animate Letters ---
    tl.add({
      targets: "." + className + " .letter",
      opacity: [0, 1],
      translateX: [10, 0],
      rotate: [10, 0],
      translateY: [-10, 0],
      scale: [0, 1],
      duration: 100,
      delay: anime.stagger(50, { from: "center"}),  
    }, timelineStart);

    // --- Move Subtitle ---
    tl.add({
      targets: "." + className,
      translateX: [50, 0],
      translateY: [50, 0],
      duration: 1000
    });
  }, [ className, timelineStart ]);


  return (
    <h1 className={ className }>
      <span className="letter">W</span>
      <span className="letter">e</span>
      <span className="letter">b</span>
      <span className="letter">&nbsp;</span>
      <span className="letter">D</span>
      <span className="letter">e</span>
      <span className="letter">v</span>
      <span className="letter">e</span>
      <span className="letter">l</span>
      <span className="letter">o</span>
      <span className="letter">p</span>
      <span className="letter">e</span>
      <span className="letter">r</span>
    </h1>
  );
};