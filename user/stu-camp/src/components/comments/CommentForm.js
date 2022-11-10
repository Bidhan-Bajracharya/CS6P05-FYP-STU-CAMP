import React, { useState } from "react";
import { BiSend } from "react-icons/bi";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";


const CommentForm = ({ handleSubmit }) => {
  const [text, setText] = useState("");
  const { isDark } = useSelector((store) => store.theme);


  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex flex-row">
        <div className="mr-2">
          <Avatar
            size="default"
            icon={<UserOutlined />}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              position: "static",
            }}
          />
        </div>

        <div className="relative h-fit w-full">
          <input
            value={text}
            placeholder="Add a comment"
            onChange={(e) => setText(e.target.value)}
            className="h-8 rounded-3xl w-full p-3 pr-[30px] border-[1px] border-gray-500 focus:border-[#FFA500] dark:bg-sg dark:text-white outline-none"
          />
          {/* <button className="rounded-lg -m-6 -pb-6"> */}
          <button className="absolute right-[4px] top-[4px]">
            <BiSend size={23} color={isDark ? "white" : ""}/>
          </button>
        </div>
      </form>
    </>
  );
};

export default CommentForm;
