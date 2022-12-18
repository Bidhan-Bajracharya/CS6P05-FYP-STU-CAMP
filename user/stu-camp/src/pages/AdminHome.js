import React from "react";
import AdminNav from "../components/Layout/AdminNav";
import NavButtons from "../components/Layout/NavButtons";
import Slider from "../components/Slider";
import StARs from "../components/stARs/StARs";
import Post from "../components/content/Post";
import "../styles/share.css";
import EmptyContent from "../images/EmptyContent";

const AdminHome = () => {
  return (
    <>
      <AdminNav />
      <div className="lg:mx-36 dark:bg-tb lg:max-xl:ml-[90px]">
        <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
          <NavButtons />
        </div>

        <div className="flex justify-center mb-4 lg:max-xl:w-[850px]">
          <Slider />
        </div>

        <div className="flex flex-row">
          <StARs />

          <div className="flex flex-col w-full ml-2 mr-6 min-h-screen lg:ml-3 lg:mr-[30px] sm:max-lg:w-auto sm:max-lg:ml-[22px] sm:max-lg:mr-[37px]">
            {/* Container for displaying posts */}
            <div className="lg:mx-auto">
              <Post />
              <div className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] mx-auto">
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

export default AdminHome;
