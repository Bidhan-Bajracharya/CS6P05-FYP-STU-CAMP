import React from "react";
import { Link } from "react-router-dom";
import ListItems from "../UI/ListItems";
import { useLocation } from "react-router-dom";

const AdminAccountSideBoard = () => {
  const currentPage = useLocation().pathname;

  return (
    <>
      <nav
        className="mt-5 bg-[#EC9706] rounded-xl mx-2 lg:z-[1] lg:h-screen 
      lg:m-0 lg:w-44 lg:fixed lg:bg-transparent lg:ml-5 lg:mt-8 sm:max-lg:w-[90%] sm:max-lg:mx-auto"
      >
        <h1 className="absolute left-[-9999999px] mb-0 lg:visible w-fit h-fit lg:static lg:text-xl lg:pl-2 text-[#FFA500]">
          Operations
        </h1>
        <hr className="invisible w-0 h-0 lg:visible lg:border-0 lg:w-auto lg:h-[1px] bg-[#FFA500]" />

        <ul className="flex flex-row justify-around items-center mb-0 h-10 lg:flex-col lg:h-52 lg:my-2 text-white lg:mt-0 lg:justify-start">
          <Link
            to="/admin/account"
            className="text-white w-full h-full hover:text-white lg:h-fit"
          >
            <div
              style={{
                background: currentPage === "/admin/account" ? "#FCAE1E" : "",
              }}
              className="h-full hover:bg-[#FCAE1E] rounded-xl lg:rounded-sm lg:mt-1 lg:h-fit lg:dark:hover:bg-sg lg:hover:bg-[#DFDFDF]"
            >
              <ListItems>Account Details</ListItems>
            </div>
          </Link>

          <Link
            to="/admin/account-setting"
            className="text-white w-full h-full hover:text-white lg:h-fit"
          >
            <div
              style={{
                background: currentPage === "/admin/account-setting" ? "#FCAE1E" : "",
              }}
              className="h-full hover:bg-[#FCAE1E] rounded-xl lg:rounded-sm lg:mt-1 lg:h-fit lg:dark:hover:bg-sg lg:hover:bg-[#DFDFDF]"
            >
              <ListItems>Profile Settings</ListItems>
            </div>
          </Link>

          <Link
            to="/admin"
            className="text-white w-full h-full hover:text-white lg:h-fit"
          >
            <div className="h-full hover:bg-[#FCAE1E] rounded-xl lg:rounded-sm lg:mt-1 lg:h-fit lg:dark:hover:bg-sg lg:hover:bg-[#DFDFDF]">
              <ListItems>Go Back</ListItems>
            </div>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default AdminAccountSideBoard;
