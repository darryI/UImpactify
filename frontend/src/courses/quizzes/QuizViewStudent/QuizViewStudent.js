import React from 'react';
import {useHistory} from 'react-router-dom';

import { ReactComponent as EditIcon } from 'icons/7.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import { ReactComponent as SaveIcon } from 'icons/save.svg';

function QuizViewStudent(props) {
    const values = props.quiz;
    console.log("we are called")

    const handleSubmit = (event) => {
        event.preventDefault();
        // update state with the new quiz
        const quizJSON = {
          ...values,
        };
        props.setShowForm(false);
        console.log("submit clicked")
        //API calls
    }
    

//      const handleNameChange = (event) => {
//     props.setValues({
//       ...values,
//       name: event.target.value,
//     });
//   }

//   const handlePublishChange = (event) => {
//     props.setValues({
//       ...values,
//       published: event.target.checked
//     });
//   }

//   const handleQuestionChange = (event, i) => {
//     // unpack the quiz questions, and updated the current question's question (text) field
//     const updatedQuestions = [...values.quizQuestions]
//     updatedQuestions[i].question = event.target.value;
    
//     props.setValues({
//       ...values,
//       quizQuestions: updatedQuestions
//     });
//   }

  const handleOptionChange = (event, i, j) => {
      console.log("option is changed?")
    const updatedQuestions = [...values.quizQuestions]
    updatedQuestions[i].options[j].option = event.target.value;

    // props.setValues({
    //   ...values,
    //   quizQuestions: updatedQuestions
    // });
  }

//   const handleAnswerChange = (event, i, j) => {
//     const updatedQuestions = [...values.quizQuestions]
//     updatedQuestions[i].answer = j;

//     props.setValues({
//       ...values,
//       quizQuestions: updatedQuestions
//     });
//   }
  
//   const handleNewQuestion = (event) => {
//     // preventdefault to stop form from prematurely submitting
//     event.preventDefault();
//     const updatedQuestions = [...values.quizQuestions];
//     const newQuestionValues = {
//       "question": "to be or not to be?",
//       "answer": 0,
//       "options": [
//         {
//           index: 0,
//           option: ""
//         },
//         {
//           index: 1,
//           option: ""
//         },
//         {
//           index: 2,
//           option: ""
//         },
//         {
//           index: 3,
//           option: ""
//         }
//       ],
//       "index": values.quizQuestions.length
//     }
  
//     updatedQuestions.push(newQuestionValues);
//     props.setValues({
//       ...values,
//       quizQuestions: updatedQuestions
//     });
//   };

//   const handleDeleteQuestion = (event, i) => {
//     event.preventDefault();
//     const updatedQuestions = [...values.quizQuestions];

//     // removing selected question
//     updatedQuestions.splice(i, 1);

//     // updating indexs of each question -- I don't think this design :(
//     updatedQuestions.forEach((qu) => {
//       if (qu.index > i) {
//         qu.index -= 1;
//       }
//     });
//     props.setValues({
//       ...values,
//       quizQuestions: updatedQuestions
//     });
//   }

  const questions = values.quizQuestions.map((qu, i) => {

    const options = [0, 1, 2, 3].map((j) => {
      return (
        <div key={j}>
          <label className="option-text"></label>
          <input aria-label="option-text" className="rect-1643 mult-option" type="text" disabled={true}
          value={values.quizQuestions[i].options[j].option} onChange={e => handleOptionChange(e, i, j)} />
          <input className="radio-answer"  title="Correct Answer" type="radio" name={`answer-${i}`} 
          checked={values.quizQuestions[i].answer === j} onChange={() => console.log("answer change")}></input>
           {/* <input className="radio-answer"  title="Correct Answer" type="radio" name={`answer-${i}`} 
          checked={values.quizQuestions[i].answer === j} onChange={e => handleAnswerChange(e, i, j)}></input> */}
        </div>
      )
    });

    return (
      <div key={i} className="mult-question">
        <div className="question-bar">
          <label className="question-text"><h2>Question {i+1}</h2></label>
          {/* <DeleteIcon className="clickable" onClick={e => handleDeleteQuestion(e, i)}/> */}
        </div>

        <input aria-label="question-text" className="rect-1643" type="text" disabled={true}
        value={values.quizQuestions[i].question} onChange={() => console.log("what is this")} />
        {/* <input aria-label="question-text" className="rect-1643" type="text" 
        value={values.quizQuestions[i].question} onChange={e => handleQuestionChange(e, i)} /> */}

        <h2>Options</h2>
        {options}
      </div>
    )
  });

  return (
    <form aria-label="creation-form" className="quiz-form " onSubmit={handleSubmit}>
      <div className="labelRectCombo">
        <label className="label-text quizName">Quiz Name:</label>  
        <input aria-label="name-input" className="rect-1643" type="text" disabled={true}
        value={values.name} onChange={() => console.log("this needs to be changed")} />
      </div>

      <h1>Multiple Choice Questions</h1>
      {questions}
      {/* <button aria-label="new-question" onClick={e => handleNewQuestion(e)} className="create-button">
        <AddIcon width="30px" height="30px"/>
        New Question
      </button> */}

      <div className="row">
        <div className="labelRectCombo">
          <label className="label-text">Publish?</label>
          {/* <input aria-label="publish-input" type="checkbox" className="checkbox" 
          checked={values.published} onChange={e => handlePublishChange(e)}></input> */}
        </div>
        <button aria-label="submit-button" className="rect-1627" type="submit"><SaveIcon/>Save</button>
      </div>
    </form>
  )
}

export const API = {
    getQuizzes: async (token, course_id) => {
      const url = `http://localhost:5000/quiz/course/${course_id}/`;
      return fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => res.json());
    },

    // getQuizzes: (token, course_id) => {
    //     return Promise.resolve(jsonQuizzes);
    // }

  }


export default QuizViewStudent;