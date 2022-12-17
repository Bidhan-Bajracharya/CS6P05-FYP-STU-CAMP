import React, { useState, useEffect } from "react";
import axios from "axios";

const Test = () => {
  const [users, setUsers] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // cancel our request, when component unmounts

    const getUsers = async () => {
      try {
        const response = await axios.get("/api/v1/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      <h1>Users</h1>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li>{user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users</p>
      )}
    </>
  );
};

export default Test;
