import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../Layout/AdminNav";
import AdminSideBoard from "../Layout/AdminSideBoard";

const AdminSettingLayout = () => {
  return (
    <>
      <AdminNav />
      <AdminSideBoard />
      <Outlet />
    </>
  );
};

export default AdminSettingLayout;
