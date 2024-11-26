import React, { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";


const EventsDetails = () => {

  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


    useEffect(() => {
      const fetchEvent = async () => {
        const response = await fetch(`http://localhost:8080/events/${id}`);
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      };

      fetchEvent();
    }, [id, navigate]);

    if (loading) {
      return <p>Loading...</p>;
    }

    if (!event) {
      return (
        <div>
          <p>No event found</p>
          <button onClick={() => navigate("/events")}>Back to Events</button>
        </div>
      );
    }

    return (
      <div>
        <h1>{event.name}</h1>
        <p>{event.location}, {event.date}, {event.time}</p>
        <button onClick={() => navigate("/events")}>Back to Events</button>
      </div>
    )

}

export default EventsDetails;