import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";


export default function NavDropdown({hideMenu, menu, hideMenuAnimation}){

  const redirect = (e) => {
    e.preventDefault();
    const redirectpath = e.target.getAttribute("redirectpath");
    hideMenuAnimation(menu.current, hideMenu, redirectpath);
  }

  const nonMenuClick = (e) => {
    // const closestElement = menu.current.closest(".nav-menu");
    // console.log(closestElement);
    // const elementClasses = e.target.className;
    // if(elementClasses.includes("nav-menu-link")){
    //   console.log("ok");
    // } else {
    //   console.log("NOPE!:", elementClasses);
    // }
  }

  useEffect( () => {
    const tl = gsap.timeline({
      defaults: {
        ease: "circ:in"
      },
      paused: true,
      onComplete: () => {
        tl.kill();
      }
    });
  
    tl.fromTo(menu.current, {
      opacity: 0
    }, {
      opacity: 1,
      duration: .25
    });
  
    tl.fromTo(menu.current.children, {
      opacity: 0,
      scaleY: 0,
      scaleX: 0.5,
      transformOrigin: "top center"
    }, {
      opacity: 1,
      scaleY: 1,
      scaleX: 1,
      stagger: {
        each: .1,
        from: "start"
      },
      duration: .4
    });
  
    tl.from(menu.current, {
      borderBottomColor: "#ff000000",
      borderTopColor: "#ff000000",
      borderLeftColor: "#ff000000",
      borderRightColor: "#ff000000",
      duration: 0.25
    })
  
    tl.play();

    document.addEventListener("click", nonMenuClick);
  
  }, [menu]);

  return (
    <div className="nav-menu" ref={ menu }>
      <NavLink
        to="/home"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ redirect }
        redirectpath="/home"
      >Home</NavLink>
      <NavLink
        to="/projects"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ redirect }
        redirectpath="/projects"
      >Projects</NavLink>
      <NavLink
        to="/snippets"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ redirect }
        redirectpath="/snippets"
      >Code Snippets</NavLink>
      <NavLink
        to="/about"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ redirect }
        redirectpath="/about"
      >About</NavLink>
      <NavLink
        to="/contact"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ redirect }
        redirectpath="/contact"
      >Contact</NavLink>
    </div>
  )
}

