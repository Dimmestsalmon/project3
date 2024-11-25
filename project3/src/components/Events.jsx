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

  // for input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };
  // const addUser = (newUser) =>{
  //   console.log('fetching')
  //     fetch('http://localhost:8080/users', {
  //       method: "POST",
  //       body: JSON.stringify({ "name": newUser })
  //     })
  //     .then(data => console.log(data))
  // }
  useEffect(()=>{
      fetch('http://localhost:8080/users')
      .then(res => res.json())
      .then (data => setUsers(data))
  }, [])
  if(users){
  return (
    <>
    <h1>List of Users</h1>
    <input type = 'text' placeholder = 'Name here' onChange = {inputUser}/>
    <button onClick={() => addUser(newUser)}>Add User</button>
    {users.map((user, index) => {
      return (
      <p key = {index}>{user.name}</p>
      )
    })}
    </>
  )
}
}
export default Events