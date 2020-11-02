import React from 'react';
import {
    useParams
  } from "react-router-dom";

function Course(props) {
    let { id } = useParams();
    return <p>course {id}</p>
}

export default Course;