import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div>
      <h1>Queue Buddy</h1>
      <Link to="/queue">Join A Queue</Link>
      <Link to="/events">Available Events</Link>
    </div>
  );
};

export default Home;
