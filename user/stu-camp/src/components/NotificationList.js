import React from "react";

const NotificationList = (props) => {
  return (
    <>
      <div className="flex items-baseline mb-2 mt-3 px-4 flex-col hover:bg-[#DFDFDF] dark:hover:bg-sg">
        <h1 className="font-semibold text-lg dark:text-white">{props.title}</h1>

        <p className="text-[#808080]">{props.body}</p>
      </div>
      <hr />
    </>
  );
};

export default NotificationList;
