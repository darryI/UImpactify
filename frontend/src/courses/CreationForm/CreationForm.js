import React from "react";

import { ReactComponent as SaveIcon } from 'icons/save.svg';

import './CreationForm.css';

function CreationForm(props) {
  const values = props.values;
  const setValues = props.setValues;

  const handleSubmit = (event) => {
    event.preventDefault();
    // update state with the new course
    const courseJSON = {
      ...values,
      instructor: props.user.id,
    };

    // reset form values
    setValues(props.initialValues);
    
    // navigate away from the creation form after submitting
    props.setShowForm(false);
    
    if (props.isNewCourse) {
      props.addCourse(courseJSON);
      API.postCourse(courseJSON);
      alert('A new course was created');
    } else {
      props.updateCourse(courseJSON);
      API.putCourse(courseJSON);
      alert('A course was updated');
    }
  }

  const handleNameChange = (event) => {
    setValues({
      ...values,
      name: event.target.value,
    });
  }

  const handleObjChange = (event) => {
    setValues({
      ...values,
      objective: event.target.value,
    });
  }

  const handleLrnChange = (event) => {
    setValues({
      ...values,
      lrnOutcomes: event.target.value,
    });
  }

  const handlePublishChange = (event) => {
    setValues({
      ...values,
      published: event.target.checked
    });
  }

  return (
    <form aria-label="creation-form" className="creationForm" onSubmit={handleSubmit}>
      <div className="labelRectCombo">
        <label className="label-text courseName">Course Name:</label>  
        <input aria-label="name-input" className="rect-1643"   type="text" value={values.name} onChange={e => handleNameChange(e)} />
      </div>

      <textarea aria-label="obj-input" className="rect-2" placeholder="Objective:" type="text" value={values.objective} onChange={e => handleObjChange(e)} />

      <textarea aria-label="lrn-input" className="rect-2" placeholder="Learning Outcomes:" type="text" value={values.lrnOutcomes} onChange={e => handleLrnChange(e)} />

      <div className="row">
        <div className="labelRectCombo">
          <label className="label-text">Publish?</label>
          <input aria-label="publish-input" type="checkbox" className="checkbox" checked={values.published} onChange={e => handlePublishChange(e)}></input>
        </div>
        <button aria-label="submit-button" className="rect-1627" type="submit"><SaveIcon/><p>Save</p></button>
        
      </div>

    </form>
  );
}

export const API = {
  // TODO: replace urls with actual api endpoint & implement authentication logic

  postCourse(data) {
    const url = "https://jsonplaceholder.typicode.com/posts/";
    return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  },

  putCourse(data) {
    const url = "https://jsonplaceholder.typicode.com/posts/";
    return fetch(url, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
  }

}

export default CreationForm;