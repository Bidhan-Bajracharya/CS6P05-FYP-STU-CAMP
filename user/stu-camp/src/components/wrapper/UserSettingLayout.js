import React from "react";
import { Outlet } from "react-router-dom";
import SettingNav from "../Layout/SettingNav";
import SettingSideBoard from "../Layout/SettingSideBoard";

const UserSettingLayout = () => {
  return (
    <>
      <SettingNav />
      <SettingSideBoard />
      <Outlet />
    </>
  );
};

export default UserSettingLayout;
