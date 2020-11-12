import React from 'react';
import {useHistory} from "react-router-dom";

import { ReactComponent as SaveIcon } from 'icons/save.svg';

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

  return (
    <form aria-label="creation-form" className="creationForm" onSubmit={handleSubmit}>
      <div className="labelRectCombo">
        <label className="label-text quizName">Quiz Name:</label>  
        <input aria-label="name-input" className="rect-1643"   type="text" value={values.name} onChange={e => handleNameChange(e)} />
      </div>

      
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