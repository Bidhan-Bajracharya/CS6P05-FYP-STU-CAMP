import React, { useState, useEffect } from "react";
import H1 from "../../components/UI/H1";
import NotificationList from "../../components/NotificationList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EmptyContent from "../../images/EmptyContent";

const Notification = () => {
  const axiosPrivate = useAxiosPrivate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axiosPrivate.get("/notification");
        console.log(response.data);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, []);

  const viewNotifications = notifications.map((notification) => (
    <NotificationList
      key={notification._id}
      title={notification.title}
      body={notification.message}
      sender={notification.sender.name}
    />
  ));

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
