import React, { useEffect } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import { Switch } from "antd";
import "../../styles/navbar.css";
import useNotification from "../../hooks/useNotification";
import { adminEmailToggle } from "../../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AccountNotification = () => {
  useNotification();
  const axioxPrivate = useAxiosPrivate();
  const { notification } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleEmailToggle = async (check) => {
    // updating the email preferences
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

  return (
    <>
      <SettingWrapper>
        <H1>Manage email notifications</H1>

        <div className="flex flex-col bg-[#DBD4D4] dark:bg-sg mx-2 p-2">
          <h1 className="text-xl dark:text-[#DBD4D4]">Admin Notices</h1>

          <div className="flex flex-row items-center">
            <div className="switch mr-5">
              <Switch
                defaultChecked={notification.adminEmail}
                onClick={(check) => {
                  handleEmailToggle(check); // passing current state of check
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
      </SettingWrapper>
    </>
  );
};

export default AccountNotification;
