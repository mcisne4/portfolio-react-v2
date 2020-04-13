import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import anime from "animejs/lib/anime.es";

import "./home.scss";

import { WindowContext } from "../utils/window/windowContext";

import LogoAnimated from "../assets/logo/logo-animated";
import SubtitleAnimated from "../components/home/subtitle-animated";
import HomeLinks from "../components/home/links";
import HomeMessage from "../components/home/message";



export default function Home(){
  const {fontSize, outerWidth } = useContext(WindowContext);

  let history = useHistory();

  useEffect( () => {
    const orientation = outerWidth >= 48 * fontSize ? "horizontal" : "vertical";
  
    let scale;
    if(outerWidth >= fontSize * 37){
      scale = 1.5;
    } else if(outerWidth <= fontSize * 26){
      scale = 1;
    } else {
      scale = (outerWidth - 4 * fontSize) / (22 * fontSize);
    }

    const offsetX = orientation === "horizontal" ? 11 * fontSize * scale / 1.5 : 0;


    // --- logo movement ---
    anime.set(".home-logo", {
      translateX: offsetX,
      scale: scale
    });
    anime({
      targets: ".home-logo",
      translateX: 0,
      scale: 1,
      duration: 1000,
      delay: 10000,
      easing: "easeOutQuad"
    });

    // --- Subtitle Movement ---
    anime.set(".home-subtitle", {
      translateX: offsetX,
      translateY: 1.5 * fontSize * scale,
      scale: scale
    });
    anime({
      targets: ".home-subtitle",
      translateX: 0,
      translateY: 0,
      scale: 1,
      duration: 1000,
      delay: 10000,
      easing: "easeOutQuad"
    });

    // --- Hidden Elements ---
    anime.set([".home-message", ".home-links"], {
      opacity: 0
    });
    anime({
      targets: [".home-message", ".home-links"],
      opacity: 1,
      duration: 1000,
      delay: 12000,
      easing: "easeOutQuad",
      complete: () => {
        history.push("/home")
      }
    });

  
  }, [fontSize, outerWidth, history]);

  return (
    <div className="home-page">

      <div className="home-flex-container">
        <LogoAnimated className="home-logo" timelineStart={100} />
        <SubtitleAnimated className="home-subtitle" timelineStart={ 8000 } />

        <HomeMessage className="home-message" />
      </div>

      <div className="home-flex-container">
        <HomeLinks className="home-links" />
      </div>
    </div>
  );
};