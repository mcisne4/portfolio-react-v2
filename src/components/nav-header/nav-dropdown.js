import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import gsap from "gsap";


export default function NavDropdown({menuRef, hideMenu, hideMenuAnimation}){

  const history = useHistory();

  useEffect(
    () => {
      // --- Timeline Animation ---
      const tl = gsap.timeline({
        defaults: {
          ease: "circ:in"
        },
        paused: true,
        onComplete: () => {
          tl.kill();
        }
      });
    
      tl.fromTo(menuRef.current, {
        opacity: 0
      }, {
        opacity: 1,
        duration: .25
      });
    
      tl.fromTo(menuRef.current.children, {
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
    
      tl.from(menuRef.current, {
        borderBottomColor: "#ff000000",
        borderTopColor: "#ff000000",
        borderLeftColor: "#ff000000",
        borderRightColor: "#ff000000",
        duration: 0.25
      })
    
      tl.play();

      // --- Click Event Listener ---
      const documentClick = (e) => {
        const navMenuItem = e.target.closest(".nav-menu");
        const navButton = e.target.closest(".nav-btn");
        if(navMenuItem === null && navButton === null){
          hideMenuAnimation( hideMenu );
        }
      }

      document.addEventListener("click", documentClick);

      // --- Cleanup ---
      return () => {
        document.removeEventListener("click", documentClick);
      }
    },
    [menuRef, hideMenu, hideMenuAnimation]
  );


  // --- Click Selection ---
  const handleClick = (e) => {
    e.preventDefault();
    const redirectPath = e.target.getAttribute("redirectpath");
    hideMenuAnimation(
      () => {
        hideMenu();
        history.push(redirectPath);
      }
    );
  }


  return (
    <div className="nav-menu" ref={ menuRef } style={ {opacity: 0} }>
      <NavLink
        to="/home"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ handleClick }
        redirectpath="/home"
      >Home</NavLink>
      <NavLink
        to="/projects"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ handleClick }
        redirectpath="/projects"
      >Projects</NavLink>
      <NavLink
        to="/snippets"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ handleClick }
        redirectpath="/snippets"
      >Code Snippets</NavLink>
      <NavLink
        to="/about"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ handleClick }
        redirectpath="/about"
      >About</NavLink>
      <NavLink
        to="/contact"
        className="nav-menu-link"
        activeClassName="current"
        onClick={ handleClick }
        redirectpath="/contact"
      >Contact</NavLink>
    </div>
  )
}

