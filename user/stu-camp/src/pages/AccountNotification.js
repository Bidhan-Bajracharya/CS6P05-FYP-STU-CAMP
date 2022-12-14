import React from "react";
import SettingNav from "../components/Layout/SettingNav";
import SettingSideBoard from "../components/Layout/SettingSideBoard";
import H1 from "../components/UI/H1";
import SettingWrapper from "../components/UI/SettingWrapper";
import { Switch } from "antd";
import "../styles/navbar.css";

const AccountNotification = () => {
  return (
    <>
      <SettingNav />
      <SettingSideBoard />

      <SettingWrapper>
        <H1>Manage email notifications</H1>

        <div className="flex flex-col bg-[#DBD4D4] dark:bg-sg mx-2 p-2">
          <h1 className="text-xl dark:text-[#DBD4D4]">Comments and replies</h1>

          <div className="flex flex-row items-center">
            <div className="switch mr-5">
              <Switch defaultChecked />
            </div>

            <div className="flex flex-col items-baseline">
              <h1 className="mb-0 text-lg dark:text-[#DBD4D4]">Comments</h1>
              <p className="mb-0 text-[#525050] dark:text-gray-400">
                Email me of comments on my content
              </p>
            </div>
          </div>
        </div>
      </SettingWrapper>
    </>
  );
};

export default AccountNotification;
