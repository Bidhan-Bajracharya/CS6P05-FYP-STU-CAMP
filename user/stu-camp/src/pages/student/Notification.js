import React, { useEffect } from "react";
import H1 from "../../components/UI/H1";
import NotificationList from "../../components/NotificationList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import EmptyContent from "../../images/EmptyContent";
import { setUnreadNotifications } from "../../features/notificationSlice";
import { useSelector, useDispatch } from "react-redux";

const Notification = () => {
  const axiosPrivate = useAxiosPrivate();
  const { notifications, unreadNotifications } = useSelector(
    (store) => store.notification
  );
  const dispatch = useDispatch();

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

  // mark new notifications as read, on page render
  useEffect(() => {
    if (unreadNotifications.length !== 0) {
      // send the patch request
      const markAsSeen = async () => {
        try {
          await axiosPrivate.patch(
            "/notification",
            JSON.stringify({ notificationIds: unreadNotifications })
          );
          dispatch(setUnreadNotifications([]));
        } catch (error) {
          console.log(error);
        }
      };

      markAsSeen();
    }
  }, []);

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
