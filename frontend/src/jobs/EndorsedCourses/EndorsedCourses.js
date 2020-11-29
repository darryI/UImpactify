import React from 'react';
import { useHistory } from "react-router-dom";

import EndorsedCrsCard from '../EndorsedCrsCard/EndorsedCrsCard'

function EndorsedCourses(props) {

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const history = useHistory();

    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
      var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
      if (jwtToken) {
        API.getEndorsedCrs(jwtToken.access_token)
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

    const courseCards = courses.map(c => <EndorsedCrsCard key={c.id} course={c}/>);

    if (error) {
        return <p>courses could not be loaded</p>
    } else if (!isLoaded) {
        return <p>... loading</p>
    } else {
        return ( 
            <div>
                {courseCards}
            </div>
        ); 
    }
}


export const API = {
    getEndorsedCrs: async (token) => {
      const url = "http://localhost:5000/user/endorsed/";
  
      return fetch(url, {
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

export default EndorsedCourses;