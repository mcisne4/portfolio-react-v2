import React, { useContext } from "react";

import "./home.scss";

import { WindowContext } from "../utils/window/windowContext";

import LogoAnimated from "../assets/logo/logo-animated";
import Subtitle from "../components/home/subtitle";
import SubtitleAnimated from "../components/home/subtitle-animated";
import HomeLinks from "../components/home/links";
import HomeMessage from "../components/home/message";

export default function Home(){
  const {fontSize, outerWidth } = useContext(WindowContext);
  return (
    <div className="home-page">
      <h1>Hello</h1>
      <h4>Font Size: { fontSize }</h4>
      <h4>Window Width: { outerWidth }</h4>
      <h5>Display: { outerWidth < 900 ? "mobile" : "desktop" }</h5>

      <LogoAnimated className="home-logo" timelineStart={0} />
      <Subtitle className="home-subtitle" />
      <SubtitleAnimated className="home-subtitle-anime" timelineStart={ 500 } />
      <HomeMessage className="home-message" />

      <HomeLinks className="home-links" />
    </div>
  );
};