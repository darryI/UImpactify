import React from 'react';
import FetchTest from './FetchTest.js';
import './About.css';

function About(props) {

    const accessToken = props.accessToken;

  return (
    <div>
      <p className="about-colour">About</p>
      <FetchTest/>
      {accessToken}
    </div>
  );
}

export default About;
