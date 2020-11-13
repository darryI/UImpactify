import React from 'react';
import {useHistory, useParams} from 'react-router-dom';

function CourseEndorseButton(props) {
    // React.useEffect(() => {
    //     var token = JSON.parse(localStorage.getItem("jwtAuthToken"))
    //     if (token) {
    //         console.log(token)
    //         API_course.endorseCourse(token.access_token, id)
    //         .then(
    //             (result) => {
    //                 console.log(result)
    //                 setCurrCourse(result)
    //             },
    //             // Note: it's important to handle errors here
    //             // instead of a catch() block so that we don't swallow
    //             // exceptions from actual bugs in components.
    //             (error) => {
    //                 console.log('problem getting the requested course')
    //             }
    //         )
    //     } else {
    //         history.push("/login")
    //     }
    // }, [])

    return(
        <button  aria-label="endorse-button" type="button" 
            onClick={()=>console.log('boooo')} disabled={false}>Endorse meeee!</button>
    )
}

export const API_course = {
    endorseCourse: async (token, id) => {
      const url = `http://localhost:5000/course/published/${id}/`;
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

export default CourseEndorseButton;