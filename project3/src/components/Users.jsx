import React, {useState, useEffect} from 'react';


const Users = () => {
  const [users, setUsers] = useState()
  useEffect(()=>{
      fetch('http://localhost:8080/users')
      .then(res => res.json())
      .then (data => setUsers(data))
  }, [])
  if(users){
  return (
    <>
    <h1>List of Users</h1>
    {users.map((user, index) => {
      return (
      <p key = {index}>{user.name}</p>
      )
    })}
    </>
  )
}
}

export default Users