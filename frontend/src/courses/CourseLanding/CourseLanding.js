import React from 'react';
import {useHistory, useParams} from 'react-router-dom';
import CourseEndorseButton from '../CourseEndorseButton/CourseEndorseButton'

function CourseLanding(props) {
    let { id } = useParams();
    const showInfo = false;
    const [currCourse, setCurrCourse] = React.useState([])
    const [isNPO, setisNPO] = React.useState(false)
    const history = useHistory();

    React.useEffect(() => {
        var token = JSON.parse(localStorage.getItem("jwtAuthToken"))
        if (token) {
            console.log(token)
            API_course.getCourses(token.access_token, id)
            .then(
                (result) => {
                    console.log(result)
                    setCurrCourse(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log('problem getting the requested course')
                }
            )
        } else {
            history.push("/login")
        }
    }, [])

    return (
        <div>
            <h1>{currCourse.name} by {currCourse.instructor}</h1>
            <h2>Objective of this course: {currCourse.objective}</h2>
            <h4>Learning outcomes: {currCourse.learningOutcomes}</h4>
            <CourseEndorseButton style={{ display: showInfo ? "block" : "none" }}/>

            {/* <p>this is :{JSON.stringify(currCourse)}</p>
            <p>seperator</p>
            <p>{JSON.stringify(allCourses)}</p> */}
        </div>
    )
}

export const API_course = {
    getCourses: async (token, id) => {
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

    getUsers: async (token, id) => {
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

export default CourseLanding;