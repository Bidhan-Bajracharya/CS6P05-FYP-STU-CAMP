import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
    {/* represents all the children component inside Layout */}
      <Outlet />
    </>
  );
};

export default Layout;
