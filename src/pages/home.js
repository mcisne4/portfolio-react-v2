import React from "react";

import "./home.scss";

import HomeCanvas from "../components/home/background-canvas/background-canvas";
import Logo from "../assets/logo/logo";
import Subtitle from "../components/home/subtitle";
import HomeLinks from "../components/home/links";
import HomeMessage from "../components/home/message";

export default function Home(){
  return (
    <div className="home-page">

      <HomeCanvas className="home-canvas" />

      <div className="home-flex-container">
        <Logo className="home-logo" />
        <Subtitle className="home-subtitle" />
        <HomeMessage className="home-message" />
      </div>

      <div className="home-flex-container">
        <HomeLinks className="home-links" />
      </div>

    </div>
  );
};