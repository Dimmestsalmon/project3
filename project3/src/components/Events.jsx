import React, { useState, useEffect } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]); // State for events list
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    date: '',
    time: '',
  }); // State for new event input
  const [error, setError] = useState(null); // State for error handling

  // Fetch events from the server
  useEffect(() => {
    fetch('http://localhost:8080/events')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch events');
        }
        return res.json();
      })
      .then((data) => setEvents(data))
      .catch((err) => setError(err.message));
  }, []);

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Add a new event
  const addEvent = () => {
    const { name, location, date, time } = newEvent;
    if (!name || !location || !date || !time) {
      alert('All fields are required');
      return;
    }

    fetch('http://localhost:8080/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add event');
        }
        return res.json();
      })
      .then((addedEvent) => {
        setEvents((prevEvents) => [...prevEvents, addedEvent]); // Add the new event to the list
        setNewEvent({ name: '', location: '', date: '', time: '' }); // Reset the input form
      })
      .catch((err) => setError(err.message));
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Events</h1>

      <h2>Add New Event</h2>
      <form
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
        events.map((event) => (
          <p key={event.id}>
            <strong>{event.name}</strong> at {event.location} on {event.date} at {event.time}
          </p>
        ))
      ) : (
        <p>No events found</p>
      )}
    </div>
  );
};

export default Events;
