import React from "react";
import ConfirmationModal from "./ConfirmationModal";
import { MdErrorOutline } from "react-icons/md";

const ConfirmationPopUp = ({ onClose, onAction, title }) => {
  return (
    <>
      <ConfirmationModal onClose={onClose}>
        <div className="flex flex-col items-center">
          <div className="my-auto dark:text-white mb-3">
            <MdErrorOutline size={30} />
          </div>

          <h1 className="m-0 text-lg font-semibold dark:text-white dark:font-medium">
            {title}
          </h1>
          <h2 className="mb-5 dark:text-white dark:font-thin">
            This action cannot be undone.
          </h2>

          <div className="flex flex-row w-full">
            <button
              onClick={onClose}
              className="mb-auto border-2 p-2 border-orange-400 rounded-lg w-[80px] mx-auto dark:text-white dark:font-thin"
            >
              Close
            </button>

            <button
              onClick={() => {
                onAction();
                onClose();
              }}
              className="mb-auto border-2 p-2 border-[#ED820E] bg-[#ED820E] hover:bg-[#FC6A03] rounded-lg w-[80px] mx-auto dark:text-white dark:font-thin"
            >
              Confirm
            </button>
          </div>
        </div>
      </ConfirmationModal>
    </>
  );
};

export default ConfirmationPopUp;
