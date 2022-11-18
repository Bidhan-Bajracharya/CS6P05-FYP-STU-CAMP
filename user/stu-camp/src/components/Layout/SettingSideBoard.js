import React from "react";
import { Link } from "react-router-dom";
import ListItems from "../UI/ListItems";

const SettingSideBoard = () => {
  const currentPage = window.location.pathname;

  return (
    <>
      {/* <nav className="mt-5 bg-[#EC9706] rounded-xl mx-2 lg:w-48 border-2 lg:h-screen lg:m-0 lg:border-0 lg:rounded-none lg:fixed lg:z-[1]"> */}
      <nav
        className="mt-5 bg-[#EC9706] rounded-xl mx-2 lg:z-[1] lg:h-screen 
      lg:m-0 lg:w-44 lg:fixed lg:bg-transparent lg:ml-5 lg:mt-8 sm:max-lg:w-[90%] sm:max-lg:mx-auto dark:bg-tb"
      >
        <h1 className="absolute left-[-9999999px] mb-0 lg:visible w-fit h-fit lg:static lg:text-xl lg:pl-2 text-[#FFA500]">
          Settings
        </h1>
        <hr className="invisible w-0 h-0 lg:visible lg:border-0 lg:w-auto lg:h-[1px] bg-[#FFA500]" />

        <ul className="flex flex-row justify-around items-center mb-0 h-10 lg:flex-col lg:h-52 lg:my-2 text-white lg:mt-0 lg:justify-start">
          <Link
            to="/account"
            className="text-white w-full h-full hover:text-white lg:h-fit"
          >
            <div
              style={{
                background: currentPage === "/account" ? "#FCAE1E" : "",
              }}
              className="h-full hover:bg-[#FCAE1E] rounded-xl lg:rounded-sm lg:mt-1 lg:h-fit lg:dark:hover:bg-sg lg:hover:bg-[#DFDFDF]"
            >
              <ListItems>Account</ListItems>
            </div>
          </Link>

          <Link
            to="/account_notifications"
            className="text-white w-full h-full hover:text-white lg:h-fit"
          >
            <div
              style={{
                background: currentPage === "/account_notifications" ? "#FCAE1E" : "",
              }}
              className="h-full hover:bg-[#FCAE1E] rounded-xl lg:rounded-sm lg:mt-1 lg:h-fit lg:dark:hover:bg-sg lg:hover:bg-[#DFDFDF]"
            >
              <ListItems>Notifications</ListItems>
            </div>
          </Link>

          <Link
            to="/account_post"
            className="text-white w-full h-full hover:text-white lg:h-fit"
          >
            <div
              style={{
                background: currentPage === "/account_post" ? "#FCAE1E" : "",
              }}
              className="h-full hover:bg-[#FCAE1E] rounded-xl lg:rounded-sm lg:mt-1 lg:h-fit lg:dark:hover:bg-sg lg:hover:bg-[#DFDFDF]"
            >
              <ListItems>Posts</ListItems>
            </div>
          </Link>

          <Link
            to="/"
            className="text-white w-full h-full hover:text-white lg:h-fit"
          >
            <div
              className="h-full hover:bg-[#FCAE1E] rounded-xl lg:rounded-sm lg:mt-1 lg:h-fit lg:dark:hover:bg-sg lg:hover:bg-[#DFDFDF]"
            >
              <ListItems>Go Back</ListItems>
            </div>
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default SettingSideBoard;
