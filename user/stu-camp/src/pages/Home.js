import React from "react";
import NavButtons from "../components/Layout/NavButtons";
import Slider from "../components/Slider";
import StARs from "../components/stARs/StARs";
import InputBox from "../components/content/InputBox";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Post from "../components/content/Post";

import { useDispatch, useSelector } from "react-redux";
import { showInputBox } from "../features/homeSlice";

import "../styles/share.css";
import EmptyContent from "../images/EmptyContent";
import { Link } from "react-router-dom";

const Home = () => {
  const { shareIsShown } = useSelector((store) => store.home);
  const dispatch = useDispatch();

  return (
    <>
      <div className="lg:mx-36 dark:bg-tb lg:max-xl:ml-[90px]">
        <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
          {/* the [stream/people] div on the main body, during mobile mode*/}
          <NavButtons />
        </div>

        <div className="flex justify-center mb-4 lg:mr-0 lg:max-xl:w-[850px]">
          <Slider />
        </div>

        {/* <Link to="/admin">admin link</Link>
        <Link to="/test">test link</Link> */}

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
              {/* <Post /> */}
              <div className="w-[200px] h-[200px] lg:w-[200px] lg:h-[200px] mx-auto">
                <EmptyContent
                  stroke="gray"
                  fill="gray"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
