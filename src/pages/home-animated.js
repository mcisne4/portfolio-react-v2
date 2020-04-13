import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import gsap from "gsap";

import "./home.scss";

import { WindowContext } from "../utils/window/windowContext";

import LogoAnimated from "../assets/logo/logo-animated";
import SubtitleAnimated from "../components/home/subtitle-animated";
import HomeLinks from "../components/home/links";
import HomeMessage from "../components/home/message";



export default function HomeAnimated(){
  const {fontSize, outerWidth} = useContext(WindowContext);

  let history = useHistory();


  useEffect( () => {
    // --- Redirect Function ---
    const goHome = () => {
      history.push("/home");
    }

    // --- Timedout ---
    let timedOut;

    // --- Timeline ---
    const timeline = gsap.timeline({
      paused: true,
      onComplete: goHome
    });


    // --- When Ready ---
    if( fontSize !== undefined){
      // --- Calculate Values ---
      const orientation = outerWidth >= 48 * fontSize ? "horizontal" : "vertical";

      let scale;
      if(outerWidth >= fontSize * 37){
        scale = 1.5;
      }
      else if(outerWidth <= fontSize * 26){
        scale = 1;
      } else {
        scale = (outerWidth - 4 * fontSize) / (22 * fontSize);
      }

      const offsetX = orientation === "horizontal" ? 11 * (fontSize / 1.5) : 0;

      // --- Add Animations ---
      timeline.to(".home-screen", {
        opacity: 0,
        duration: 1,
        ease: "circ:in"
      }, 0);
      timeline.fromTo(".home-logo", {
        scale: scale,
        x: offsetX
      }, {
        scale: 1,
        x: 0,
        duration: 1,
        ease: "circ:in"
      }, 12);

      timeline.fromTo(".home-subtitle", {
        scale: scale,
        x: offsetX,
        y: 2.5 * fontSize
      }, {
        scale: 1,
        x: 0,
        y: 0,
        duration: 1,
        ease: "circ:in"
      }, 12);

      timeline.fromTo([".home-message", ".home-links"], {
        opacity: 0
      }, {
        opacity: 1,
        duration: 1,
        ease: "circ:in"
      }, 13.5);

      timeline.play();
    }
    // --- Redirect If Not Ready ---
    else {
      timedOut = setTimeout( goHome, 15000)
    }

    // --- Cleanup ---
    return () => {
      clearTimeout(timedOut);
      timeline.kill();
    }
  
  }, [history, fontSize, outerWidth]);

  
  return (
    <div className="home-page">

      <div className="home-flex-container">
        <LogoAnimated className="home-logo" timelineStart={100} />
        <SubtitleAnimated className="home-subtitle" timelineStart={ 9 } />

        <HomeMessage className="home-message" />
      </div>

      <div className="home-flex-container">
        <HomeLinks className="home-links" />
      </div>

      <div className="home-screen"></div>
    </div>
  );
};