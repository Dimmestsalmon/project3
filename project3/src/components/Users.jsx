import React, {useState, useEffect} from 'react';


const Users = () => {
  const [users, setUsers] = useState()
  const [newUser, setNewUser] = useState()
  const [userToBeDeleted, setUserToBeDeleted] = useState(undefined)

  const inputUser = (event) => {
    setNewUser(event.target.value)
  }

  const addUser = (newUser) =>{
      console.log(newUser)
      fetch('http://localhost:8080/users', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newUser })
      })
  }

  useEffect(() => {
    if (userToBeDeleted) {
      fetch('http://localhost:8080/users', {
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
        <>
      <p key = {index}>{user.name}</p>
      <button onClick = {(() => setUserToBeDeleted(user.name))}>x</button>
      </>

      )
    })}
    </>
  )
}
}

export default Users