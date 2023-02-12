import React from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import { Switch } from "antd";
import "../../styles/navbar.css";
import useNotification from "../../hooks/useNotification";
import {
  adminEmailToggle,
  commentEmailToggle,
  mentionEmailToggle,
} from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AccountNotification = () => {
  useNotification();
  const axioxPrivate = useAxiosPrivate();
  const { notification } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleAdminEmailToggle = async (check) => {
    // updating the admin email preferences
    try {
      await axioxPrivate.patch(
        "/users/change-notification",
        JSON.stringify({ preferences: { ...notification, adminEmail: check } })
      );
      dispatch(adminEmailToggle(check));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentEmailToggle = async (check) => {
    // updating the comment email preferences
    try {
      await axioxPrivate.patch(
        "/users/change-notification",
        JSON.stringify({
          preferences: { ...notification, commentEmail: check },
        })
      );
      dispatch(commentEmailToggle(check));
    } catch (error) {
      console.log(error);
    }
  };

  const handleMentionEmailToggle = async (check) => {
    // updating the mention email preferences
    try {
      await axioxPrivate.patch(
        "/users/change-notification",
        JSON.stringify({
          preferences: { ...notification, mentionEmail: check },
        })
      );
      dispatch(mentionEmailToggle(check));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SettingWrapper>
        <H1>Manage email notifications</H1>

        {/* Admin email notification toggle */}
        <div className="flex flex-col bg-[#DBD4D4] dark:bg-sg mx-2 p-2">
          <h1 className="text-xl dark:text-[#DBD4D4]">Admin Notices</h1>

          <div className="flex flex-row items-center">
            <div className="switch mr-5">
              <Switch
                defaultChecked={notification.adminEmail}
                onClick={(check) => {
                  handleAdminEmailToggle(check); // passing current state of admin check
                }}
              />
            </div>

            <div className="flex flex-col items-baseline">
              <h1 className="mb-0 text-lg dark:text-[#DBD4D4]">Notices</h1>
              <p className="mb-0 text-[#525050] dark:text-gray-400">
                Email me of notices sent by admin
              </p>
            </div>
          </div>
        </div>

        {/* Comment email notification toggle */}
        <div className="flex flex-col bg-[#DBD4D4] dark:bg-sg mx-2 p-2 mt-3">
          <h1 className="text-xl dark:text-[#DBD4D4]">Comments on post</h1>

          <div className="flex flex-row items-center">
            <div className="switch mr-5">
              <Switch
                defaultChecked={notification.commentEmail}
                onClick={(check) => {
                  handleCommentEmailToggle(check); // passing current state of comment check
                }}
              />
            </div>

            <div className="flex flex-col items-baseline">
              <h1 className="mb-0 text-lg dark:text-[#DBD4D4]">Comments</h1>
              <p className="mb-0 text-[#525050] dark:text-gray-400">
                Email me of comments on my content
              </p>
            </div>
          </div>
        </div>

        {/* Mention email notification toggle */}
        <div className="flex flex-col bg-[#DBD4D4] dark:bg-sg mx-2 p-2 mt-3">
          <h1 className="text-xl dark:text-[#DBD4D4]">Tags</h1>

          <div className="flex flex-row items-center">
            <div className="switch mr-5">
              <Switch
                defaultChecked={notification.mentionEmail}
                onClick={(check) => {
                  handleMentionEmailToggle(check); // passing current state of mention check
                }}
              />
            </div>

            <div className="flex flex-col items-baseline">
              <h1 className="mb-0 text-lg dark:text-[#DBD4D4]">Mentions</h1>
              <p className="mb-0 text-[#525050] dark:text-gray-400">
                Email me when someone mentions me
              </p>
            </div>
          </div>
        </div>
      </SettingWrapper>
    </>
  );
};

export default AccountNotification;
