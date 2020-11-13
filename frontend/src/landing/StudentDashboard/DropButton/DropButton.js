import React from 'react';
import { useHistory } from "react-router-dom";

import './DropButton.css'

// Drop button does not work while the route is correct when clicked the drop button
export default function DropButton(props) {
    // const disenrol = `/course/disenroll/${props.course.id}`

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const history = useHistory();
    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
    
        if (jwtToken) {
          API.dropCourse(props.course.id, jwtToken.access_token)
              .then(
              (result) => {
                  setIsLoaded(true);
                  setCourses(result);
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                  setIsLoaded(true);
                  setError(error);
              }
            )
        } else {
          history.push("./login")
        }
    }, [])


    return (
        <button id="dropButton">Drop</button>
    )
}

export const API = {
    dropCourse: async (course_id, token) => {
      const url = 'http://localhost:5000/course/disenroll/' + course_id + '/';
  
      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then( async res => {
        // check to see if the server responded with a 200 request (ok)
        // if not, then reject the promise so that proper error handling can take place
        const json = await res.json();
        return res.ok ? json : Promise.reject(json);
      });
    },
}