// For more about sending HTTP requests using ReactJS:
// https://reactjs.org/docs/faq-ajax.html
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// For more about Hooks:
// https://reactjs.org/docs/hooks-intro.html

import React from 'react';

function FetchTest() {

  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [post, setPost] = React.useState({});

  // Note: the empty deps array [] means this useEffect will run only once
  // similar to componentDidMount()
  React.useEffect(() => {
    API.getData()
      .then(
        (result) => {
          setIsLoaded(true);
          setPost(result);
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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="about-colour">
        <h1> {post.title} </h1>
        <h3> Poster: {post.userId} </h3>
        <h3> Post #: {post.id}</h3>
        <p> {post.body} </p>
      </div>
    );
  }
}

export const API = {
  getData() {
    const rand = Math.floor(1 + Math.random() * (100 - 1));
    return fetch("https://jsonplaceholder.typicode.com/posts/" + rand).then(res => res.json())
  }
}

export default FetchTest;