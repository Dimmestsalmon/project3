import React, {useState, useEffect} from 'react';


const Queue = () => {
  const [queue, setQueue] = useState()
  const [newUser, setNewUser] = useState()
  const [userToBeDeleted, setUserToBeDeleted] = useState(undefined)
  const inputUser = (event) => {
    setNewUser(event.target.value)
  }

  const addUser = (newUser) =>{
      console.log(newUser)
      fetch('http://localhost:8080/queue', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newUser })
      })
  }

  useEffect(() => {
    if (userToBeDeleted) {
      fetch('http://localhost:8080/queue', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userToBeDeleted }),
      })
        .then(() => {
          setUserToBeDeleted(undefined);
        })
    }
  }, [userToBeDeleted])


  useEffect(()=>{
      fetch('http://localhost:8080/queue')
      .then(res => res.json())
      .then (data => setQueue(data))
  }, [])

  if(queue){
  return (
    <>
    <h1>List of queue</h1>
    <input type = 'text' placeholder = 'Name here' onChange = {inputUser}/>
    <button onClick={() => addUser(newUser)}>Add User</button>
    {queue.map((user, index) => {
      return (
        <>
      <p>{Math.floor(Math.random() * (100) + 1)}</p>
      <p key = {index}>{user.user_name}</p>
      <p>{user.events_name}</p>
      <button onClick = {(() => setUserToBeDeleted(user.user_name))}>x</button>
      </>

      )
    })}
    </>
  )
}
}

export default Queue