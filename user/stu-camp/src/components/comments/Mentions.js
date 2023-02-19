import React, { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { BiSend } from "react-icons/bi";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import "../../styles/mention.css";
import { handleCommentAdd } from "../../features/postSlice";

const Mentions = ({ onCommentClick, postCreatorId }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { isDark } = useSelector((store) => store.theme);
  const { addCommentClickId } = useSelector((store) => store.post);
  const {
    name: userName,
    userId,
    userType,
    profile_pic,
  } = useSelector((store) => store.user);
  const [value, setValue] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();

  const defStyle = {
    "&singleLine": {
      display: "inline-block",
      maxWidth: "100%",
  
      input: {
        padding: "3px 2px 2px 5px",
        outline: "none",
        margin: "1px 0px 0px 2px",
      },
    },
  
    suggestions: {
      borderRadius: '10px',
      list: {
        backgroundColor: `${isDark ? '#303030' : '#F8F9FA'}`,
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: '10px',
        fontSize: 14,
      },
  
      item: {
        padding: "5px 15px",
        borderRadius: '10px',
        borderBottom: "1px solid rgba(0,0,0,0.15)",
        "&focused": {
          backgroundColor: "#FA8128",
        },
      },
    },
  };

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
    let commentContent = value;

    // posting comment
    try {
      const response = await axiosPrivate.post(
        "/comment",
        JSON.stringify({
          postId: addCommentClickId, // redux - id of the post that the comment belonged in
          body: value,
          commentType: userType === 1991 ? "Admin" : "User",
        })
      );
      dispatch(handleCommentAdd(response.data.newComment)); // redux
      setValue("");
      onCommentClick("");
    } catch (error) {
      console.log(error);
    }

    // notify if another student commented
    if (postCreatorId !== userId) {
      try {
        const notification = {
          title: "Comment",
          message: `${userName} has commented on your post, id: ${addCommentClickId}`,
          postId: addCommentClickId, // redux - id of the post that the comment belonged in
          notiType: "User", // User type notification
        };

        await axiosPrivate.post("/notification", JSON.stringify(notification));
      } catch (error) {
        console.log(error);
      }

      // email notify
      try {
        const emailDetail = {
          title: "Comment on your post",
          message: `${userName} has commented on your post, id: ${addCommentClickId}`,
          postId: addCommentClickId,
          emailType: "Comment",
        };
        await axiosPrivate.post("/email", JSON.stringify(emailDetail));
      } catch (error) {
        console.log(error);
      }
    }

    // find the user who was mentioned and notify them
    const mentionedIds = commentContent.match(/\((\d+)\)/g);
    if (mentionedIds !== null) {
      // getting the uni_ids of the mentioned user(s)
      const mentionedUserIds = mentionedIds.map((id) =>
        id.replace(/[\(\)]/g, "")
      );

      try {
        const mentionedNotification = {
          title: "Mentioned",
          message: `${userName} has mentioned you in post, id: ${addCommentClickId}`,
          postId: addCommentClickId,
          notiType: "User",
          isMentioned: true,
          receiverUniId: mentionedUserIds, // uni_ids of the mentioned user
        };
        await axiosPrivate.post(
          "/notification",
          JSON.stringify(mentionedNotification)
        );

        // email notify
        try {
          const emailDetail = {
            title: "Mentioned you in comment",
            message: `${userName} has mentioned you in post, id: ${addCommentClickId}`,
            emailType: "Mention",
            receiverUniId: mentionedUserIds,
          };
          await axiosPrivate.post("/email", JSON.stringify(emailDetail));
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            src={
              profile_pic !== "default" && (
                <img alt="user" src={PF + "/" + profile_pic} />
              )
            }
          />
        </div>

        <div className="relative h-fit w-full">
          <MentionsInput
            className="h-8 rounded-3xl w-full border-[1px] border-gray-500 focus:border-[#FFA500] dark:bg-sg dark:text-white outline-none"
            singleLine
            style={defStyle}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Add a comment"
            onClick={onCommentClick}
            // maxLength={63}
          >
            <Mention data={getUsers} />
          </MentionsInput>

          <button
            className="absolute right-[4px] top-[4px]"
            onClick={() => postComment()}
          >
            <BiSend size={23} color={isDark ? "white" : ""} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Mentions;
