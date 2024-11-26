import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-page" >
      <h1 className="header">Queue Buddy</h1>
      <p className="join-queue">
        <Link to="/queue" style={{color: "white"}}>Queue List</Link>
      </p>
      <p className="available-events">
        <Link to="/events" style={{color: "white"}}>Available Events</Link>
      </p>
      <p className="users-list" >
        <Link to="/users" style={{color: "white"}}>List of Users</Link>
      </p>
    </div>
  );
};

export default Home;
