import React from "react";
import { Link } from "react-router-dom";

export default function HomeLinks(props){
  return (
    <div className={props.className}>
      <Link className={props.className + "-link"} to="/projects">Projects</Link>
      <Link className={props.className + "-link"} to="/snippets">Code Snippets</Link>
      <Link className={props.className + "-link"} to="/about">About</Link>
      <Link className={props.className + "-link"} to="/contact">Contact</Link>
    </div>
  );
};