import React from "react";
import { Link } from "react-router-dom";

function TopBar(props) {

    const loggedIn = props.loggedIn;
    const user = props.user;
    
    if (loggedIn && user.roles){
      const isStudent = user.roles.student;
      const isInstructor = user.roles.instructor;
      const isNPO = user.roles.organization;
      const isAdmin = user.roles.admin;

      return (
        <div aria-label="topBar">
          <Link to="/logout">
            <button className="navbarButton">LOGOUT</button>
          </Link>
          <img id="logo" src={require('../images/logo.svg')} alt="Logo"/>
          <nav className="navbar">
            <ul>
              <li className="navItem">
                <Link to="/">Home</Link>
              </li>
              <li className="navItem">
                <Link to="/about">About</Link>
              </li>
              <li className="navItem" style={{ display: isStudent || isAdmin ? "inline-block" : "none" }}>
                <Link to="/dashboard">Student</Link>
              </li>
              <li className="navItem" style={{ display: isInstructor || isAdmin ? "inline-block" : "none" }}>
                <Link to="/create">Instructor</Link>
              </li>
              <li className="navItem" style={{ display: isNPO || isAdmin ? "inline-block" : "none" }}>
                <Link to="/jobs">Social Initiative</Link>
              </li>
              <li className="navItem">
                <Link to="/courses">Courses</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
      
    } else {
        return (
          <div aria-label="topBar">
            <Link to="/login">
              <button className="navbarButton">LOGIN</button>
            </Link>
            <Link to="/SignUp">
              <button className="navbarButton" id="navbarSignUpButton">SIGN UP</button>
            </Link>
            <img id="logo" src={require('../images/logo.svg')} alt="Logo"/>
            <nav className="navbar">
              <ul>
                <li className="navItem">
                  <Link to="/">Home</Link>
                </li>
                <li className="navItem">
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav>
          </div>
        );
    }

}

export default TopBar;