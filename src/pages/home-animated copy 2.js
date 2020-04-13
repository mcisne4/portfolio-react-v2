import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import anime from "animejs/lib/anime.es";
import gsap from "gsap";

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

    const timeline = gsap.timeline();

    console.log(offsetX, scale);

    timeline
      .fromTo(".home-logo", {
        x: offsetX,
        scale: scale
      }, {
        x: 0,
        scale: 1,
        duration: 1,
        ease: "circ.in",
        onComplete: () => {
          console.log("done");
        }
      }, 10);
    // const timelineLogo = gsap.timeline();

    // timelineLogo
    //   .fromTo(".home-logo", {
    //     x: 500,
    //     scale: 2
    //   }, {
    //     x: 0,
    //     scale: 1,
    //     duration: 1,
    //     ease: "circ.in"
    //   }, 10);

    // const tl = gsap.timeline();

    // tl
    //   .add("start", 1)
    //   .add("shrink", 10)
    //   .add("showrest", 12);
    // tl
    //   .fromTo(".home-message", {
    //     scale: 2,
    //     // rotate: 90,
    //     // duration: 5
    //   }, {
    //     scale: 1,
    //     // rotate: 0,
    //     duration: 1,
    //     ease: "circ.in"
    //   }, 2);

    // tl
    //   .fromTo(".home-logo", {
    //     // x: offsetX,
    //     scale: 2
    //   }, {
    //     // x: 0,
    //     scale: 1,
    //     duration: 1
    //   }, "shrink");
    
    // tl.play();
    /*
    const transformTimeline = anime.timeline({
      easing: "easeOutQuad",
      duration: 1000
    });

    transformTimeline
      .add({
        targets: ".home-logo",
        translateX: offsetX,
        scale: scale,
        opacity: 0,
        duration: 50
      }, 0)
      .add({
        targets: ".home-logo",
        opacity: 1,
        duration: 50
      }, 50)
      .add({
        targets: ".home-logo",
        translateX: 0,
        scale: 1
      }, 10000)
      // .add({
      //   targets: ".home-logo",
      //   translateX: [offsetX, 0],
      //   scale: [scale, 1]
      // }, 10000);
      */



      /*
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
    */

  
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