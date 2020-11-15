import React from 'react';
import './EnrolButton.css';
import { useHistory } from "react-router-dom";

export default function EnrolButton(props) {
    const [error, setError] = React.useState(null);
    const history = useHistory();

    const requestJSON = {
      courseId: props.course_id
    };

    const handleClick = (event) => {
      event.preventDefault();

      var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
        
        if (jwtToken) {
          API.enrolCourse(requestJSON, jwtToken.access_token)
              .then(
              () => {
                // alert("Successfully enrol in this course!");
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                // setIsLoaded(true);
                setError(error);
              }
            );
        } else {
          history.push("./login")
        }
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="float-right">
            <button id="enrolButton" onClick={handleClick}>Enrol</button>
        </div>
      )
    }
}

export const API = {
    enrolCourse: async (course_id_json, token) => {
      const url = 'http://localhost:5000/course/enroll/';
  
      return fetch(url, {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(course_id_json) // body data type must match "Content-Type" header
      }).then( async res => {
        // check to see if the server responded with a 200 request (ok)
        // if not, then reject the promise so that proper error handling can take place
        const json = await res.json();
        return res.ok ? json : Promise.reject(json);
      });
    },
}