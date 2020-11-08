import React from "react";
import {useHistory} from "react-router-dom";

import { ReactComponent as SaveIcon } from 'icons/save.svg';

function CreationForm(props) {
  const values = props.values;
  const setValues = props.setValues;
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    // update state with the new course
    const jobJSON = {
      ...values,
    };

    var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
    if (props.isNewJob) {
      if ( jwtToken === null) {
        history.push("/login")
      } else {
        API.postJob(jobJSON, jwtToken.access_token).then(
          (result) => {
            jobJSON.id = result.id;
            props.addJob(jobJSON);
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
      // alert('A new job was created');
    } else {
      if ( jwtToken === null) {
        history.push("/login")
      } else {
        API.putJob(jobJSON, jwtToken.access_token).then(
          (result) => {
            props.updateJob(jobJSON);
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
  }


  const handleDescChange = (event) => {
    setValues({
      ...values,
      description: event.target.value,
    });
  }

  const handlePublishChange = (event) => {
    setValues({
      ...values,
      published: event.target.checked
    });
  }

  const handlePaidChange = (event) => {
    setValues({
      ...values,
      isPaid: event.target.checked
    });
  }

  return (
    <form aria-label="creation-form" className="creationForm" onSubmit={handleSubmit}>


      <label className="label-text">Description:</label>  
      <textarea aria-label="description-input" className="rect-2" placeholder="Enter the objective" type="text" value={values.description} onChange={e => handleDescChange(e)} />

      <div className="row">
        <div className="labelRectCombo">
          <label className="label-text">Publish?</label>
          <input aria-label="publish-input" type="checkbox" className="checkbox" checked={values.published} onChange={e => handlePublishChange(e)}></input>
        </div>
        <div className="labelRectCombo">
          <label className="label-text">Paid?</label>
          <input aria-label="paid-input" type="checkbox" className="checkbox" checked={values.isPaid} onChange={e => handlePaidChange(e)}></input>
        </div>
        <button aria-label="submit-button" className="rect-1627" type="submit"><SaveIcon/>Save</button>
        
      </div>
    </form>
  );
}

export const API = {
  // TODO: replace urls with actual api endpoint & implement authentication logic
  postJob(job, token) {
    return Promise.resolve({id: "5"});
  },

  putJob(job, token) {
    return Promise.resolve();
  }



  // postJob(job, token) {
  //   const url = 'http://localhost:5000/opportunities/';
  //   // Default options are marked with *
  //   return fetch(url, {
  //     method: 'POST', 
  //     mode: 'cors', 
  //     cache: 'no-cache', 
  //     credentials: 'same-origin', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(job) // body data type must match "Content-Type" header
  //   }).then( res => {
  //     // check to see if the server responded with a 200 request (ok)
  //     // if not, then reject the promise so that proper error handling can take place
  //     return res.json().then(json => {
  //         return res.ok ? json : Promise.reject(json);
  //     });
  // });
  // },

  // putJob(job, token) {
  //   const url = 'http://localhost:5000/opportunities/' + job.id + '/';
  //   // Default options are marked with *
  //   return fetch(url, {
  //     method: 'PUT', 
  //     mode: 'cors', 
  //     cache: 'no-cache', 
  //     credentials: 'same-origin', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(job) // body data type must match "Content-Type" header
  //   }).then( res => {
  //       // check to see if the server responded with a 200 request (ok)
  //       // if not, then reject the promise so that proper error handling can take place
  //       return res.json().then(json => {
  //           return res.ok ? json : Promise.reject(json);
  //       });
  //   });
  // },

}

export default CreationForm;