import React from 'react';

class FetchTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      post: {}
    };
  }

  componentDidMount() {
    const rand = Math.floor(1 + Math.random() * (100 - 1));
    fetch("https://jsonplaceholder.typicode.com/posts/" + rand)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            post: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, post } = this.state;
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
}

export default FetchTest;