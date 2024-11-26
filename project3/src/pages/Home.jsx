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

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Queue Buddy</h1>
      <p>
        <Link to="/queue">Queue List</Link>
      </p>
      <p>
        <Link to="/events">Available Events</Link>
      </p>
      <p>
        <Link to="/users">List of Users</Link>
      </p>
    </div>
  );
};

export default Home;
