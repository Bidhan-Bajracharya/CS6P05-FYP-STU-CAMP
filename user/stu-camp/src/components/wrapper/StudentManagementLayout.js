import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "../Layout/AdminNav";
import StudentManagementSideBoard from "../Layout/StudentManagementSideBoard";

const StudentManagementLayout = () => {
  return (
    <>
      <AdminNav />
      <StudentManagementSideBoard />
      <Outlet />
    </>
  );
};

export default StudentManagementLayout;
