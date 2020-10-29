import React from 'react';

import CourseCard from '../CourseCard/CourseCard.js';
import './CoursesPage.css';
import jsonCourses from '../courses.json'

import Course from '../Course/Course.js';

import {
    BrowserRouter, Switch, Route
} from "react-router-dom";



function CoursesPage(props) {

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const [courses, setCourses] = React.useState([]);

    React.useEffect(() => {
        API.getCourses(props.accessToken)
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
    }, [])

    const courseCards = courses.map(c => <CourseCard key={c.id} course={c}/>);

    return (
        <div className="courses-page">  
            <div className="middle">
                {courseCards}
            </div>
        </div>
    );
}


export const API = {
    getCourses: async (token) => {
        console.log('not mocked');
        return Promise.resolve(jsonCourses);
    },


    // getCourses: async (token) => {
    //   const url = "http://localhost:5000/course/";
    //   console.log(token);
  
    //   return fetch(url, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //     }
    //   }).then(res => res.json());
    // },
}

export default CoursesPage;