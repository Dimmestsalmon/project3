import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Events = () => {
  const [eventName, setEventName] = useState();
  const [newQueue, setnewQueue] = useState();
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    location: "",
    date: "",
    time: "",
  });
  const [error, setError] = useState(null);

  const inputEvent = (event) => {
    setnewQueue(event.target.value);
    setEventName(event.target.className);
  };

  //add event and user to queue
  const addToQueue = (newQueue, eventName) => {
    fetch("http://localhost:8080/queue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_name: newQueue, event_name: eventName }),
    });
  };

  // Fetch events from the server
  useEffect(() => {
    fetch("http://localhost:8080/events")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const formatDateTime = (isoString, timeString) => {
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

  // Add a new event
  const addEvent = () => {
    const { name, location, date, time } = newEvent;
    if (!name || !location || !date || !time) {
      alert("All fields are required");
      return;
    }

    fetch("http://localhost:8080/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to add event");
        }
        return res.json();
      })
      .then((addedEvent) => {
        setEvents((prevEvents) => [...prevEvents, addedEvent]);
        setNewEvent({ name: "", location: "", date: "", time: "" });
      })
      .catch((err) => setError(err.message));
  };

  // Delete an event
  const deleteEvent = (id) => {
    fetch(`http://localhost:8080/events/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete event");
        }
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== id)
        ); // Remove the event from the list
      })
      .catch((err) => setError(err.message));
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="events-container">
      <h1 className="events-header">Events</h1>

      <h2>Add New Event</h2>
      <form className ="events-form"
        onSubmit={(e) => {
          e.preventDefault(); // Prevent page refresh on form submission
          addEvent();
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={newEvent.location}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="date"
          placeholder="Event Date"
          value={newEvent.date}
          onChange={handleInputChange}
        />
        <input
          type="time"
          name="time"
          placeholder="Event Time"
          value={newEvent.time}
          onChange={handleInputChange}
        />
        <button type="submit">Add Event</button>
      </form>

      <h2>List of Events</h2>
      {events.length > 0 ? (
        events.map((event) => {
          const { date, time } = formatDateTime(event.date, event.time);
          return (
            <div key={event.id}>
              <p>
                <strong>{event.name}</strong> at {event.location} on {date} at{" "}
                {time} PST
              </p>
              <p>
                <Link to={`/events/${event.id}`}>View Event Details</Link>
                <button onClick={() => deleteEvent(event.id)}>Delete</button>
              </p>
              <input
                className={event.name}
                type="text"
                placeholder="Name here"
                onChange={inputEvent}
              />
              <button onClick={() => addToQueue(newQueue, eventName)}>
                Add User
              </button>
            </div>
          );
        })
      ) : (
        <p>No events found</p>
      )}
      <hr />
      <Link to="/queue">Go to Queue</Link>
      <Link to="/">Home Page</Link>
    </div>
  );
};

export default Events;
