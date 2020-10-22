import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import About from './landing/About/About.js';
import Home from './landing/Home/Home.js';
import Login from './landing/Login/Login.js';

function App() {

  const [accessToken, setAccessToken] = React.useState('');

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About
                accessToken={accessToken}
             />
          </Route>
          <Route path="/login">
            <Login
                setAccessToken={setAccessToken}
            />
          </Route>
          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
