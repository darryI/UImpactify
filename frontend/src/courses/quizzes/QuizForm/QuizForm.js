import React from 'react';
import {useHistory} from "react-router-dom";

import { ReactComponent as SaveIcon } from 'icons/save.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import './QuizForm.css';


function QuizForm(props) {

  const values = props.values;
  const history = useHistory();

  


  const handleSubmit = (event) => {
    event.preventDefault();
    // update state with the new quiz
    const quizJSON = {
      ...values,
    };

    let jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))


    if (props.isNewQuiz) {
      console.log("posting!");
      API.postQuiz(quizJSON, jwtToken.access_token).then(
        (result) => {
          quizJSON.id = result.id;
          props.addQuiz(quizJSON);
          props.setValues(props.initialValues);
          props.setShowForm(false);
        },
        (error) => {
            alert(JSON.stringify(error));
        }
      );
    } else {
      console.log("putting!");
      API.putQuiz(quizJSON, jwtToken.access_token).then(
        (result) => {
          props.updateQuiz(quizJSON);
          props.setValues(props.initialValues);
          props.setShowForm(false);
        },
        (error) => {
            alert(JSON.stringify(error));
        }
      );
    }
  }

  const handleNameChange = (event) => {
    props.setValues({
      ...values,
      name: event.target.value,
    });
  }

  const handlePublishChange = (event) => {
    props.setValues({
      ...values,
      published: event.target.checked
    });
  }

  const handleQuestionChange = (event, i) => {
    // unpack the quiz questions, and updated the current question's question (text) field
    const updatedQuestions = [...values.quizQuestions]
    updatedQuestions[i].question = event.target.value;
    
    props.setValues({
      ...values,
      quizQuestions: updatedQuestions
    });
  }

  const handleOptionChange = (event, i, j) => {
    const updatedQuestions = [...values.quizQuestions]
    updatedQuestions[i].options[j].option = event.target.value;

    props.setValues({
      ...values,
      quizQuestions: updatedQuestions
    });
  }

  const handleAnswerChange = (event, i, j) => {
    const updatedQuestions = [...values.quizQuestions]
    updatedQuestions[i].answer = j;

    props.setValues({
      ...values,
      quizQuestions: updatedQuestions
    });
  }
  
  const handleNewQuestion = (event) => {
    // preventdefault to stop form from prematurely submitting
    event.preventDefault();
    const updatedQuestions = [...values.quizQuestions];
    const newQuestionValues = {
      "question": "to be or not to be?",
      "answer": 0,
      "options": [
        {
          index: 0,
          option: ""
        },
        {
          index: 1,
          option: ""
        },
        {
          index: 2,
          option: ""
        },
        {
          index: 3,
          option: ""
        }
      ],
      "index": values.quizQuestions.length
    }
  
    updatedQuestions.push(newQuestionValues);
    props.setValues({
      ...values,
      quizQuestions: updatedQuestions
    });
  };

  // create input element for the multiple choice questions
  const questions = values.quizQuestions.map((qu, i) => {

    const options = [0, 1, 2, 3].map((j) => {
      return (
        <div>
          <label className="option-text"></label>
          <input aria-label="option-text" className="rect-1643 mult-option" type="text" value={values.quizQuestions[i].options[j].option} onChange={e => handleOptionChange(e, i, j)} />
          <input class="radio-answer"  title="Correct Answer" type="radio" name={`answer-${i}`} checked={values.quizQuestions[i].answer === j} onChange={e => handleAnswerChange(e, i, j)}></input>
        </div>
      )
    });

    return (
      <div className="mult-question">
        
        <label className="question-text"><h2>Question {i+1}</h2></label>
        <input aria-label="question-text" className="rect-1643" type="text" value={values.quizQuestions[i].question} onChange={e => handleQuestionChange(e, i)} />

        <h2>Options</h2>
        {options}
      </div>
    )
  });


  return (
    <form aria-label="creation-form" className="creationForm" onSubmit={handleSubmit}>
      <div className="labelRectCombo">
        <label className="label-text quizName">Quiz Name:</label>  
        <input aria-label="name-input" className="rect-1643"   type="text" value={values.name} onChange={e => handleNameChange(e)} />
      </div>

      <h1>Multiple Choice Questions</h1>
      {questions}
      <button onClick={e => handleNewQuestion(e)} className="create-button">
        <AddIcon width="30px" height="30px"/>
        New Question
      </button>

      <div className="row">
        <div className="labelRectCombo">
          <label className="label-text">Publish?</label>
          <input aria-label="publish-input" type="checkbox" className="checkbox" checked={values.published} onChange={e => handlePublishChange(e)}></input>
        </div>
        <button aria-label="submit-button" className="rect-1627" type="submit"><SaveIcon/>Save</button>
      </div>
    </form>
  )
}

export const API = {
  postQuiz(quiz, token) {
    return Promise.resolve({id: "L33tHack3r"});
  },

  putQuiz(quiz, token) {
    return Promise.resolve({id: "L33tHack3r"});
  }


  // postQuiz(quiz, token) {
  //   const url = 'http://localhost:5000/quiz/';
  //   // Default options are marked with *
  //   return fetch(url, {
  //     method: 'POST', 
  //     mode: 'cors', 
  //     cache: 'no-cache', 
  //     credentials: 'same-origin', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(quiz) // body data type must match "Content-Type" header
  //   }).then( res => {
  //     // check to see if the server responded with a 200 request (ok)
  //     // if not, then reject the promise so that proper error handling can take place
  //     return res.json().then(json => {
  //         return res.ok ? json : Promise.reject(json);
  //     });
  // });
  // },

  // putQuiz(quiz, token) {
  //   const url = 'http://localhost:5000/quiz/' + quiz.id + '/';
  //   // Default options are marked with *
  //   return fetch(url, {
  //     method: 'PUT', 
  //     mode: 'cors', 
  //     cache: 'no-cache', 
  //     credentials: 'same-origin', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(quiz) // body data type must match "Content-Type" header
  //   }).then( res => {
  //       // check to see if the server responded with a 200 request (ok)
  //       // if not, then reject the promise so that proper error handling can take place
  //       return res.json().then(json => {
  //           return res.ok ? json : Promise.reject(json);
  //       });
  //   });
  // },

}



export default QuizForm