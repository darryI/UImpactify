import React from 'react';
import {
    useParams
  } from "react-router-dom";

function CourseLanding(props) {
    let { id } = useParams();
    const [currCourse, setCurrCourse] = React.useState([])

    React.useEffect(() => {
        API.getCourses(props.accessToken, id)
            .then(
            (result) => {
                setCurrCourse(result)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log('problem getting the requested course')
            }
            )
    }, [])

    return (
        <div>
            <h1>{currCourse.name} by {currCourse.instructor}</h1>
            <h2>Objective of this course: {currCourse.objective}</h2>
            <h4>Learning outcomes: {currCourse.learningOutcomes}</h4>

            {/* <p>this is :{JSON.stringify(currCourse)}</p>
            <p>seperator</p>
            <p>{JSON.stringify(allCourses)}</p> */}
        </div>
    )
}

export const API = {
    getCourses: async (token, id) => {
      const url = `http://localhost:5000/course/published/${id}`;
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

export default CourseLanding;