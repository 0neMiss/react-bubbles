import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Link,
  Switch
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <PrivateRoute exact path="/protected" component={BubblePage} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
