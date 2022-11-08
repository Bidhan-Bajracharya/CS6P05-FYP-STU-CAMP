import React from "react";

const Button = (props) => {
  return (
    <>
      <button
        type="button"
        className="bg-[#ED820E] rounded-lg h-12 p-2 ml-5 text-white w-32"
      >
        {props.children}
      </button>
    </>
  );
};

export default Button;
