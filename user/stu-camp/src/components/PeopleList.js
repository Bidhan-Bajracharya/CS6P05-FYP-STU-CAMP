import React from "react";
import { FiMail } from "react-icons/fi";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { useSelector } from "react-redux";

const PeopleList = ({ fname, department }) => {
  const { isDark } = useSelector((store) => store.theme);
  const text = "np01cp4s210048@gmail.com";

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

          <Tooltip placement="bottomRight" title={text}>
            <FiMail size={30} color={isDark ? "white" : ""} />
          </Tooltip>
        </div>
      </div>
      <hr />
    </>
  );
};

export default PeopleList;
