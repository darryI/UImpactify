import React from 'react';

import './FeedbackList.css';
import defaultPic from './defaultPP.png'

function FeedbackList(props) {

    const feedbackList = props.feedback.reverse().map((comment) =>
        <div className="userComment">
            <img className="feedbackProfilePicture" src={defaultPic} />
            <p className="commenter">{comment.user}</p>
            <p className="comment">{comment.comment}</p>
        </div>
    );

    return feedbackList;

}

export default FeedbackList;
