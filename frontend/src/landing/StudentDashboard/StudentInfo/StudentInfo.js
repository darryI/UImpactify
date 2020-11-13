import React from 'react';

export default function StudentInfo(props) {

    var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"));
    


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