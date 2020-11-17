import React from 'react';
import {useHistory, useParams} from 'react-router-dom';

function CourseEndorseButton(props) {
    const showInfo = true;
    const [text, setText] = React.useState("Would you like to endorse this course?")
    const id = props.id;
    const [showButton, setShowButton] = React.useState(true);
    const [isDisabled, setIsDisabled] = React.useState(false);

    const history = useHistory();
    var token = JSON.parse(localStorage.getItem("jwtAuthToken"))


    const handleClick = (event) => {
        API.endorseCourse(token.access_token, id)
        .then(
            (result) => {
                setShowButton(false)
                setIsDisabled(true)
                setText("You have endorsed this course!")
                console.log("clicked on endorse")
                console.log(result)
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                alert("Couldn't endorse course properly!")
            }
        )
    }
    
    return(
        <div>
            <div >{text}</div>
            <button style={{ display: showButton ? "block" : "none" }} aria-label="endorse-button" 
                type="button" onClick={handleClick} disabled={isDisabled}>Endorse meeee!</button>
        </div>
    )
}

export const API = {
    endorseCourse: async (token, id) => {
      const url = `http://localhost:5000/course/endorsedBy/${id}/`;
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