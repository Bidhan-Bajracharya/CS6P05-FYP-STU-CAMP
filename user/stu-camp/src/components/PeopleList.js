import React from "react";
import { FiMail } from "react-icons/fi";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { useSelector } from "react-redux";

const PeopleList = ({ fname, department, email }) => {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <>
      <div className="flex flex-row items-baseline mb-2 mt-3 px-4">
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
        />
        <div className="flex flex-row justify-between w-full">
          <h3 className="font-medium text-lg dark:text-white">
            {fname}, {department}
          </h3>

          <Tooltip placement="bottomRight" title={email}>
            <FiMail size={30} color={isDark ? "white" : ""} />
          </Tooltip>
        </div>
      </div>
      <hr className="dark:bg-sg h-[1px] border-0 bg-[#D3CDCD]" />
    </>
  );
};

export default PeopleList;
