import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const Comment = ({ username, body, createdAt }) => {
  return (
    <>
      <div className="flex flex-row p-1 mr-1 my-2 bg-[#DFDFDF] dark:bg-sg">
        <Avatar
          size="default"
          icon={<UserOutlined />}
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            position: "static",
          }}
        />

        <div className="flex flex-col ml-3">
          <div className="flex flex-row">
            <h1 className="mb-0 mr-2 font-semibold dark:text-white">{username}</h1>
            <h1 className="mb-0 text-[#808080]">{createdAt}</h1>
          </div>
          <h1 className="mb-0 dark:text-white">{body}</h1>
        </div>
      </div>
    </>
  );
};

export default Comment;
