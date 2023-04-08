import React, { useState, useEffect } from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NotificationManageList from "../../components/NotificationManageList";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import QuickPopUp from "../../components/UI/QuickPopUp";

const AdminAccount = () => {
  const axiosPrivate = useAxiosPrivate();
  const { name, userType, profile_pic, email, createdAt } = useSelector(
    (store) => store.user
  );
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [notifications, setNotifications] = useState([]);
  const [notificationClicked, setNotificationClicked] = useState();
  const [deletedNotificationId, setDeletedNotificationId] = useState(null);
  const [viewDeleteConfirmation, setViewDeleteConfirmation] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // fetch data on initial render
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axiosPrivate.get("/notification/manage");
        setNotifications(response.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, []);

  // display updated data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/notification/manage");
        setNotifications(response.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };

    // refetch the data when a notification is deleted
    if (deletedNotificationId) {
      fetchData();
    }
  }, [deletedNotificationId]);

  // handle notification delete
  const handleNotificationDelete = async () => {
    try {
      await axiosPrivate.delete(`/notification/${notificationClicked}`);
      setDeletedNotificationId(notificationClicked);
      setShowSuccessMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  // open and closing of delete confirmation pop-over
  const handleDeleteConfirmation = (id) => {
    setViewDeleteConfirmation((prevState) => !prevState);

    // id of notification that was clicked
    setNotificationClicked(id);
  };

  // show confirmation message
  useEffect(() => {
    if (showSuccessMessage) {
      const timeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000); // hide the component after 2 seconds

      // clearing the timeout after component unmounting
      return () => clearTimeout(timeoutId);
    }
  }, [showSuccessMessage]);

  return (
    <SettingWrapper>
      <H1>Profile</H1>

      <div className="flex flex-row items-center mx-3 mb-5 bg-[#FA8128] rounded-lg h-fit p-2 lg:w-[50%]">
        <Avatar
          size={90}
          icon={<UserOutlined />}
          style={{
            color: "#f56a00",
            backgroundColor: "#fde3cf",
            position: "static",
            marginLeft: "10px",
            boxShadow: "0 0 0 2px #893101",
          }}
          src={
            profile_pic !== "default" && (
              <img alt="user" src={PF + "/" + profile_pic} />
            )
          }
        />

        <div className="flex flex-col ml-6">
          <div>Full Name: {name}</div>
          <div>Role: {userType ? "Admin" : ""}</div>
          <div>Email Address: {email}</div>
          <div>Joined on: {createdAt.substring(0, 10)}</div>
        </div>
      </div>

      <H1>Notifications</H1>

      {viewDeleteConfirmation && (
        <ConfirmationPopUp
          title="Delete this notification?"
          subTitle="This action cannot be undone."
          onAction={() => handleNotificationDelete()}
          onClose={() => handleDeleteConfirmation()}
        />
      )}

      {/* show success message pop-up */}
      {showSuccessMessage && (
        <QuickPopUp
          icon="success"
          title="Deletion successful"
          subTitle="The notice has been removed."
        />
      )}

      {notifications.map((notification) => (
        <NotificationManageList
          key={notification._id}
          title={notification.title}
          sender={notification.sender.name}
          message={notification.message}
          onDeleteIconClick={() => handleDeleteConfirmation(notification._id)}
        />
      ))}
    </SettingWrapper>
  );
};

export default AdminAccount;
