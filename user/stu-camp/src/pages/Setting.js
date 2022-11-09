import React from "react";
import SettingNav from "../components/Layout/SettingNav";
import SettingSideBoard from "../components/SettingSideBoard";
import H1 from "../components/UI/H1";
import SettingWrapper from "../components/UI/SettingWrapper";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Setting = () => {
  return (
    <>
      <SettingNav />
      <SettingSideBoard />

      <SettingWrapper>
        <H1>Edit Profile</H1>

        <div className="ml-7 mb-5">
          {/* Edit profile div */}
          <div className="flex flex-row items-center">
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

            <button
              type="button"
              className="bg-[#ED820E] rounded-lg h-12 p-2 ml-5 text-white w-32 hover:bg-[#FC6A03]"
            >
              Change Photo
            </button>
          </div>
          <div className="mt-5 ml-3 dark:text-white">
            <p className="mb-0">Upload new avatar.</p>
            <p className="mb-0">
              Maximum upload size is{" "}
              <span className="font-semibold m-0">1MB.</span>
            </p>
          </div>
        </div>

        <H1>Reset Password</H1>

        <div className="flex flex-col ml-7">
          <input
            type="text"
            id="new_password"
            autoComplete="off"
            className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
            placeholder="New password..."
          />

          <input
            type="text"
            id="re_password"
            autoComplete="off"
            className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
            placeholder="Re-write password..."
          />

          <button
            type="button"
            className="bg-[#ED820E] rounded-lg h-12 p-2 text-white w-32 hover:bg-[#FC6A03]"
          >
            Reset
          </button>

          <p className="italic text-[#808080] text-sm font-light mt-3">Passwords of minimum length 8 is recommended with special characters and numbers.</p>
        </div>

        <H1>Sign-out</H1>
        <button
            type="button"
            className="bg-[#ED820E] rounded-lg h-12 p-2 text-white w-32 hover:bg-[#FC6A03] ml-7"
          >
            Sign out
          </button>
      </SettingWrapper>
    </>
  );
};

export default Setting;
