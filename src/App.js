import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";

import useWindow from "./utils/window/useWindow";
import Root from "./pages/root";
import { WindowContext } from "./utils/window/windowContext";

function App() {
  return (
    <BrowserRouter>
      <WindowContext.Provider value={ useWindow() }>
        <Switch>
          <Route exact path="/" component={ Root } />
        </Switch>
      </WindowContext.Provider>
    </BrowserRouter>
  );
}

export default App;
