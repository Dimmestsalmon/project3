import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("User not found");
          }
          throw new Error("Failed to fetch user details");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p>
        <strong>User ID:</strong> {user.id}
      </p>
      <p>
        <strong>Queued Events:</strong>
      </p>
      <ul>
        {user.event_ids.length > 0 ? (
          user.event_ids.map((eventId) => <li key={eventId}>{eventId}</li>)
        ) : (
          <li>No events queued</li>
        )}
      </ul>
      <button onClick={() => navigate("/users")}>Back to Users</button>
    </div>
  );
};

export default UserDetails;
