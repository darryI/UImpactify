import React from 'react';
import {useHistory} from 'react-router-dom';

import { ReactComponent as EditIcon } from 'icons/7.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import QuizViewStudent from "../QuizViewStudent/QuizViewStudent"

function QuizList(props) {
    var quizzes = props.quizzes

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [submittedAnswers, setSubmittedAnswers] = React.useState([]);

    const [showForm, setShowForm] = React.useState(false);
    const [quiz, setQuiz] = React.useState([]);

    const handleClick = (quiz) => {
        // console.log("edit clicked, quiz below:")
        console.log(quiz)

        var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"));
        API.getQuizSubmissions(jwtToken.access_token, quiz.id)
        .then(
          (result) => {
              console.log("5")
              console.log(result)

            setIsSubmitted(true);
            setSubmittedAnswers(result.answers)
            setQuiz(quiz);
            setShowForm(true);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
              setIsLoaded(true);
              setError(error);
          }
        )
    }


    let quizBlocks = quizzes.map((quiz, i) => {
        return (
          <div key={quiz.id} className="quiz-block">
            <div>{quiz.name}</div>
            <div className="edit-button"><EditIcon onClick={() => handleClick(quiz)}/></div>
          </div>
        )
      });

    if(showForm ){
        return(
            <div className="quiz-view">
                <QuizViewStudent quiz={quiz} setShowForm={setShowForm} isSubmitted={isSubmitted} submittedAnswers={submittedAnswers}/>
            </div>
        )
    }else{
        return (
            <div className="quiz-selection-block-parent">
                {quizBlocks}
            </div>
        ) 
    } 


}

export const API = {
    getQuizSubmissions: async (token, quizID) => {
      const url = `http://localhost:5000/quiz/submission/${quizID}/`;
      return fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => res.json());
    }
}

export default QuizList;