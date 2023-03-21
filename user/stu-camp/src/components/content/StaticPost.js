import React, { useState } from "react";
import Comment from "../comments/Comment";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { Popover } from "antd";
import { BiDotsVerticalRounded } from "react-icons/bi";
import TimeAgo from "timeago-react";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import useMeasure from "react-use-measure";
import {
  handleDotClick,
  handleDeleteIconClick,
  handleShowCommentClick,
  handleCommentDeleteIconClick,
  setAddCommentClickId,
} from "../../features/postSlice";

const StaticPost = ({
  id,
  name,
  department,
  section,
  year,
  profile_pic,
  body,
  img,
  createdAt,
  creatorId,
  handleReportClick,
}) => {
  const dispatch = useDispatch();
  const { isDark } = useSelector((store) => store.theme);
  const { userType: role, userId } = useSelector((store) => store.user);
  const { postClicked, showPostComments, comments } = useSelector(
    (store) => store.post
  );
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [ref, { height }] = useMeasure(); // tracking height of each post
  const [expanded, setExpanded] = useState(false);

  // three dot's contents
  const content = (
    <>
      {role !== 1991 && userId !== creatorId && (
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
          onClick={() => dispatch(handleDeleteIconClick())} // redux
        >
          <MdOutlineDelete size={20} />
          Delete
        </div>
      )}
    </>
  );

  // filter comments according to posts
  const postComments = comments.filter((comment) => comment.postId === id);

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
            src={
              profile_pic !== "default" && (
                <img alt="user" src={PF + "/" + profile_pic} />
              )
            }
          />

          <div className="flex flex-col">
            <h1 className="mb-0 font-semibold dark:text-white">{name}</h1>
            <p className="mb-0 text-[13px] text-[#808080]">
              {section} . Y{year}, {<TimeAgo datetime={createdAt} locale="en_US" />}
            </p>
          </div>

          <div className="ml-auto rounded-full dark:hover:bg-sg dark:active:bg-lb p-1 hover:bg-[#DFDFDF] active:hover:bg-[#acaaaa]  mr-1 cursor-pointer">
            <Popover
              placement="right"
              content={content}
              trigger="click"
              open={id === postClicked}
              zIndex={1}
              onOpenChange={() => dispatch(handleDotClick(id))} // redux
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

        {/* Main body section of post */}
        <div
          ref={ref}
          style={{
            whiteSpace: "normal",
            wordBreak: "break-all",
            // default height 90px, if the height crosses threshold
            height:
              height > 50 ? (expanded ? "fit-content" : "90px") : "fit-content",
            overflow: "hidden",
          }}
          className={`p-3 min-h-max dark:text-white ${
            height > 50 ? "cursor-pointer" : "cursor-default"
          }`}
          onClick={
            () => (height > 50 ? setExpanded((prevState) => !prevState) : {}) // allow expansion if height crosses the threshold
          }
        >
          {body}
          {img && <img src={PF + "/" + img} alt={img} />}
        </div>
        <hr className="bg-[#808080] h-[1px] border-0" />

        <div className="mt-auto">
          <div className="flex flex-col ml-1 mt-1">
            <div className="flex flex-row p-1 mb-1 rounded-md dark:active:bg-sg active:bg-[#DFDFDF] cursor-pointer w-fit">
              <BsFillPeopleFill size={22} color="gray" />
              <p
                className="mb-0 ml-2 dark:text-white select-none"
                onClick={() => dispatch(handleShowCommentClick(id))} // redux
              >
                {postComments.length} people have commented
              </p>
            </div>

            {/* Displaying comments for the post */}
            {showPostComments === id &&
              postComments.map((comment) => (
                <Comment
                  key={comment._id}
                  username={comment.createdBy.name}
                  commentCreatorId={comment.createdBy._id}
                  body={comment.body}
                  createdAt={comment.createdAt.substring(0, 10)}
                  profile_pic={comment.createdBy.profile_pic}
                  onCommentDeleteIconClick={
                    () => dispatch(handleCommentDeleteIconClick(comment._id)) // redux
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticPost;
