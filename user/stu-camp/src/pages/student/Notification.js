import React, {useState, useEffect} from "react";
import H1 from "../../components/UI/H1";
import NotificationList from "../../components/NotificationList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import NotificationData from "../../data/NotificationData";

const Notification = () => {
  const axiosPrivate = useAxiosPrivate();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getNotifications = async() => {
      try {
        const response = await axiosPrivate.get("/notification");
        console.log(response.data);
        // setNotifications()
      } catch (error) {
        console.log(error);
      }
    }

    getNotifications();
  }, []);

  const viewNotifications = NotificationData.map((items) => (
    <NotificationList key={items.id} title={items.title} body={items.body} />
  ));

  return (
    <>
      <section className="lg:mx-[270px] mt-3 h-screen sm:max-lg:mx-[30px] lg:max-xl:mx-[180px]">
        <H1>Notifications</H1>

        {viewNotifications}
      </section>
    </>
  );
};

export default Notification;
