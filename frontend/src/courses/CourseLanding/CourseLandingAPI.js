import React from 'react';
import {useHistory} from 'react-router-dom';


function CourseLandingAPI(props) {
    let id = props.id;
    const [currCourse, setCurrCourse] = React.useState([])
    const history = useHistory();
    console.log("here1")

    React.useEffect(() => {
        var token = JSON.parse(localStorage.getItem("jwtAuthToken"))
        console.log("here2")
        if (token === null) {
            console.log("here6")
            history.push("/login")
        } else {
            console.log("here3")
            console.log(token)
            API.getCourses(token.access_token, id)
            .then(
                (result) => {
                    console.log("here4")
                    console.log(result)
                    setCurrCourse(result)
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log("here5")
                    console.log('problem getting the requested course')
                }
            )
        }
    }, [])


    return (
        <div>
            <h1 className="courseLanding">{currCourse.name} by {currCourse.instructor}</h1>
            <h2 className="courseLanding">Objective of this course: {currCourse.objective}</h2>
            <h4 className="courseLanding">Learning outcomes: {currCourse.learningOutcomes}</h4>

            {/* <p>this is :{JSON.stringify(currCourse)}</p>
            <p>seperator</p>
            <p>{JSON.stringify(allCourses)}</p> */}
        </div>
    )
}

export const API = {
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
}

export default CourseLandingAPI;