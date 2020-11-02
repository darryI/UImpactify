import React from "react";
import ConfirmationPopup from 'landing/ConfirmationPopup/ConfirmationPopup';

function DeleteAccountButton(props) {
  const accessToken = props.accessToken;
  const setAccessToken = props.setAccessToken;
  const [showPopup, setShowPopup] = React.useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  return (
    <div>
      <button onClick={togglePopup}>Delete Account</button>
      {showPopup ? 
        <ConfirmationPopup
          text='Are you sure you want to delete your account?'
          description='This action will delete all data associated with this account'
          yesOption={() => { console.log("testing 1.2.3."); }}
          noOption={togglePopup}
        />
        : null
      }
    </div>
  );
}

export const API = {
  // TODO: replace urls with actual api endpoint & implement authentication logic
  deleteUser(token) {
    const url = 'http://localhost:5000/user/delete-self';
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }, // body data type must match "Content-Type" header
    }).then( res => {
      // check to see if the server responded with a 200 request (ok)
      // if not, then reject the promise so that proper error handling can take place
      return res.json().then(json => {
          return res.ok ? json : Promise.reject(json);
      });
  });
  }
}

export default DeleteAccountButton;