import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { BiSend } from "react-icons/bi";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
    width: "100%",

    highlighter: {
      padding: 1,
      border: "2px inset transparent",
      // fontWeight: 'bold',
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

const Mentions = ({onCommentClick, commentClicked}) => {
  const { isDark } = useSelector((store) => store.theme);
  const [value, setValue] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const getUsers = async (query, callback) => {
    if (!query) {
      return;
    }

    try {
      // getting available users
      const response = await axiosPrivate.get("/users/people");

      // creating an array of object of id and display names
      const options = response.data.users.map((user) => ({
        id: user.uni_id,
        display: user.name,
      }));

      // searching for queried user
      const filteredUser = options.filter((user) =>
        user.display.toLowerCase().includes(query.toLowerCase())
      );

      // returning the users
      callback(filteredUser);
    } catch (error) {
      console.log(error);
    }
  };

  const postComment = async () => {
    try {
      const response = await axiosPrivate.post(
        "/comment",
        JSON.stringify({
          postId: commentClicked,
          body: value,
        })
      );
      setValue("");
      onCommentClick("");
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(commentClicked);
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
            onClick={onCommentClick}
          >
            <Mention
              style={{ backgroundColor: "#cee4e5" }}
              data={getUsers}
            />
          </MentionsInput>

          <button
            className="absolute right-[4px] top-[4px]"
            onClick={() => postComment()}
          >
            <BiSend size={23} color={isDark ? "black" : "black"} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Mentions;
