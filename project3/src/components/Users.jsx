import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const [newUser, setNewUser] = useState();
  const [userToBeDeleted, setUserToBeDeleted] = useState(undefined);

  const inputUser = (event) => {
    setNewUser(event.target.value);
  };

  const addUser = (name) => {
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then(() => {
        setNewUser("");
        fetchUsers();
      });
  };

  const fetchUsers = () => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  useEffect(() => {
    if (userToBeDeleted) {
      fetch("http://localhost:8080/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userToBeDeleted }),
      }).then(() => {
        setUserToBeDeleted(undefined);
      });
    }
  }, [userToBeDeleted]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [users]);

  if (users) {
    return (
      <div className ="users-container">
        <h1 className="users-header">List of Users</h1>
        <p>
        <input
          type="text"
          placeholder="Name here"
          value={newUser}
          onChange={inputUser}
        />
        <button onClick={() => addUser(newUser)}>Add User</button>
        </p>
        {users.map((user) => (
          <div key={user.id}>
            <p>{user.name} <button class="btn btn-delete" onClick={() => setUserToBeDeleted(user.name)}>Delete</button></p>

          </div>
        ))}
        <hr />
        <Link to="/events">Go to Events</Link>
      </div>
    );
  }
};

export default Users;
