import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { LoggedInNavbar, LoggedOutNavbar } from "./utils/Navigation.js"
import About from './landing/About/About.js';
import Home from './landing/Home/Home.js';
import SignUp from './landing/SignUp/SignUp/SignUp.js'
import Courses from './courses/Courses/Courses.js';
import Login from './landing/login/Login/Login.js';
import Logout from './landing/login/Logout/Logout.js';

function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  let topBar;

  React.useEffect(() => {
      var token = JSON.parse(localStorage.getItem("jwtAuthToken"))
      if ( token === null) {
         console.log("not logged in yet")

      } else {
          console.log("logged in babos")
      }
    }, [loggedIn])

  return (
    <Router>
      <div className="header">
        <Link to="/logout">
          <button className="navbarButton">LOGOUT</button>
        </Link>
        <Link to="/login">
          <button className="navbarButton">LOGIN</button>
        </Link>
        <Link to="/SignUp">
          <button className="navbarButton" id="navbarSignUpButton">SIGN UP</button>
        </Link>
        <img id="logo" src={require('./images/logo.svg')} alt="Logo"/>
        <nav className="navbar">
          <ul>
            <li className="navItem">
              <Link to="/">Home</Link>
            </li>
            <li className="navItem">
              <Link to="/about">About</Link>
            </li>
            {/* <li className="navItem">
                <Link to="/SignUp">SignUp</Link>
            </li> */}
            {/* <li className="navItem">
              <Link to="/login">Login</Link>
            </li> */}
            <li className="navItem">
              <Link to="/create">Create</Link>
            </li>

          </ul>

        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/logout">
            <Logout
              setLoggedIn={setLoggedIn}
            />
          </Route>
          <Route path="/login">
            <Login
                setLoggedIn={setLoggedIn}
             />
          </Route>
          <Route path="/create">
            <Courses />
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
