import React from "react";
import { MdOutlineDelete } from "react-icons/md";

const NotificationManageList = ({
  title,
  sender,
  message,
  onDeleteIconClick,
}) => {
  return (
    <>
      <div className="flex items-center mb-2 mt-3 px-4 flex-row hover:bg-[#DFDFDF] dark:hover:bg-sg">
        <div className="flex flex-col w-full items-baseline mb-2 mt-3 px-4 hover:bg-[#DFDFDF] dark:hover:bg-sg">
          <h1 className="font-semibold mb-0 text-lg dark:text-white">
            {title}
          </h1>
          <p className="text-[#808080] mb-1">By: {sender}</p>
          <p className="text-[#808080] mb-1">{message}</p>
        </div>

        <div className="flex flex-row ml-auto">
          <button onClick={onDeleteIconClick}>
            <MdOutlineDelete
              className="text-red-600 cursor-pointer"
              size={25}
            />
          </button>
        </div>
      </div>
      <hr className="dark:bg-sg h-[1px] border-0 bg-[#D3CDCD]" />
    </>
  );
};

export default NotificationManageList;
