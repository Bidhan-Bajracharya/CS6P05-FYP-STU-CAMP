import React from "react";
import QuickPopUpModal from "./QuickPopUpModal";
import { MdErrorOutline, MdOutlineDoneAll } from "react-icons/md";

const QuickPopUp = ({ title, subTitle, icon }) => {
  return (
    <>
      <QuickPopUpModal>
        <div className="flex flex-col items-center">
          <div className="my-auto dark:text-white mb-3">
            {icon === "warning" ? <MdErrorOutline size={30} /> : <MdOutlineDoneAll size={30} /> }
          </div>

          <h1 className="m-0 text-lg font-semibold dark:text-white dark:font-medium">
            {title}
          </h1>
          <h2 className="mb-5 dark:text-white dark:font-thin">{subTitle}</h2>
        </div>
      </QuickPopUpModal>
    </>
  );
};

export default QuickPopUp;
