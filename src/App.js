import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";

import { useWindow } from "./utils/window/useWindow";
import { WindowContext } from "./utils/window/windowContext";

import Home from "./pages/home";
import HomeAnimated from "./pages/home-animated";
import ContentPage from "./pages/content-page";

function App() {
  return (
    <BrowserRouter>
      <WindowContext.Provider value={ useWindow() }>
        <Switch>
          <Route exact path="/" component={ HomeAnimated } />
          <Route path="/home" component={ Home } />
          <Route path="/projects" component={ ContentPage } />
          <Route path="/snippets" component={ ContentPage } />
          <Route path="/about" component={ ContentPage } />
          <Route path="/contact" component={ ContentPage } />
        </Switch>
      </WindowContext.Provider>
    </BrowserRouter>
  );
}

export default App;
