import React from "react";
import ConfirmationPopup from 'landing/ConfirmationPopup/ConfirmationPopup';
import './DeleteAccountButton.css';

function DeleteAccountButton(props) {
  const accessToken = props.accessToken;
  const setAccessToken = props.setAccessToken;
  const [showPopup, setShowPopup] = React.useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const handleDelete = () => {
    // call the delete user API
    API.deleteUser(accessToken).then(
      () => {
        // remove the access token on success
        setAccessToken('');
      },
      (error) => {
        alert(JSON.stringify(error));
      }
    );
    togglePopup();
  }

  return (
    <div>
      <button className="deleteAccButton" onClick={togglePopup}>Delete Account</button>
      {showPopup ? 
        <ConfirmationPopup
          text='Are you sure you want to delete your account?'
          description='This action will delete all data associated with this account.'
          yesOption={handleDelete}
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
    const url = 'http://localhost:5000/user/delete-self/';
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    }).then( res => {
      // check to see if the server responded with a 200 request (ok)
      // if not, then reject the promise so that proper error handling can take place
      return res.json().then(() => {
          return res.ok ? Promise.resolve() : Promise.reject();
      });
  });
  }
}

export default DeleteAccountButton;