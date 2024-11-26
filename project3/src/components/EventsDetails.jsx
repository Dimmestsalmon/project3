import React, { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";

const EventsDetails = () =>  {

    const{eventId} = useParams();
    const [event, setEvent] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
      const fetchEvent = async () => {
        try {
          const response = await fetch(`http://localhost:8080/events${eventId}`);
          const data = await response.json;
          setEvent(data);
        } catch (error) {
          console.error('Error fetching event', error);
        }
      };

      fetchEvent();
    }, [eventId, navigate]);

    return (
      <div>
        <h1>{event.name}</h1>
        <p>{event.location}, {event.date}, {event.time}</p>
      </div>
    )

}

export default EventsDetails;