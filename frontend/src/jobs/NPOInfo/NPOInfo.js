import React from 'react';

export default function StudentInfo(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [user, setUser] = React.useState([]);
    
  React.useEffect(() => {
    var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"));
    API.getUser(jwtToken.access_token)
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
        <div className="info-header">
          <strong>Welcome back!</strong>
        </div>
        <div className="info-text">
          <strong>Social Initiative:</strong>
          &nbsp;
          <i>{user.name}</i>
        </div>
        <div className="info-text">
          <strong>Email:</strong>
          &nbsp;
          {user.email}
        </div>
        <div className="info-text">
          <strong>Phone:</strong>
          &nbsp;
          {user.phone}
        </div>
        <div className="info-text">
          <strong>Jobs oppurtunities</strong>
          &nbsp;<i>{user.name}</i>&nbsp;
          <strong>posted:</strong>
        </div>
      </div>
    );
  
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
}