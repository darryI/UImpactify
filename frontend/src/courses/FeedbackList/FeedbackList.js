import React from 'react';

import './FeedbackList.css';

function FeedbackList(props) {

    const feedbackList = props.feedback.reverse().map((comment) =>
        <div className="userComment">
            <p className="commenter">{comment.user}</p>
            <p className="comment">{comment.comment}</p>
        </div>
    );

    return feedbackList;

}

export default FeedbackList;
