import React from "react";
import { FiMail } from "react-icons/fi";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { useSelector } from "react-redux";

const PeopleList = ({ fname, department, email, profile_pic, isAdmin }) => {
  const { isDark } = useSelector((store) => store.theme);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <>
      <div className="flex flex-row items-center mb-2 mt-3 px-4">
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            position: "static",
            marginRight: "20px",
            width: "45px",
          }}
          src={
            profile_pic !== "default" && (
              <img alt="user" src={PF + "/" + profile_pic} />
            )
          }
        />
        <div className="flex flex-row justify-between w-full">
          {!isAdmin && <h3 className="font-medium mb-0 text-lg dark:text-white">
            {fname}, {department}
          </h3>}

          {isAdmin && <h3 className="font-medium mb-0 text-lg dark:text-white">
            {fname}
          </h3>}

          <Tooltip placement="bottomRight" title={email}>
            <a href={`mailto:${email}`}>
            <FiMail size={30} color={isDark ? "white" : ""} />
            </a>
          </Tooltip>
        </div>
      </div>
      <hr className="dark:bg-sg h-[1px] border-0 bg-[#D3CDCD]" />
    </>
  );
};

export default PeopleList;
