import React, { useState, useEffect } from "react";
import H1 from "../../components/UI/H1";
import NotificationList from "../../components/NotificationList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EmptyContent from "../../images/EmptyContent";
import { useSelector } from "react-redux";

const Notification = () => {
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useSelector((store) => store.user);
  const [notifications, setNotifications] = useState([]);

  // fetching notifications
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axiosPrivate.get("/notification");
        setNotifications(response.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, []);

  // choosing 10 recent notifications
  const viewNotifications = notifications
    .map((notification) => (
      <NotificationList
        key={notification._id}
        title={notification.title}
        body={notification.message}
        sender={notification.sender.name}
      />
    ))
    .slice(0, 10);

  const getUnReadNotifications = () => {
    return notifications
      .slice(0, 10) // only top 10 notifications
      .filter((notification) => !notification.readBy.includes(userId)) // getting unread/unseen notifications
      .map((notification) => notification._id); // '_id' of those unseen notifications
  };

  // mark new notifications as read, on page render
  useEffect(() => {
    const unreadNotifications = getUnReadNotifications();

    if (unreadNotifications.length !== 0) {
      // send the patch request
      const markAsSeen = async () => {
        try {
          const response = await axiosPrivate.patch(
            "/notification",
            JSON.stringify({ notificationIds: unreadNotifications })
          );
        } catch (error) {
          console.log(error);
        }
      };

      markAsSeen();
    }
  }, [getUnReadNotifications]);

  return (
    <>
      <section className="mt-3 min-h-screen lg:mx-[270px] sm:max-lg:mx-[30px] lg:max-xl:mx-[180px]">
        <H1>Notifications</H1>

        {notifications.length !== 0 ? (
          viewNotifications
        ) : (
          <div className="w-[200px] h-[200px] lg:w-[200px] lg:h-[200px] mx-auto mt-[50%] lg:mt-[10%]">
            <EmptyContent
              stroke="gray"
              fill="gray"
              width="100%"
              height="100%"
            />
          </div>
        )}
      </section>
    </>
  );
};

export default Notification;
