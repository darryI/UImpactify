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
import SignUp from './landing/SignUp/SignUp/SignUp.js'
import Courses from './courses/Courses/Courses.js';
import Login from './landing/Login/Login/Login.js';

function App() {

  const [accessToken, setAccessToken] = React.useState('');

  return (
    <Router>
        <div className="header">
        <img id="logo" src={require('./images/impactify_logo.png')} alt="Logo"/>
        <nav className="navbar">
          <ul>
            <li className="navItem float-left">
              <Link to="/">Home</Link>
            </li>
            <li className="navItem float-left">
              <Link to="/about">About</Link>
            </li>
            <li className="navItem float-left">
                <Link to="/SignUp">SignUp</Link>
            </li>
            <li className="navItem float-left">
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
          </ul>
        </nav>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About
                accessToken={accessToken}/>
          </Route>
          <Route path="/login">
            <Login
                setAccessToken={setAccessToken}/>
          </Route>
          <Route path="/create">
            <Courses accessToken={accessToken}/>
          </Route>
          <Route path="/SignUp">
                <SignUp />
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
