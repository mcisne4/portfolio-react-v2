import React, { useContext, useState, useCallback, useRef } from "react";
import { useHistory } from "react-router-dom";
import gsap from "gsap";
// import { NavLink } from "react-router-dom";

import { WindowContext } from "../../utils/window/windowContext";

import Logo from "../../assets/logo/logo";
import NavLinksBar from "../../components/nav-header/nav-links-bar";
import NavButton from "../../components/nav-header/nav-button";
import NavDropdown from "../../components/nav-header/nav-dropdown";


export default function PageHeader(){
  const { outerWidth, fontSize } = useContext(WindowContext);
  const [ navMenu, setNavMenu ] = useState(true);
  let menu = useRef();
  let history = useHistory();

  const hideMenu = (redirectPath=undefined) => {
    setNavMenu(false);
    redirectPath !== undefined && history.push(redirectPath);
  };

  const toggleMenu = useCallback(
    () => {
      if(navMenu === false){
        setNavMenu(true);
      } else {
        // setNavMenu(false);
        hideMenuAnimation(menu.current, () => {
          setNavMenu(false);
        });
      }
    },
    [navMenu],
  );

  return (
    <div className="nav-background">
      <div className="nav-container">
        <Logo className="nav-logo" />
        { outerWidth >= fontSize * 420 ?
          <NavLinksBar /> :
          <NavButton
            onClick={ toggleMenu }
            menu={ menu.current }
          />
        }
        { navMenu === true &&
          <NavDropdown
            menu={ menu }
            hideMenu={ hideMenu }
            hideMenuAnimation={ hideMenuAnimation }
          />}
      </div>
    </div>
  );
};


function hideMenuAnimation(element, onComplete, redirectPath=undefined){
  const tl = gsap.timeline({
    defaults: {
      ease: "power4:in"
    },
    paused: true,
    onComplete: () => {
      onComplete(redirectPath);
      tl.kill();
    }
  });

  tl.to(element, {
    borderBottomColor: "#ff000000",
    borderTopColor: "#ff000000",
    borderLeftColor: "#ff000000",
    borderRightColor: "#ff000000",
    duration: 0.25
  });

  tl.fromTo(element.children, {
    opacity: 1,
    scaleY: 1,
    scaleX: 1,
    transformOrigin: "top center"
  }, {
    opacity: 0,
    scaleY: 0,
    scaleX: 0,
    stagger: {
      each: .1,
      from: "end"
    },
    duration: .5
  });

  tl.play();
}


