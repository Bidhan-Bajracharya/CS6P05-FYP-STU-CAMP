import React from "react";
import { Spin } from "antd";

const LoadingScreen = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-full">
        <Spin size="large" />
      </div>
    </>
  );
};

export default LoadingScreen;
