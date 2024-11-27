import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Queue = () => {
  const [queue, setQueue] = useState([]);
  const [userToBeDeleted, setUserToBeDeleted] = useState(undefined);

  useEffect(() => {
    if (userToBeDeleted) {
      fetch("http://localhost:8080/queue", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userToBeDeleted }),
      }).then(() => {
        setUserToBeDeleted(undefined);
      });
    }
  }, [userToBeDeleted]);

  useEffect(() => {
    fetch("http://localhost:8080/queue")
      .then((res) => res.json())
      .then((data) => setQueue(data));
  }, [userToBeDeleted]);

  if (queue.length > 0) {
    return (
      <div className ="queue-container">
        <h1 className ="queue-header">List of Queue</h1>

        {queue.map((user, index) => (
          <div key={index}>
            <p>{user.user_name} you are #{index + 1} in queue for {user.events_name} </p>


            <button className ="remove-button" onClick={() => setUserToBeDeleted(user.user_name)}>Remove</button>
          </div>
        ))}

        <hr />
        <Link to="/">Home Page</Link>
        <Link to="/events">Event Listing</Link>
      </div>
    );
  }
};

export default Queue;
