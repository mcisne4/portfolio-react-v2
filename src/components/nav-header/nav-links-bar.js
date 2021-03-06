import React from "react";
import { NavLink } from "react-router-dom";

export default function NavLinksBar(){
  return (
    <div className="nav-bar">
      <NavLink to="/home" className="nav-bar-link" activeClassName="current">Home</NavLink>
      <NavLink to="/projects" className="nav-bar-link" activeClassName="current">Projects</NavLink>
      <NavLink to="/snippets" className="nav-bar-link" activeClassName="current">Code Snippets</NavLink>
      <NavLink to="/about" className="nav-bar-link" activeClassName="current">About</NavLink>
      <NavLink to="/contact" className="nav-bar-link" activeClassName="current">Contact</NavLink>
    </div>
  );
};
