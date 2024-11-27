import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user details
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/users/${id}`);
        if (!res.ok) {
          throw new Error(res.status === 404 ? "User not found" : "Failed to fetch user details");
        }
        const data = await res.json();
        setUser(data);

        // Fetch event names for queued events
        const eventDetails = await Promise.all(
          data.event_ids.map(async (eventId) => {
            const eventRes = await fetch(`http://localhost:8080/events/${eventId}`);
            const eventData = await eventRes.json();
            return eventData;
          })
        );
        setEvents(eventDetails);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={() => navigate("/users")}>Back to Users</button>
      </div>
    );
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-details">
      <h1>{user.name}</h1>
      <p>
        <strong>User ID:</strong> {user.id}
      </p>
      <p>
        <strong>Queued Events:</strong>
      </p>
      <ul>
        {events.length > 0 ? (
          events.map((event) => <li key={event.id}>{event.name}</li>)
        ) : (
          <li>No events queued</li>
        )}
      </ul>
      <button onClick={() => navigate("/users")}>Back to Users</button>
    </div>
  );
};

export default UserDetails;

