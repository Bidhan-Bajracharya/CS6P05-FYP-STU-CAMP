import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import AdminNav from "../Layout/AdminNav";
import useAuth from "../../hooks/useAuth";

const PeopleLayout = () => {
  const { auth } = useAuth();
  const role = auth.roles;

  return (
    <>
      {role[0] === 1991 ? (
        <>
          <AdminNav />
          <Outlet />
        </>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default PeopleLayout;
