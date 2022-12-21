import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Test = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // cancel our request, when component unmounts

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users/people", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data.users);
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
      <article>
        <h2>Users List</h2>
        {users?.length ? (
          <ul>
            {users.map((user, i) => (
              <li key={i}>{user?.name}</li>
            ))}
          </ul>
        ) : (
          <p>No users to display</p>
        )}
      </article>
      <Link to="/">Go home</Link>
    </>
  );
};

export default Test;
