import React from "react";
import { MdOutlineDelete } from "react-icons/md";
import { BsCheck2Circle } from "react-icons/bs";

const ReportList = ({
  onDeleteIconClick,
  onResolveIconClick,
  reportedUserName,
  reportedPost,
  reportingUserName,
  reason,
  reportedDate,
  resolved,
  resolvedDate,
}) => {
  return (
    <>
      <div className="flex items-center mb-2 mt-3 px-4 flex-row hover:bg-[#DFDFDF] dark:hover:bg-sg">
        <div className="flex flex-col">
          <h1 className="font-semibold text-lg dark:text-white dark:font-medium">
            Reported User: {reportedUserName}
          </h1>
          <p className="flex flex-col text-[#808080] lg:flex-row lg:mb-1">
            <span className="ml-0">Reported by: {reportingUserName}</span>
            <span className="ml-0 lg:ml-5">
              Reported postID: {reportedPost}
            </span>
          </p>
          <p className="text-[#808080] lg:mb-1">Reason: {reason}</p>

          <p className="text-[#808080] mb-0 ">
            Reported Date: {reportedDate.substring(0, 10)}
          </p>

          {resolved && (
            <p className="text-[#808080]">
              Handled Date: {resolvedDate.substring(0, 10)}
            </p>
          )}
        </div>

        <div className="flex flex-row ml-auto">
          <button onClick={onResolveIconClick} disabled={resolved}>
            <BsCheck2Circle
              className={` 
              ${resolved ? "text-green-500" : "text-gray-600"}  
              ${resolved ? "cursor-default" : "cursor-pointer"} mr-3`}
              size={25}
            />
          </button>

          <button onClick={onDeleteIconClick}>
            <MdOutlineDelete className="text-red-600 cursor-pointer" size={25} />
          </button>
        </div>
      </div>
      <hr className="dark:bg-sg h-[1px] border-0 bg-[#D3CDCD]" />
    </>
  );
};

export default ReportList;
