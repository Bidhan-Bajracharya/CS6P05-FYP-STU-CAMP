import React from "react";
import Modal from "./Modal";

const ReportModal = (props) => {
  return (
    <>
      <Modal onClose={props.onClose}>
        <div>
          <h1 className="text-xl font-semibold dark:text-white">Report</h1>
          <hr className="bg-[#FFA500] h-[1px] border-0 mb-5" />

          <form onSubmit={props.handleSubmit}>
            <textarea
              required
              className="text-box resize-none w-full min-h-[160px] h-fit dark:bg-sg p-2 dark:text-white"
              placeholder="Reason for report..."
              value={props.body}
              onChange={props.setBody}
            />

            <div className="flex flex-row items-center mt-2">
              <button
                type="button"
                className="ml-auto dark:text-white"
                onClick={props.onClose}
              >
                Cancel
              </button>
              <button
                className="bg-[#ED820E] rounded-md h-10 p-2 ml-5 text-white w-24 hover:bg-[#FC6A03]"
                type="submit"
              >
                Report
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default ReportModal;
