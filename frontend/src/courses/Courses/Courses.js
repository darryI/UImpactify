import React from 'react';
import {useHistory} from 'react-router-dom';

import CourseList from '../CourseList/CourseList.js';
import CreationForm from '../CreationForm/CreationForm.js';
import CourseInfo from '../CourseInfo/CourseInfo.js';


function Courses(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [courses, setCourses] = React.useState([]);
  const [selected, setSelected] = React.useState(0);
  const [showForm, setShowForm] = React.useState(false);

  const history = useHistory();

  const initialValues = {
    name: '',
    objective:'',
    learningOutcomes: '',
    published: false,
    students: []
  };

  const [formValues, setValues] = React.useState(initialValues);


  // add a new course to the list
  const addCourse = (values) => {
    setCourses([...courses, values]);
  }

  // update a pre-existing course in the list
  const updateCourse = (values) => {
    let crs = [...courses];
    crs[selected] = values;
    setCourses(crs);
  }

  React.useEffect(() => {
    var token = JSON.parse(localStorage.getItem("jwtAuthToken"))
    if ( token === null) {
        history.push("/login")
    } else {

        API.getCourses(token.access_token)
          .then(
            (result) => {
                setIsLoaded(true);
                setCourses(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }
  }, [])

  const handleCreate = () => {
    setValues(initialValues);
    setSelected(courses.length);
    setShowForm(true);
  }

  const handleSelection = (index) => {
    setShowForm(false);
    setSelected(index);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    let content;
    if (selected === courses.length || showForm === true) {
      content = <CreationForm
        values={formValues}
        initialValues={initialValues}
        setValues={setValues}
        setShowForm={setShowForm}
        addCourse={addCourse}
        updateCourse={updateCourse}
        isNewCourse={selected === courses.length}
      />
    } else {
      content = <CourseInfo 
        setFormValues={setValues} 
        setShowForm={setShowForm} 
        course={courses[selected]} 
      />
    }

    return (
      <div>
        {/* <h1>{`Courses ${props.user.name} is currently teaching:`} </h1> */}
        <CourseList courses={courses} selected={selected} handleCreate={handleCreate} handleSelection={handleSelection}/>
        {content}
      </div>
    );
  }
}

export const API = {
  getCourses: async (token) => {
    const url = "http://localhost:5000/course/instructor/";
    console.log(token);
      return fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }).then(res => res.json());
  },
}

export default Courses;
