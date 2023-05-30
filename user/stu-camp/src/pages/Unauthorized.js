import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  // go back to the page, user came from
  const goBack = () => navigate(-1);
  return (
    <>
      <div className="h-screen flex justify-center flex-col bg-[#e7f4fd]">
        <div className="mx-auto">
          <img
            src={require("../images/403.jpg")}
            className="w-full h-[320px]"
            alt="403_error"
          />
        </div>
        <h1 className="mb-0 text-4xl mx-auto lg:text-7xl">Forbidden</h1>
        <p className="mx-auto text-xl">Access to this resource is denied</p>
        <button onClick={goBack} className="mx-auto text-xl mt-5 underline">
          Go back
        </button>
      </div>
    </>
  );
};

export default Unauthorized;
