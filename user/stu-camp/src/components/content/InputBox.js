import React from "react";
import autosize from "autosize";
import { BsImages } from "react-icons/bs";
import Modal from "../UI/Modal";

import { useDispatch, useSelector } from "react-redux";
import { hideInputBox } from "../../features/homeSlice";

const InputBox = (props) => {
  // removing the scroll bar from text area
  // allowing text area's height to change as per content
  autosize(document.querySelector("textarea"));

  const { isDark } = useSelector((store) => store.theme);
  const dispatch = useDispatch();

  return (
    <>
      <Modal onClose={props.onClose}>
        <div className="max-h-[300px]">
          <h1 className="text-xl font-semibold dark:text-white">Create post</h1>
          <hr className="bg-[#FFA500] h-[1px] border-0 mb-5" />
          <form>
            <textarea
              className="text-box resize-none w-full min-h-[160px] h-fit dark:bg-sg p-2 dark:text-white"
              placeholder={`What is on your mind, Bidhan`}
            />
            <hr className="bg-[#FFA500] h-[2px] border-0" />

            <div className="flex flex-row items-center mt-2">
              <div className="rounded-full dark:hover:bg-sg dark:active:bg-lb p-2 ml-[-8px] hover:bg-[#DFDFDF] active:hover:bg-[#acaaaa] cursor-pointer">
                <BsImages
                  size={25}
                  color={isDark ? "white" : ""}
                />
              </div>

              <button
                type="button"
                className="ml-auto dark:text-white"
                onClick={() => {
                  dispatch(hideInputBox());
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-[#ED820E] rounded-md h-10 p-2 ml-5 text-white w-24 hover:bg-[#FC6A03]"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default InputBox;
