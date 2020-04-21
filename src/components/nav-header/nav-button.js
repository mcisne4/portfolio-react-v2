import React from "react";

export default function NavButton({showMenu, hideMenu, hideMenuAnimation, navMenuDisplay}){
  const handleClick = () => {
    if(navMenuDisplay === true){
      hideMenuAnimation( () => hideMenu() );
    } else {
      showMenu();
    }
  }
  return (
    <button className="nav-btn" onClick={ handleClick }>
      <svg viewBox="0 0 24 20" className="nav-btn-lines" preserveAspectRatio="none">
        <line className="nav-btn-line" x1="2" x2="22" y1="2" y2="2" />
        <line className="nav-btn-line" x1="2" x2="22" y1="10" y2="10" />
        <line className="nav-btn-line" x1="2" x2="22" y1="18" y2="18" />
      </svg>
    </button>
  );
}
