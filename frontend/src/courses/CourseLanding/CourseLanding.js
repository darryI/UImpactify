import React from 'react';
import {
    useParams
  } from "react-router-dom";
  import jsonCourses from '../courses.json'


// import {
//     Link
// } from "react-router-dom";

    // const link = `/courses/${props.course.id}`
  
        // <Link to={link}>
        //     <div className="course-card">
        //         <div id="instructor">{props.course.instructor}</div>
        //         <div><h2>{props.course.name}</h2></div>
        //         <div><blockquote>{props.course.objective}</blockquote></div>
        //     </div>
        // </Link>

function CourseLanding(props) {
    let { id } = useParams();
    // console.log(`id is ${id}`)
    const [allCourses, setAllCourses] = React.useState([])
    const [currCourse, setCurrCourse] = React.useState([])

    React.useEffect(() => {
        API.getCourses(props.accessToken)
            .then(
            (result) => {
                setAllCourses(result)
                const course = result.find(course => course.id == id)
                setCurrCourse(course)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                // setIsLoaded(true);
                // setError(error);
                console.log('anan')
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
    getCourses: async (token) => {
        console.log('not mocked');
        return Promise.resolve(jsonCourses);
    }
}

export default CourseLanding;