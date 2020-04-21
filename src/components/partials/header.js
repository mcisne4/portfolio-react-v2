import React, { useContext, useState, useCallback, useRef, useEffect } from "react";
import gsap from "gsap";

import { WindowContext } from "../../utils/window/windowContext";

import Logo from "../../assets/logo/logo";
import NavLinksBar from "../../components/nav-header/nav-links-bar";
import NavButton from "../../components/nav-header/nav-button";
import NavDropdown from "../../components/nav-header/nav-dropdown";


export default function PageHeader(){
  const { outerWidth, fontSize } = useContext(WindowContext);
  const [ navMenuDisplay, setNavMenuDisplay ] = useState(false);
  let menu = useRef();

  // --- Show Menu State ---
  const showMenu = useCallback(
    () => {
    setNavMenuDisplay(true);
    },
    [setNavMenuDisplay]
  );

  // --- Hide Menu State ---
  const hideMenu = useCallback(
    () => {
      setNavMenuDisplay(false);
    },
    [setNavMenuDisplay]
  )

  // --- Hide Menu Animation ---
  const hideMenuAnimation = (onComplete) => {

    const tl = gsap.timeline({
      defaults: {
        ease: "power4:in"
      },
      paused: true,
      onComplete: () => {
        onComplete();
        tl.kill();
      }
    });
  
    tl.to(menu.current, {
      borderBottomColor: "#ff000000",
      borderTopColor: "#ff000000",
      borderLeftColor: "#ff000000",
      borderRightColor: "#ff000000",
      duration: 0.25
    });
  
    tl.fromTo(menu.current.children, {
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

  // --- Resize Event Listener ---
  useEffect( () => {
    window.addEventListener("resize", hideMenu);

    return () => {
      window.removeEventListener("resize", hideMenu);
    }
  }, [hideMenu]);


  // --- Nav Components ---
  const NavItems = () => {
    if(outerWidth >= fontSize * 42){
      return (
        <NavLinksBar />
      );
    } else {
      return (
        <>
          <NavButton
            showMenu={ showMenu }
            hideMenu={ hideMenu }
            hideMenuAnimation={ hideMenuAnimation }
            navMenuDisplay={ navMenuDisplay }
          />
          { navMenuDisplay === true &&
            <NavDropdown
              menuRef={ menu }
              hideMenu={ hideMenu }
              hideMenuAnimation={ hideMenuAnimation }
            />
          }
        </>
      )
    }
  }

  return (
    <div className="nav-background">
      <div className="nav-container">
        <Logo className="nav-logo" />
        <NavItems />
      </div>
    </div>
  );
};
