import React from "react";
// import Comments from "./comments/Comments";
import CommentForm from "../comments/CommentForm";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Popover } from "antd";

import { BiDotsVerticalRounded } from "react-icons/bi";
import TimeAgo from "timeago-react";

import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";

const Post = ({
  id,
  name,
  department,
  section,
  profile_pic,
  body,
  img,
  createdAt,
  postClicked,
  handleDotClick,
  creatorId,
  handleReportClick,
  onDeleteIconClick,
}) => {
  const { isDark } = useSelector((store) => store.theme);
  const { userType: role, userId } = useSelector((store) => store.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // parentId needed in case of replies
  const addComment = (text, parentId) => {
    console.log("add comment", text, parentId);
  };

  const content = (
    <>
      {role !== 1991 && (
        <div
          className="flex flex-row align-baseline w-full h-full cursor-pointer text-[#808080]"
          onClick={() => handleReportClick(creatorId, id)}
        >
          <MdOutlineReportGmailerrorred size={20} />
          Report
        </div>
      )}

      {/* Allow deletion only to admin, mod and the owner of post */}
      {(role === 1991 || role === 1691 || userId === creatorId) && (
        <div
          className="flex flex-row w-full h-full cursor-pointer mt-2 text-[#808080]"
          onClick={() => onDeleteIconClick()}
        >
          <MdOutlineDelete size={20} />
          Delete
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="flex flex-col border-2 border-[#FFA500] w-full rounded-lg h-fit mb-7 lg:w-[600px]">
        <div className="flex flex-row items-center pt-2 mb-2">
          <Avatar
            size={40}
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
            <h1 className="mb-0 font-semibold dark:text-white">{name}</h1>
            <p className="mb-0 text-xs text-[#808080]">
              {section}, {<TimeAgo datetime={createdAt} locale="en_US" />}
            </p>
          </div>

          <div className="ml-auto rounded-full dark:hover:bg-sg dark:active:bg-lb p-1 hover:bg-[#DFDFDF] active:hover:bg-[#acaaaa]  mr-1 cursor-pointer">
            <Popover
              placement="right"
              content={content}
              trigger="click"
              open={id === postClicked}
              zIndex={1}
              onOpenChange={handleDotClick}
              overlayInnerStyle={{
                backgroundColor: `${isDark ? "#303030" : "white"}`,
              }}
            >
              <BiDotsVerticalRounded
                size={25}
                color={isDark ? "#808080" : ""}
              />
            </Popover>
          </div>
        </div>
        <hr className="bg-[#808080] h-[1px] border-0" />

        <div
          style={{ whiteSpace: "normal", wordBreak: "break-all" }}
          className="p-3 min-h-max dark:text-white"
        >
          {/* <p style={{wordBreak: "break-all", whiteSpace: "normal"}} className="mb-0"></p> */}
          {body}
          {img && <img src={PF + "/" + img} alt={img}/>}
        </div>
        <hr className="bg-[#808080] h-[1px] border-0" />

        <div className="mt-auto">
          <div className="flex flex-col ml-1 mt-1">
            <div className="flex flex-row p-1 rounded-md dark:active:bg-sg active:bg-[#DFDFDF] cursor-pointer w-fit">
              <BsFillPeopleFill size={22} color="gray" />
              <p className="mb-0 ml-2 dark:text-white select-none">
                0 people have commented
              </p>
            </div>

            {/* <Comments currentUserId="1" /> */}
          </div>

          <div className="px-1 py-2">
            <CommentForm handleSubmit={addComment} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
