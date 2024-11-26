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
