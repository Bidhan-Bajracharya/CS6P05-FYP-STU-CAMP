import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "./useAxiosPrivate";
import {
  setNotifications,
  setUnreadNotifications,
} from "../features/notificationSlice";

const useNotification = () => {
  const [numberOfUnReadNotification, setNumberOfUnReadNotification] =
    useState(0);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { userId } = useSelector((store) => store.user);

  // fetching notifications
  useEffect(() => {
    const getNotifications = async () => {
      try {
        const response = await axiosPrivate.get("/notification");
        dispatch(setNotifications(response.data.notifications));

        const getUnReadNotifications = () => {
          return response.data.notifications
            .slice(0, 10) // only top 10 notifications
            .filter((notification) => !notification.readBy.includes(userId)) // getting unread/unseen notifications
            .map((notification) => notification._id); // '_id' of those unseen notifications
        };

        const unread = getUnReadNotifications();
        dispatch(setUnreadNotifications(unread));
        setNumberOfUnReadNotification(unread.length);
      } catch (error) {
        console.log(error);
      }
    };

    getNotifications();
  }, []);

  return numberOfUnReadNotification;
};

export default useNotification;
