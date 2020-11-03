import React from "react";
import './ConfirmationPopup.css';

function ConfirmationPopup(props) {

  return (
    <div className='popup'>
      <div className='popup_inner'>
        <h1>{props.text}</h1>
        <p>{props.description}</p>
        <button onClick={props.yesOption}>Yes</button>
        <button onClick={props.noOption}>No</button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;