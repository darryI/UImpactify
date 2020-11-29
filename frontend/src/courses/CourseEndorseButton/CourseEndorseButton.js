import React from 'react';
import {useHistory, useParams} from 'react-router-dom';

function CourseEndorseButton(props) {

    const id = props.id;

    const [text, setText] = React.useState("")
    const [showButton, setShowButton] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false);

    const [error, setError] = React.useState(null);
    const [isUserLoaded, setIsUserLoaded] = React.useState(false);
    const [isEndorsedLoaded, setIsEndorsedLoaded] = React.useState(false);

    const [user, setUser] = React.useState([]);
    const [endorsers, setEndorsers] = React.useState([]);
    const [endorsed, setEndorsed] = React.useState(false)

    const requestJSON = {
        courseId: id
      };
    
      let userName = "none"

    React.useEffect(() => {
        var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"));
        API.getUser(jwtToken.access_token)
          .then(
            (result) => {
                userName = result.name
                setIsEndorsedLoaded(true);
                setIsUserLoaded(true);
                setUser(result);
                setShowButton(result.roles.organization)
                setText("Would you like to endorse this course?")
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setIsEndorsedLoaded(true);
                setError(error);
            }
          )
        API.getCourseEndorsers(jwtToken.access_token, requestJSON)
            .then(
                (result) => {
                    setEndorsers(result);
                    if(result[0] !== undefined){
                        setEndorsed(true)
                    }
                    if(result.includes(userName)){
                        setShowButton(false)
                        setIsDisabled(false)
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsUserLoaded(true);
                    setError(error);
                }
            )
      }, [])

    const handleClick = (event) => {
        var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
        API.endorseCourse(jwtToken.access_token, requestJSON)
        .then(
            (result) => {
                setShowButton(false)
                setIsDisabled(true)
                setEndorsers(endorsers.concat(user.name))
                setEndorsed(true)
                setText("You have endorsed this course!")
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setError(error);
                alert("Couldn't endorse course properly!")
            }
        )
    }

    const listEndorsers = (endorsers) =>{
        if(endorsers){
            return endorsers.map((org) => <li key={org.name}>{org.name}</li>)
        }
    }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isUserLoaded || !isEndorsedLoaded) {
    return <div>Loading...</div>;
  } else {
        return(
            <div>
                <div className="courseEndorsers" style={{ display: endorsed ? "block" : "none" }}>
                    <p>This course is Endorsed by:</p>
                    <ul aria-label="endorsers-list">{listEndorsers(endorsers)}</ul>
                </div>

                <div  style={{ display: showButton ? "block" : "none" }}>
                    <div className="buttonText" >{text}</div>
                    <button aria-label="endorse-button" type="button" onClick={handleClick} 
                        disabled={isDisabled}>Endorse
                    </button>
                </div>
            </div>
        )
    }
}

export const API = {
    endorseCourse: async (token, course) => {
      const url = `http://localhost:5000/course/endorse/`;
      
      return fetch(url, {
        method: 'POST',
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(course) // body data type must match "Content-Type" header
      }).then( async res => {
        // check to see if the server responded with a 200 request (ok)
        // if not, then reject the promise so that proper error handling can take place
        const json = await res.json();
        return res.ok ? json : Promise.reject(json);
      });
    },
    
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

      getCourseEndorsers: async (token, course) => {
        const url = 'http://localhost:5000/course/endorsedBy/' + course.courseId + '/';
        // Default options are marked with *
        const res = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            // body: JSON.stringify(course) // body data type must match "Content-Type" header
          });
          const json = await res.json();
          return res.ok ? json : Promise.reject(json);
        },
}

export default CourseEndorseButton;