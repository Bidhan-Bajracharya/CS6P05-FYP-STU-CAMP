import React from "react";
import { MdErrorOutline } from "react-icons/md";

const ErrorPopUp = (props) => {
  return (
    <>
      <div className="nav-backdrop"></div>
      <div className="flex justify-center flex-col items-center bg-white absolute w-[200px] h-[200px] rounded-md z-30">
        <div className="my-auto">
          <MdErrorOutline size={30} />
        </div>

        <h1 className="m-0 text-lg font-semibold">Login failed !</h1>
        <h2 className="mb-auto text-center">{props.msg}</h2>

        <button
          onClick={() => {
            props.onClose("");
          }}
          className="mb-auto border-2 p-2 border-orange-400 rounded-lg w-[80px]"
        >
          Close
        </button>
      </div>
    </>
  );
};

export default ErrorPopUp;
