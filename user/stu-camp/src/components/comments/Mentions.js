import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { BiSend } from "react-icons/bi";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const defStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      fontFamily: "monospace",
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
    },
  },

  "&singleLine": {
    display: "inline-block",
    width: 180,

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
    },
    input: {
      padding: 1,
      border: "2px inset",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};

const users = [
  {
    id: "jack",
    display: "Jack",
  },
  {
    id: "john",
    display: "John",
  },
];

const Mentions = () => {
  const { isDark } = useSelector((store) => store.theme);
  const [value, setValue] = useState();

  return (
    <>
      <div className="flex flex-row">
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
          <MentionsInput
            // className="h-8 rounded-3xl w-full p-3 pr-[30px] border-[1px] border-gray-500 focus:border-[#FFA500] dark:bg-sg dark:text-white outline-none"
            singleLine
            style={defStyle}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a comment"
          >
            <Mention
              style={{ backgroundColor: "#cee4e5" }}
              className=""
              data={users}
            />
          </MentionsInput>

          <button className="absolute right-[4px] top-[4px]">
            <BiSend size={23} color={isDark ? "white" : ""} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Mentions;
