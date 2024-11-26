import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:8080/users/${id}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("User not found");
          }
          throw new Error("Failed to fetch user details");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, [id]);


  if (!user) {
    return <p>Loading...</p>;
  }


  return (
    <div>
      <h2>User Details</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={() => navigate("/users")}>Back to Users</button>
    </div>
  );
};

export default UserDetails;


