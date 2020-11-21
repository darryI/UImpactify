import React from 'react';
import { useHistory } from "react-router-dom";
import DashboardCourseCard from './DashboardCourseCard/DashboardCourseCard'
import DeleteAccountButton from '../DeleteAccount/DeleteAccountButton';
import './StudentDashboard.css';
import StudentInfo from './StudentInfo/StudentInfo';

function StudentDashboard(props) {
    const [error, setError] = React.useState(null);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const history = useHistory();

    const [courses, setCourses] = React.useState([]);

    const setLoggedIn = props.setLoggedIn;

    let delAccButton;
    delAccButton = <DeleteAccountButton setLoggedIn={setLoggedIn} />

    React.useEffect(() => {
      var jwtToken = JSON.parse(localStorage.getItem("jwtAuthToken"))
      if (jwtToken) {
        API.getCourses(jwtToken.access_token)
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
      } else {
        history.push("./login")
        delAccButton = null
      }
    }, [])

    const dashboardCourseCards = courses.map(c => <DashboardCourseCard key={c.id} course={c}/>);

    if (error) {
        return <p>courses could not be loaded</p>
    } else if (!isLoaded) {
        return <p>... loading</p>
    } else {
        return (
            <div className="student-dashboard">  
                <div>
                    <StudentInfo />
                </div>
                <div className="middle">
                    {dashboardCourseCards}
                </div>
                <div>
                    {delAccButton}
                </div>
            </div>
        ); 
    }
}

export const API = {
    getCourses: async (token) => {
      const url = "http://localhost:5000/course/student/";
  
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

export default StudentDashboard;