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
  }, []);

  if (queue.length > 0) {
    return (
      <div>
        <h1>List of Queue</h1>

        {queue.map((user, index) => (
          <div key={index}>
            <p>You are number {index + 1} in queue</p>
            <p>{user.user_name}</p>
            <p>{user.events_name}</p>
            <button onClick={() => setUserToBeDeleted(user.user_name)}>x</button>
          </div>
        ))}

        <hr />
        <Link to="/">Go to Home Page</Link>
      </div>
    );
  }
};

export default Queue;
