import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../Layout/AdminNav";

const AdminLayout = () => {
  return (
    <>
      <AdminNav />
      <Outlet />
    </>
  );
};

export default AdminLayout;
