import React from 'react';
import {useParams} from 'react-router-dom';
import CourseLandingAPI from './CourseLandingAPI'

function CourseLanding(){
    let { id } = useParams();

    return (
        <div>
            {console.log("id getter")}
            <CourseLandingAPI id={id}/>
        </div>
    )
}

export default CourseLanding;