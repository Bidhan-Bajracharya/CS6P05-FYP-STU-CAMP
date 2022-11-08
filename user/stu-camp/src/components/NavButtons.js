import React from "react";
import { Link } from "react-router-dom";

const NavButtons = () => {
  const currentPage = window.location.pathname;

  return (
    <div className="flex flex-row justify-center h-full">
      <Link to="/" className="hover:bg-[#DFDFDF] dark:hover:bg-sg">
        <div
          style={{
            background:
              currentPage === "/"
                ? "linear-gradient(transparent 97%, #FFA500 3%)"
                : "",
          }}
          className="flex justify-center flex-col h-full items-center w-28"
        >
          <h1 className="font-semibold select-none dark:text-white">Stream</h1>
        </div>
      </Link>
      <Link to="/people" className="hover:bg-[#DFDFDF] dark:hover:bg-sg">
        <div
          style={{
            background:
              currentPage === "/people"
                ? "linear-gradient(transparent 97%, #FFA500 3%)"
                : "",
          }}
          className="flex justify-center h-full items-center w-28"
        >
          <h1 className="font-semibold select-none dark:text-white">People</h1>
        </div>
      </Link>
    </div>
  );
};

export default NavButtons;
