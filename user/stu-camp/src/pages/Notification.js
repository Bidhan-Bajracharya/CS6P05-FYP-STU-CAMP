import React from "react";
import H1 from "../components/UI/H1";
import NotificationList from "../components/NotificationList";

import NotificationData from "../data/NotificationData";
import Navbar from "../components/Navbar";

const Notification = () => {
  const viewNotifications = NotificationData.map((items) => (
    <NotificationList key={items.id} title={items.title} body={items.body} />
  ));

  return (
    <>
      <Navbar />
      <section className="lg:ml-[270px] lg:mr-[270px] mt-3 h-screen">
        <H1>Notifications</H1>

        {viewNotifications}
      </section>
    </>
  );
};

export default Notification;
