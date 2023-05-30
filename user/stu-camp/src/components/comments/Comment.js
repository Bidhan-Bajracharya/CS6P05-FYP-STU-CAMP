import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const Comment = ({
  username,
  body,
  createdAt,
  profile_pic,
  onCommentDeleteIconClick,
  commentCreatorId,
}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { userType: role, userId: currentUserId } = useSelector(
    (store) => store.user
  );

  return (
    <>
      <div className="flex flex-row items-center p-1 mr-1 my-1 cursor-pointer hover:bg-[#DFDFDF] dark:hover:bg-cb">
        <Avatar
          size="default"
          icon={<UserOutlined />}
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            position: "static",
          }}
          src={
            (profile_pic !== "default" || profile_pic !== undefined) && (
              <img alt="user" src={PF + "/" + profile_pic} />
            )
          }
        />

        <div className="flex flex-col ml-3">
          <div className="flex flex-row">
            <h1 className="mb-0 mr-2 font-semibold dark:text-white">
              {username}
            </h1>
            <h1 className="mb-0 text-[#808080]">{createdAt}</h1>
          </div>
          <h1 className="mb-0 dark:text-white">{body}</h1>
        </div>
          
        {/* only creator of comment, admin and moderators can delete the comment */}
        {(currentUserId === commentCreatorId ||
          role === 1991 ||
          role === 1691) && (
          <RiDeleteBin6Line
            size={20}
            className="ml-auto text-sg"
            onClick={onCommentDeleteIconClick}
          />
        )}
      </div>
    </>
  );
};

export default Comment;
