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
    .map((notification) => {
      // checking if the notification is present in the unseen notification array
      const seen = !unreadNotifications.find(
        (unreadId) => unreadId === notification._id
      );

      return (
        <NotificationList
          key={notification._id}
          title={notification.title}
          body={notification.message}
          sender={notification.sender?.name}
          seen={seen}
        />
      );
    })
    .slice(0, 10);

  // mark new notifications as read
  // after 2sec of page render
  useEffect(() => {
    let timeoutId;
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

      timeoutId = setTimeout(markAsSeen, 2000);
    }

    return () => clearTimeout(timeoutId);
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
