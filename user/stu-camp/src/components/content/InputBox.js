import React from "react";
import { BsImages } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import Modal from "../UI/Modal";

import { useDispatch, useSelector } from "react-redux";
import { hideInputBox } from "../../features/homeSlice";

const InputBox = (props) => {
  const { isDark } = useSelector((store) => store.theme);
  const { name } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <>
      <Modal onClose={props.onClose}>
        <div className="max-h-[300px]">
          <h1 className="text-xl font-semibold dark:text-white">Create post</h1>
          <hr className="bg-[#FFA500] h-[1px] border-0 mb-5" />
          <form onSubmit={props.handleSubmit}>
            <textarea
              className="text-box resize-none w-full min-h-[160px] h-fit bg-[#DFDFDF] dark:bg-sg p-2 dark:text-white"
              placeholder={`What is on your mind, ${name} ?`}
              required
              onChange={props.setBody}
              value={props.body}
            />

            {props.imgFile && (
              <div className="flex flex-row p-1 rounded-md dark:bg-sg bg-[#DFDFDF] cursor-pointer w-fit max-w-[180px] relative mb-1">
                <BsImages
                  size={15}
                  color={isDark ? "white" : ""}
                  className="my-auto"
                />
                <p className="mb-0 ml-2 mr-5 dark:text-white select-none overflow-hidden max-w-[75%] max-h-[23px]">
                  {props.imgFile.name}
                </p>

                <ImCancelCircle
                  size={12}
                  color={isDark ? "white" : ""}
                  className="my-auto mr-1 absolute right-0 inset-y-0"
                  onClick={() => props.onImageRemove()}
                />
              </div>
            )}

            <hr className="bg-[#FFA500] h-[2px] border-0" />

            <div className="flex flex-row items-center mt-2">
              <label
                htmlFor="file"
                className="rounded-full dark:hover:bg-sg dark:active:bg-lb p-2 ml-[-8px] hover:bg-[#DFDFDF] active:hover:bg-[#acaaaa] cursor-pointer"
              >
                <BsImages size={25} color={isDark ? "white" : ""} />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => props.onImageIconClick(e.target.files[0])}
                />
              </label>

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
                className={` rounded-md h-10 p-2 ml-5 text-white w-24 ${
                  !props.body
                    ? "bg-gray-500"
                    : "bg-[#ED820E] hover:bg-[#FC6A03]"
                }`}
                type="submit"
                disabled={!props.body}
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
