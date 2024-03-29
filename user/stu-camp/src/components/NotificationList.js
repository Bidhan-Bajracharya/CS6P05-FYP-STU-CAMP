import React from "react";
import { GoPrimitiveDot } from "react-icons/go";

const NotificationList = ({ title, body, sender, seen }) => {
  return (
    <>
      <div className="flex flex-row items-center">
        <div className={`flex flex-col w-full items-baseline mb-2 mt-3 px-4 hover:bg-[#DFDFDF] dark:hover:bg-sg ${!seen && 'bg-[#DFDFDF] dark:bg-sg'}`}>
          <h1 className="font-semibold mb-0 text-lg dark:text-white">
            {title}
          </h1>
          <p className="text-[#808080] mb-1">By: {sender}</p>
          <p className="text-[#808080] mb-1">{body}</p>
        </div>
        {!seen && <GoPrimitiveDot className="text-[#2E8BC0]" />}
      </div>
      <hr className="dark:bg-sg h-[1px] border-0 bg-[#D3CDCD]" />
    </>
  );
};

export default NotificationList;
