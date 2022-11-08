import React from "react";
import Navbar from "../components/Layout/Navbar";
import NavButtons from "../components/NavButtons";
import Slider from "../components/Slider";
import StARs from "../components/StARs";
import InputBox from "../components/InputBox";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Post from "../components/Post";

import { useDispatch, useSelector } from "react-redux";
import { showInputBox } from "../features/homeSlice";

import "../styles/share.css";

const Home = () => {
  const { shareIsShown } = useSelector((store) => store.home);
  const dispatch = useDispatch();

  return (
    <>
      <Navbar />
      <div className="lg:mx-36 dark:bg-tb">
        <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
          {/* the [stream/people] div on the main body, during mobile mode*/}
          <NavButtons />
        </div>

        <div className="flex justify-center mb-4">
          <Slider />
        </div>

        <div className="flex flex-row">
          <StARs />

          {/* div for 'create post' and posts */}
          <div className="flex flex-col w-full ml-2 mr-6 min-h-screen lg:ml-3 lg:mr-[30px] sm:max-lg:w-auto sm:max-lg:ml-[22px] sm:max-lg:mr-[37px]">
            <div className="shadow flex flex-row items-center rounded-lg w-full h-16 border-[1px] mb-6 dark:border-[#FFA500]">
              <Avatar
                size={45}
                icon={<UserOutlined />}
                style={{
                  color: "#f56a00",
                  backgroundColor: "#fde3cf",
                  position: "static",
                  marginRight: "20px",
                  marginLeft: "10px",
                  boxShadow: "0 0 0 2px #FFA500",
                }}
                className="cursor-pointer"
              />
              <p
                className="mb-0 cursor-pointer text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-500"
                onClick={() => {
                  dispatch(showInputBox());
                }}
              >
                Share your thoughts, with your friends.
              </p>
            </div>
            {shareIsShown && <InputBox />}

            {/* Container for displaying posts */}
            <div className="lg:mx-auto">
              <Post />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
