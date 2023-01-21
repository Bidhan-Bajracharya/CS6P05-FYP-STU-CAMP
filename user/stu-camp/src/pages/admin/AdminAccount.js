import React from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const AdminAccount = () => {
  const { name, userType, profile_pic, email } = useSelector(
    (store) => store.user
  );

  return (
    <SettingWrapper>
      <H1>Profile</H1>

      <section className="flex flex-col items-center">
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

        <div className="flex flex-col bg-[#FA8128] rounded-lg mt-5 w-[80%] items-center">
          <h1 className="text-lg font-semibold">About you</h1>

          <div className="flex flex-col w-full px-3">
            <div>Full Name: {name}</div>
            <div>Role: {userType ? 'Admin' : ''}</div>
            <div>Email Address: {email}</div>
          </div>
        </div>
      </section>
    </SettingWrapper>
  );
};

export default AdminAccount;
