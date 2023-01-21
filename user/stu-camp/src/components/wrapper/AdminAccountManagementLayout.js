import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../Layout/AdminNav";
import AdminAccountSideBoard from "../Layout/AdminAccountSideBoard";

const AdminAccountManagementLayout = () => {
  return (
    <>
      <AdminNav />
      <AdminAccountSideBoard />
      <Outlet />
    </>
  );
};

export default AdminAccountManagementLayout;
