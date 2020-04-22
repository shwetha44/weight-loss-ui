import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from "./home/index";
import Profile from "./profile";
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route path="/profile">
                  <Profile />
              </Route>
              <Route path="*">
                  <NoMatch />
              </Route>
          </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


function NoMatch() {
    return (
        <div>
            <h3>
                No match for this page
            </h3>
        </div>
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
