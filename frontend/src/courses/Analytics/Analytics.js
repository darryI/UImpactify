import React from 'react';
import './Analytics.css';


function Analytics(props) {
  // views states
  const [viewsError, setViewsError] = React.useState(null);
  const [viewsLoaded, setViewsLoaded] = React.useState(false);

  const [views, setViews] = React.useState(0);


  // enrolled states
  const [enrolledError, setEnrolledError] = React.useState(null);
  const [enrolledLoaded, setEnrolledLoaded] = React.useState(false);

  const [enrolled, setEnrolled] = React.useState(0);


  // quiz states
  const [quizsError, setQuizsError] = React.useState(null);
  const [quizsLoaded, setQuizsLoaded] = React.useState(false);
  const [quizs, setQuizs] = React.useState(0);

  React.useEffect(() => {
    var token = JSON.parse(localStorage.getItem("jwtAuthToken"))
    API.getViews(token.access_token, props.course)
      .then(
        (result) => {
          setViewsLoaded(true);
          setViews(result.views);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setViewsLoaded(true);
          setViewsError(error);
        }
      );

    API.getEnrolled(token.access_token, props.course)
    .then(
      (result) => {
        setEnrolledLoaded(true);
        setEnrolled(result.students);
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setEnrolledLoaded(true);
        setEnrolledError(error);
      }
    );

    API.getQuizs(token.access_token, props.course)
    .then(
      (result) => {
        setQuizsLoaded(true);
        setQuizs(result.quizzes);
        console.log(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setQuizsLoaded(true);
        setQuizsError(error);
      }
    );


      
  }, []);


  let viewsContent;

  if (viewsLoaded) {
    if (viewsError == null) {
      viewsContent = 
      <div>
        <p>This course's homepage has been viewed <strong>{views}</strong>  { views > 1 ? 'times' : 'time'}</p>
      </div>
    } else {
      viewsContent = 
      <div>
        <p>Looks like no one has seen your course yet... Have you published it?</p>
      </div>
    }  
  }

  let enrolledContent;

  if (enrolledLoaded) {
    if (enrolledError == null && enrolled > 0) {
      console.log("success!", enrolled);
      enrolledContent = 
      <div>
        <p>There { enrolled > 1 ? 'are' : 'is'} currently <strong>{enrolled}</strong> { enrolled > 1 ? 'students' : 'student'} enrolled in this course.</p>
      </div>
    } else {
      console.log("fail!", enrolledError);
      enrolledContent = 
      <div>
        <p>Nobody has enrolled in your course yet!</p>
      </div>
    }  
  }

  let quizsContent;

  if (quizsLoaded) {
    if (quizsError == null && quizs > 0) {
      console.log("success!", quizs);
      quizsContent = 
      <div>
        <p>There { quizs > 1 ? 'are' : 'is'} currently <strong>{quizs}</strong> { quizs > 1 ? 'quizzes' : 'quiz'} published for this course. Your students are busy studying!</p>
      </div>
    } else {
      console.log("fail!", quizsError);
      quizsContent = 
      <div>
        <p>You haven't published a quiz yet! Your students are waiting!</p>
      </div>
    }  
  }

  let analyticContent;
  // wait for all requests to complete before showing anything
  // the render time might be too slow for some people so might want to change this later
  if (enrolledLoaded && viewsLoaded && quizsLoaded) {
    analyticContent =
      <div>
        <h3>👀 How many people have seen my course?</h3>
        <blockquote>
          {viewsContent}
        </blockquote>
        
        <h3>📚 How many students are enrolled?</h3>
        <blockquote>
          {enrolledContent}
        </blockquote>

        <h3>🎓 How many quizzes have been published for this course?</h3>
        <blockquote>
          {quizsContent}
        </blockquote>
        
      </div>
  } else {
    analyticContent = 
      <div>
        <p>Hacking into the mainframe...</p> 
      </div>
  }


  return (
    <div className="analytics-card">
      <h1>Welcome to Analytics for {props.course.name}</h1>
      <h2>Use the FAQ below to better understand your course and community!</h2>
      {analyticContent}
    </div>

  );
}

export const API = {
    getEnrolled: async (token, course) => {
      const url = "http://localhost:5000/analytics/enrolled/" + course.id + "/";
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const json = await res.json();
      return res.ok ? json : Promise.reject(json);
    },

    getViews: async (token, course) => {
      const url = "http://localhost:5000/analytics/views/" + course.id + "/";
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const json = await res.json();
      return res.ok ? json : Promise.reject(json);
    },

    getQuizs: async (token, course) => {
      const url = "http://localhost:5000/analytics/quizs/" + course.id + "/";
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      const json = await res.json();
      return res.ok ? json : Promise.reject(json);
    },
}

export default Analytics;