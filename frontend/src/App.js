import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import About from './landing/About/About.js';
import Home from './landing/Home/Home.js';
import SignUp from './landing/SignUp/SignUp/SignUp.js'
import CourseCreation from './courses/CourseCreation/CourseCreation.js';
import CoursesPage from './courses/CoursesPage/CoursesPage.js';
import Course from './courses/Course/Course.js';
import Login from './landing/login/Login/Login.js';
import TopBar from './utils/Navigation.js';
import Logout from './landing/login/Logout/Logout.js';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
      var token = JSON.parse(localStorage.getItem("jwtAuthToken"))
      if (token === null) {
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
      }
    }, [loggedIn])

  return (
    <Router>
      <div className="header">
<<<<<<< HEAD
        <TopBar loggedIn={loggedIn} />

=======
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
            <li className="navItem">
              <Link to="/courses">Courses</Link>
            </li>
            
          </ul>
          
        </nav>
        
>>>>>>> develop
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
<<<<<<< HEAD
            <Courses />
=======
            <CourseCreation accessToken={accessToken}/>
          </Route>
          <Route path="/courses/:id">
              <Course accessToken={accessToken}/>
          </Route>
          <Route path="/courses">
            <CoursesPage accessToken={accessToken}/>
>>>>>>> develop
          </Route>
          <Route path="/SignUp">
                <SignUp />
            </Route>
          <Route path="/">
            <Home />
          </Route>
<<<<<<< HEAD

=======
>>>>>>> develop
        </Switch>
      </div>
    </Router>
  );
}

export default App;
