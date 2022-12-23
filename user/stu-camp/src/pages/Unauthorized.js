import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  // go back to the page, user came from
  const goBack = () => navigate(-1);
  return (
    <>
      <div className="h-screen flex justify-center flex-col">
        <h1 className="mb-0 text-8xl mx-auto">Unauthorized</h1>
        <button onClick={goBack} className='mx-auto text-xl mt-5'>Go back</button>
      </div>
    </>
  );
};

export default Unauthorized;
