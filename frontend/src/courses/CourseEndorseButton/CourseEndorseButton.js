import React from 'react';
import {useHistory, useParams} from 'react-router-dom';

function CourseEndorseButton(props) {
    const [text, setText] = React.useState("")
    const id = props.id;
    const [showButton, setShowButton] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false);

    const [user, setUser] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    // setShowButton(props.userRoles)
    React.useEffect(() => {
        var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"));
        API.getUser(jwtToken.access_token)
          .then(
            (result) => {
              setIsLoaded(true);
              setUser(result);
              setShowButton(result.roles.organization)
              setText("Would you like to endorse this course?")
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
      const requestJSON = {
        courseId: id
      };
    const handleClick = (event) => {
        var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
        API.endorseCourse(jwtToken.access_token, requestJSON)
        .then(
            (result) => {
                setShowButton(false)
                setIsDisabled(true)
                console.log(result)
                setText("You have endorsed this course!")
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                alert("Couldn't endorse course properly!")
            }
        )
    }
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
        return(
            <div>
                <div >{text}</div>
                <button style={{ display: showButton ? "block" : "none" }} 
                    aria-label="endorse-button" type="button" onClick={handleClick} 
                    disabled={isDisabled}>Endorse meeee!
                </button>
            </div>
        )
    }
}

export const API = {
    endorseCourse: async (token, id) => {
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
        body: JSON.stringify(id) // body data type must match "Content-Type" header
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
}

export default CourseEndorseButton;