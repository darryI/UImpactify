import React from 'react';
import './StudentInfo.css'

export default function StudentInfo(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [user, setUser] = React.useState([]);
    
  React.useEffect(() => {
    var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"));
    var userId = jwtToken.user_id;
    API.getUser(userId, jwtToken.access_token)
      .then(
        (result) => {
          setIsLoaded(true);
          setUser(result);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <div className="student-info-text">
          <strong>Welcome back!</strong>
          &nbsp;&nbsp;&nbsp;
          {user.name}
        </div>
        <div className="student-info-text">
          <strong>Email:</strong>
          &nbsp;
          {user.email}
        </div>
        <div className="student-info-text">
          <strong>Phone:</strong>
          &nbsp;
          {user.phone}
        </div>
        {/* <div className="student-info-text">
          <strong>User Id:</strong>
          &nbsp;
          {user.id}
        </div> */}
      </div>
    );
  
  }
}

export const API = {
    getUser: async (user_id, token) => {
      const url = 'http://localhost:5000/user/' + user_id + '/';
  
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