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
    };

    
    if (props.isNewCourse) {
      API.postCourse(courseJSON, props.accessToken).then(
        (result) => {
          courseJSON.id = result.id;
          props.addCourse(courseJSON);
          // reset form values
          setValues(props.initialValues);
          // navigate away from the creation form after submitting
          props.setShowForm(false);
        },
        (error) => {
            alert(JSON.stringify(error));
        }
      );
    } else {
      API.putCourse(courseJSON, props.accessToken).then(
        (result) => {
          props.updateCourse(courseJSON);
          // reset form values
          setValues(props.initialValues);
          // navigate away from the creation form after submitting
          props.setShowForm(false);
        },
        (error) => {
            alert(JSON.stringify(error));
        }
      );
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
      learningOutcomes: event.target.value,
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

      <label className="label-text">Objective:</label>  
      <textarea aria-label="obj-input" className="rect-2" placeholder="Enter the objective" type="text" value={values.objective} onChange={e => handleObjChange(e)} />

      <label className="label-text">Learning Outcomes:</label>  
      <textarea aria-label="lrn-input" className="rect-2" placeholder="Enter the learning outcomes" type="text" value={values.learningOutcomes} onChange={e => handleLrnChange(e)} />

      <div className="row">
        <div className="labelRectCombo">
          <label className="label-text">Publish?</label>
          <input aria-label="publish-input" type="checkbox" className="checkbox" checked={values.published} onChange={e => handlePublishChange(e)}></input>
        </div>
        <button aria-label="submit-button" className="rect-1627" type="submit"><SaveIcon/>Save</button>
        
      </div>
    </form>
  );
}

export const API = {
  // TODO: replace urls with actual api endpoint & implement authentication logic

  postCourse(course, token) {
    const url = 'http://localhost:5000/course/';
    // Default options are marked with *
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
    }).then( res => {
      // check to see if the server responded with a 200 request (ok)
      // if not, then reject the promise so that proper error handling can take place
      return res.json().then(json => {
          return res.ok ? json : Promise.reject(json);
      });
  });
  },

  putCourse(course, token) {
    const url = 'http://localhost:5000/course/' + course.id;
    // Default options are marked with *
    return fetch(url, {
      method: 'PUT', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(course) // body data type must match "Content-Type" header
    }).then( res => {
        // check to see if the server responded with a 200 request (ok)
        // if not, then reject the promise so that proper error handling can take place
        return res.json().then(json => {
            return res.ok ? json : Promise.reject(json);
        });
    });
  },

}

export default CreationForm;