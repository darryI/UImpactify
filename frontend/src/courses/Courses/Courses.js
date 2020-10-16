import React from 'react';

import CourseList from '../CourseList/CourseList.js';
import CreationForm from '../CreationForm/CreationForm.js';
import CourseInfo from '../CourseInfo/CourseInfo.js';

import jsonCourses from './courses.json';


function Courses(props) {
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  const [courses, setCourses] = React.useState([]);
  const [selected, setSelected] = React.useState(0);
  const [showForm, setShowForm] = React.useState(false);


  const intialValues = {
    id: '',
    name: '',
    objective:'',
    lrnOutcomes: '',
    published: false,
    instructor: '',
    students: []
  };

  const [formValues, setValues] = React.useState(intialValues);


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
    API.getCourses()
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
  }, [])

  const handleCreate = () => {
    setValues(intialValues);
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
        initialValues={intialValues}
        setValues={setValues}
        setShowForm={setShowForm}
        addCourse={addCourse}
        updateCourse={updateCourse}
        user={props.user}
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
        <h1>{`Courses ${props.user.name} is currently teaching:`} </h1>
        <CourseList courses={courses} selected={selected} handleCreate={handleCreate} handleSelection={handleSelection}/>
        {content}
      </div>
    );
  }
}

export const API = {
  getCourses:  () => {
    return Promise.resolve(jsonCourses); 
  },
}

export default Courses;
