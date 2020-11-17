import React from 'react';
import {useParams} from 'react-router-dom';
import CourseLandingInfo from './CourseLandingInfo'

function CourseLanding(){
    let { id } = useParams();

    return (
        <div>
            <CourseLandingInfo id={id}/>
        </div>
    )
}

export default CourseLanding;