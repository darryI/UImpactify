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
import Login from './landing/login/Login/Login.js';
import TopBar from './utils/Navigation.js';
import Logout from './landing/login/Logout/Logout.js';
import StudentDashboard from 'landing/StudentDashboard/StudentDashboard';
import CourseLanding from './courses/CourseLanding/CourseLanding'

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
        <TopBar loggedIn={loggedIn} />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About setLoggedIn={setLoggedIn} />
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
            <CourseCreation />
          </Route>
          <Route path="/courses/:id">
              <CourseLanding />
          </Route>
          <Route path="/courses">
            <CoursesPage />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/dashboard">
            <StudentDashboard 
              setLoggedIn={setLoggedIn}
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
