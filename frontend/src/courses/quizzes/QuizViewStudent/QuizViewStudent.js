import React from 'react';
import {useHistory} from 'react-router-dom';

import { ReactComponent as EditIcon } from 'icons/7.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import { ReactComponent as SaveIcon } from 'icons/save.svg';

function QuizViewStudent(props) {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const values = props.quiz;
    const isSubmitted = props.isSubmitted;
    const submittedAnswers = props.submittedAnswers;
    // console.log("submittedAnswers:")
    // console.log(submittedAnswers)

    const dummyStudentAnswers = new Array(values.quizQuestions.length).fill(0);
    // console.log(dummyStudentAnswers)
    // console.log("we are called")


    const handleSubmit = (event) => {
        if(isSubmitted){
            // console.log("answers were submitted")
        }else{
            event.preventDefault();
            props.setShowForm(false);
            // console.log("submit clicked")
            // console.log(dummyStudentAnswers)
            //answers creation
            var question = 0;
            var answer = 0;
            var answerPair = {};
            var finalAnswer = [];
            for(let i = 0; i < dummyStudentAnswers.length; i++){
                question = i;
                answer = dummyStudentAnswers[i];
                answerPair = {"question": question, "answer": answer}
                finalAnswer.push(answerPair);
            }
            // console.log(finalAnswer)
            //API calls
    
            const quizSubmissionJSON = {
                quiz: values.id,
                answers : finalAnswer
              };
    
            var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
            API.postAnswers(jwtToken.access_token, quizSubmissionJSON)
            .then(
                (result) => {
                    // console.log(result)
                    // console.log("sent submisison")
                    // setShowButton(false)
                    // setIsDisabled(true)
                    // setEndorsers(endorsers.concat({ name: user.name, image: user.image }))
                    // setEndorsed(true)
                    // setText("You have endorsed this course!")
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    alert("Couldn't post answers properly!");
                    setIsLoaded(true);
                    setError(error);
                }
            )
        }
    }

    const handleOptionChange = (event, i, j) => {
        //i is the question, j is the option
        dummyStudentAnswers[i] = j
        // console.log(dummyStudentAnswers)

    // props.setValues({
    //   ...values,
    //   quizQuestions: updatedQuestions
    // });
  }

  const questions = values.quizQuestions.map((qu, i) => {

    const options = [0, 1, 2, 3].map((j) => {
        if(isSubmitted){
            console.log("submitted")
            return (
                <div key={j}>
                  <label className="option-text"></label>
                  <input aria-label="option-text" className="rect-1643 mult-option" type="text" disabled={true}
                  value={values.quizQuestions[i].options[j].option} onChange={e => handleOptionChange(e, i, j)} />
                   <input className="radio-answer"  title="Correct Answer" type="radio" name={`answer-${i}`} 
                  checked={values.quizQuestions[i].answer === j} onChange={()=>console.log("these are users old answers")}></input>
                </div>
              )
        }else{
            console.log("not submitted")

            return (
                <div key={j}>
                  <label className="option-text"></label>
                  <input aria-label="option-text" className="rect-1643 mult-option" type="text" disabled={true}
                  value={values.quizQuestions[i].options[j].option} onChange={e => handleOptionChange(e, i, j)} />
                  <input className="radio-answer"  title="Correct Answer" type="radio" name={`answer-${i}`} 
                   onChange={e => handleOptionChange(e, i, j)}></input>
                   {/* <input className="radio-answer"  title="Correct Answer" type="radio" name={`answer-${i}`} 
                  checked={values.quizQuestions[i].answer === j} onChange={e => handleAnswerChange(e, i, j)}></input> */}
                </div>
              )
        }

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


if(isSubmitted){
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
            {/* <div className="labelRectCombo"> */}
              {/* <label className="label-text">Publish?</label> */}
              {/* <input aria-label="publish-input" type="checkbox" className="checkbox" 
              checked={values.published} onChange={e => handlePublishChange(e)}></input> */}
            {/* </div> */}
            {/* <button aria-label="submit-button" className="rect-1627" type="submit"><SaveIcon/> Submit </button> */}
            <button aria-label="close-button" className="rect-1627" type="button" onClick={() => props.setShowForm(false)}> Close </button>
          </div>
        </form>
      )
}else{
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
            {/* <div className="labelRectCombo"> */}
              {/* <label className="label-text">Publish?</label> */}
              {/* <input aria-label="publish-input" type="checkbox" className="checkbox" 
              checked={values.published} onChange={e => handlePublishChange(e)}></input> */}
            {/* </div> */}
            <button aria-label="submit-button" className="rect-1627" type="submit"><SaveIcon/> Submit </button>
            <button aria-label="close-button" className="rect-1627" type="button" onClick={() => props.setShowForm(false)}> Close </button>
          </div>
        </form>
      )
}

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

    postAnswers: async (token, answers) => {
        const url = `http://localhost:5000/quiz/submit/`;
        
        return fetch(url, {
          method: 'POST',
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(answers) // body data type must match "Content-Type" header
        }).then( async res => {
          // check to see if the server responded with a 200 request (ok)
          // if not, then reject the promise so that proper error handling can take place
          const json = await res.json();
          return res.ok ? json : Promise.reject(json);
        });
      },

  }


export default QuizViewStudent;