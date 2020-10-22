import React from 'react';

import Courses from '../../courses/Courses/Courses.js';

import {
  useLocation
} from "react-router-dom";

import './Home.css';



function Home() {
  let query = LOC.useQuery();
  const dev = query.get("dev");

  if (dev) {
    // fake user information
    const user = {
      name: "Ninja",
      userId: 1
    };
    return <Courses user={user}/>;
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
