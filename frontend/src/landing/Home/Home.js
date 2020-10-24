import React from 'react';

import Courses from '../../courses/Courses/Courses.js';

import {
  useLocation
} from "react-router-dom";

import './Home.css';



function Home(props) {
  let query = LOC.useQuery();
  const dev = query.get("dev");

  if (dev) {
    return <p>secret page xd</p>;
  } else {
    return <p className="home-colour">Home</p>;
  }
}

export const LOC = {
  useQuery() {
    return new URLSearchParams(useLocation().search);
  }
}

export default Home;
