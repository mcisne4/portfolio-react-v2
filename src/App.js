import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";

import { useWindow } from "./utils/window/useWindow";
import { WindowContext } from "./utils/window/windowContext";

import Home from "./pages/home";
import HomeAnimated from "./pages/home-animated";

function App() {
  return (
    <BrowserRouter>
      <WindowContext.Provider value={ useWindow() }>
        <Switch>
          <Route exact path="/" component={ HomeAnimated } />
          <Route path="/home" component={ Home } />
        </Switch>
      </WindowContext.Provider>
    </BrowserRouter>
  );
}

export default App;
