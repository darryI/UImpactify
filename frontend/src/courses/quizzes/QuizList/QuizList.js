import React from 'react';
import {useHistory} from 'react-router-dom';

import { ReactComponent as EditIcon } from 'icons/7.svg';
import { ReactComponent as AddIcon } from 'icons/add.svg';
import QuizViewStudent from "../QuizViewStudent/QuizViewStudent"

function QuizList(props) {
    var quizzes = props.quizzes
    const [showForm, setShowForm] = React.useState(false);
    const [quiz, setQuiz] = React.useState([])

    // const handleEdit = (event, i) => {
    //     setShowForm(true);
    //     setValues(quizzes[i]);
    //     setSelected(i);
    //   }
    
    //   const handleNew = (event) => {
    //     setShowForm(true);
    //     setSelected(quizzes.length);
    //   }

    const handleClick = (quiz) => {
        console.log("clicked")
        console.log(quiz)
        setShowForm(true);
        setQuiz(quiz)
    }


    let quizBlocks = quizzes.map((q, i) => {
        return (
          <div key={q.id} className="quiz-block">
            <div>{q.name}</div>
            <div className="edit-button"><EditIcon onClick={() => handleClick(q)}/></div>
          </div>
        )
      });

    if(showForm){
        return(
            <div>
                <QuizViewStudent quiz={quiz} setShowForm={setShowForm}/>
            </div>
        )
    }else{
        return (
            <div className="info-card">
                {quizBlocks}

            </div>
        ) 
    } 


}


export default QuizList;