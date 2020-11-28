import React from 'react';

function QuizViewStudent(props) {

    const id = props.id;

    const [text, setText] = React.useState("")
    const [showButton, setShowButton] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false);

    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const [user, setUser] = React.useState([]);
    const [enrolledIn, setEnrolledIn] = React.useState(false);

    const [quizPublished, setQuizPublished] = React.useState(false);
    const [quiz, setQuiz] = React.useState([])

    const requestJSON = {
        courseId: id
      };
    
    let userName = "none"

    React.useEffect(() => {
        var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"));
        API.getUser(jwtToken.access_token)
          .then(
            (result) => {
                console.log("1")
                console.log(result)
                setIsLoaded(true);

                setUser(result);
                setShowButton(result.roles.student)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
          )

          API.getEnrolledCourses(jwtToken.access_token)
          .then(
            (result) => {
                console.log("2")
                console.log(result)
                console.log(id)
                setIsLoaded(true);

                for(var i = 0; i < result.length; i++){
                    if(result[i].id === id){
                        setEnrolledIn(true);
                    }
                }  
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
          )

          API.getQuizInfo(jwtToken.access_token, id)
          .then(
            (result) => {
                //returns 
                console.log("3")
                console.log(result)
                setIsLoaded(true);

                for(var i = 0; i < result.length; i++){
                    if(result[i].published){
                        setQuizPublished(true);
                        setQuiz(quiz.concat(result[i]))
                    }
                } 
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
          )

      }, [])

    const handleClick = (event) => {
        var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
        // API.endorseCourse(jwtToken.access_token, requestJSON)
        // .then(
        //     (result) => {
        //         setEndorsers(endorsers.concat(user.name))
        //         setEndorsed(true)
        //         setText("You have endorsed this course!")
        //     },
        //     // Note: it's important to handle errors here
        //     // instead of a catch() block so that we don't swallow
        //     // exceptions from actual bugs in components.
        //     (error) => {
        //         setError(error);
        //         alert("Couldn't open the quiz!")
        //     }
        // )
    }

    // const listEndorsers = (endorsers) =>{
    //     if(endorsers){
    //         return endorsers.map((org, index) => <li key={index}>{org}</li>)
    //     }
    // }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
        return(
            <div>
                <div  style={{ display: enrolledIn && quizPublished ? "block" : "none" }}>
                    <div className="buttonText" >{text}</div>
                    <button aria-label="endorse-button" type="button" onClick={handleClick} 
                        disabled={isDisabled}>Quizzes
                    </button>
                </div>
            </div>
        )
    }
}


export const API = {

    getUser: async (token) => {
        const url = 'http://localhost:5000/user/self/';
    
        return fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then( async res => {
          // check to see if the server responded with a 200 request (ok)
          // if not, then reject the promise so that proper error handling can take place
          const json = await res.json();
          return res.ok ? json : Promise.reject(json);
        });
      },

      getEnrolledCourses: async (token) => {
        const url = 'http://localhost:5000/course/student/';
    
        return fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then( async res => {
          // check to see if the server responded with a 200 request (ok)
          // if not, then reject the promise so that proper error handling can take place
          const json = await res.json();
          return res.ok ? json : Promise.reject(json);
        });
      },

      getQuizInfo: async (token, id) => {
        const url = `http://localhost:5000/quiz/course/${id}/`;
    
        return fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }).then( async res => {
          // check to see if the server responded with a 200 request (ok)
          // if not, then reject the promise so that proper error handling can take place
          const json = await res.json();
          return res.ok ? json : Promise.reject(json);
        });
      }
}


export default QuizViewStudent