import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

import { BiDotsVerticalRounded } from "react-icons/bi";
// import {MdInsertComment} from "react-icons/md";
// <MdInsertComment size={30} color="gray"/>

import { BsFillPeopleFill } from "react-icons/bs";

const Post = (props) => {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <>
      <div className="flex flex-col border-2 border-[#FFA500] w-full rounded-lg h-fit lg:w-[600px]">
        <div className="flex flex-row items-center pt-2 mb-2">
          <Avatar
            size={45}
            icon={<UserOutlined />}
            style={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
              position: "static",
              marginRight: "15px",
              marginLeft: "10px",
              boxShadow: "0 0 0 1px #FFA500",
            }}
            className="cursor-pointer"
          />

          <div className="flex flex-col">
            <h1 className="mb-0 font-semibold dark:text-white">
              Nishcal Maharjan
            </h1>
            <p className="mb-0 text-xs text-[#808080]">C2, September 14</p>
          </div>

          <div className="ml-auto rounded-full dark:hover:bg-sg dark:active:bg-lb p-1 hover:bg-[#DFDFDF] active:hover:bg-[#acaaaa]  mr-1 cursor-pointer">
            <BiDotsVerticalRounded size={25} color={isDark ? "#808080" : ""} />
          </div>
        </div>
        <hr className="bg-[#808080] h-[1px] border-0" />

        <div
          style={{ whiteSpace: "normal", wordBreak: "break-all" }}
          className="p-3 min-h-max dark:text-white"
        >
          {/* <p style={{wordBreak: "break-all", whiteSpace: "normal"}} className="mb-0"></p> */}
          A multiline
          textssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
          for demo purpose huhu sjsj
        </div>
        <hr className="bg-[#808080] h-[1px] border-0" />

        <div className="mt-auto">
          <div className="flex flex-row p-1 ml-1 mt-1 rounded-md w-fit dark:active:bg-sg active:bg-[#DFDFDF] cursor-pointer">
            <BsFillPeopleFill size={22} color="gray" />
            <p className="mb-0 ml-2 dark:text-white select-none">
              12 people have commented
            </p>
          </div>

          <div>write a comment</div>
        </div>
      </div>
    </>
  );
};

export default Post;
