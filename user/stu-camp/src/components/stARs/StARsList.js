import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

const StARsList = ({ fname, department, section, email }) => {
  return (
    <>
      <div className="flex flex-row justify-between pt-1 hover:bg-[#DFDFDF] dark:hover:bg-sg">
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            position: "static",
          }}
        />
        <div className="w-32 max-w-[128px] overflow-hidden lg:max-xl:ml-2">
          <Tooltip placement="bottomLeft" title={email}>
            <h1 className="mb-0 dark:text-white">{fname}</h1>
          </Tooltip>
          <h2 className="text-[#808080] text-sm ">
            {department}, {section}
          </h2>
        </div>
      </div>
    </>
  );
};

export default StARsList;
