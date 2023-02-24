import React from "react";
import Modal from "./Modal";

const ReportModal = (props) => {

  const handleChange = (event) => {
    // updating the checked status for each reasons
    props.onReasonChange({
      ...props.reasons,
      [event.target.name]: event.target.checked,
    });

    // updating counter on each check action
    if (event.target.checked) {
      props.onCounterChange((prevCount) => prevCount + 1);
    } else {
      props.onCounterChange((prevCount) => prevCount - 1);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // array of selected options
    const selectedReasons = Object.keys(props.reasons).filter(
      (reason) => props.reasons[reason] // returning values that are true/checked
    );

    // single string of selected reasons
    const selectedReasonsString = selectedReasons.join(",");

    props.handleSubmit(selectedReasonsString);
  };

  return (
    <>
      <Modal onClose={props.onClose}>
        <div>
          <h1 className="text-xl mb-1 font-semibold dark:text-white">Report</h1>
          <hr className="bg-[#FFA500] h-[1px] border-0 mb-2" />

          <form onSubmit={handleFormSubmit}>
            <div className="dark:bg-sg p-3 pt-2 mb-2">
              <h1 className="dark:text-white">
                Please select appropriate reasons from the given options:
              </h1>
              <div>
                <input
                  name="inappropriateContent"
                  className="mt-2"
                  type={"checkbox"}
                  onChange={handleChange}
                ></input>
                <label className="ml-2 dark:text-white dark:font-light">
                  Inappropriate content.
                </label>
              </div>

              <div>
                <input
                  name="vulgarWords"
                  className="mt-2"
                  type={"checkbox"}
                  onChange={handleChange}
                ></input>
                <label className="ml-2 dark:text-white dark:font-light">
                  Usage of vulgar/offensive words.
                </label>
              </div>

              <div>
                <input
                  name="spam"
                  className="mt-2"
                  type={"checkbox"}
                  onChange={handleChange}
                ></input>
                <label className="ml-2 dark:text-white dark:font-light">
                  Spam contents.
                </label>
              </div>

              <div>
                <input
                  name="harassment"
                  className="mt-2"
                  type={"checkbox"}
                  onChange={handleChange}
                ></input>
                <label className="ml-2 dark:text-white dark:font-light">
                  Harrassment contents.
                </label>
              </div>

              <p className="italic m-0 mt-2 font-thin dark:text-white">
                *Atleast one option must be selected.
              </p>
            </div>

            <hr className="bg-[#FFA500] h-[2px] border-0" />

            <div className="flex flex-row items-center mt-2">
              <button
                type="button"
                className="ml-auto dark:text-white"
                onClick={props.onClose}
              >
                Cancel
              </button>
              <button
                className={`${
                  props.checkedCounter === 0
                    ? "bg-gray-500"
                    : "bg-[#ED820E] hover:bg-[#FC6A03]"
                } rounded-md h-10 p-2 ml-5 text-white w-24 `}
                type="submit"
                disabled={props.checkedCounter === 0}
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
