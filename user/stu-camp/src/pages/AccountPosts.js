import React from "react";
import SettingNav from "../components/Layout/SettingNav";
import SettingSideBoard from "../components/Layout/SettingSideBoard";
import H1 from "../components/UI/H1";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Post from "../components/content/Post";
import SettingWrapper from "../components/UI/SettingWrapper";

const AccountPosts = (props) => {
  return (
    <>
      <SettingNav />
      <SettingSideBoard />

      <SettingWrapper>
        <div className="flex flex-row items-center mx-3 mb-5 bg-[#FA8128] rounded-lg h-fit p-2 lg:w-[50%]">
          <Avatar
            size={90}
            icon={<UserOutlined />}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              position: "static",
              marginLeft: "10px",
              boxShadow: "0 0 0 2px #893101",
            }}
          />

          <div className="flex flex-col ml-6">
            <h1 className="text-white font-medium">Name:</h1>
            <h1 className="text-white font-medium">Department:</h1>
            <h1 className="text-white font-medium">University ID:</h1>
            <h1 className="text-white font-medium">College Mail:</h1>
          </div>
        </div>
        <H1>Posts you have made</H1>

        <div className="px-3 min-h-screen dark:bg-tb">
          <Post />
        </div>
      </SettingWrapper>
    </>
  );
};

export default AccountPosts;
