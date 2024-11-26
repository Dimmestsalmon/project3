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

    const formatDateTime = (isoString, timeString) => {
      if (!isoString || !timeString) {
        return { date: "Unknown Date", time: "Unknown Time" };
      }

      const date = new Date(isoString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      const time = new Date(`1970-01-01T${timeString}`).toLocaleTimeString(
        "en-US",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      );

      return { date, time };
    };

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

    const { date, time } = formatDateTime(event.date, event.time);

    return (
      <div className ="event-details">
        <h1>{event.name}</h1>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Date:</strong> {date}
        </p>
        <p>
          <strong>Time:</strong> {time} PST
        </p>
        <button onClick={() => navigate("/events")}>Back to Events</button>
      </div>
    );
  };

  export default EventsDetails;