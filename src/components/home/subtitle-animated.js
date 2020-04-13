import React, { useEffect} from "react";
import gsap from "gsap";

export default function HomeSubtitleAnimated({className, timelineStart = 0}){
  useEffect(() => {
    let timeline;
    
    function animate(){
      timeline = gsap.timeline();
      timeline.fromTo(".letter", {
        scale: 0,
        y: 10,
      }, {
        scale: 1,
        y: 0,
        ease: "circ:in",
        duration: 0.5,
        stagger: {
          amount: 0.1,
          from: "center"
        }
      }, timelineStart);
      timeline.play();
    }

    function restartAnimation(){
      timeline.progress(0);
      timeline.kill();
      animate();
    }

    animate();
    window.addEventListener("resize", restartAnimation);

    return () => {
      window.removeEventListener("resize", restartAnimation);
      timeline.kill();
    }

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