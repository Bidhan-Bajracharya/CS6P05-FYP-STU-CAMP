import React from "react";
import { MdErrorOutline } from "react-icons/md";

const VerifyPopUp = (props) => {
  return (
    <>
      <div className="nav-backdrop"></div>
      <div className="flex justify-center flex-col items-center bg-white absolute w-[200px] h-[200px] rounded-md z-30">
        <div className="my-auto">
          <MdErrorOutline size={30} />
        </div>

        <h2 className="mb-auto">{props.msg}</h2>

        <div className="flex flex-row mb-5">
          <button
            onClick={() => {
              props.onClose(false);
            }}
            className="mb-auto border-2 p-2 border-orange-400 rounded-lg w-[80px] mx-auto"
          >
            Close
          </button>
          <button
            onClick={() => {
              props.deleteHandler();
              props.onClose(false);
            }}
            className="mb-auto border-2 p-2 border-orange-400 rounded-lg w-[80px] ml-5"
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyPopUp;
