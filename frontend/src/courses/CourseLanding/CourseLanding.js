import React from 'react';
import {useParams} from 'react-router-dom';
import CourseLandingAPI from './CourseLandingAPI'

function CourseLanding(){
    let { id } = useParams();

    return (
        <div>
            <CourseLandingAPI id={id}/>
        </div>
    )
}

export default CourseLanding;