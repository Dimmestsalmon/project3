import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {

  return (
    <div className="home-page">
      <h1 className="header">Queue Buddy</h1>
      <Link className="join-queue" to="/queue">Join A Queue</Link>
      <Link className="available-events" to="/events">Available Events</Link>
    </div>
  );
};

export default Home;
