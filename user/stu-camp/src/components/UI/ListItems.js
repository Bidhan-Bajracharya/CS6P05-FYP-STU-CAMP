import React from "react";

const ListItems = (props) => {
  return (
    <li className="flex justify-center rounded-xl items-center w-full h-full
    cursor-pointer select-none lg:justify-start lg:h-fit lg:p-1 lg:rounded-sm lg:pl-2  lg:text-base lg:text-black lg:dark:text-white">
      {props.children}
    </li>
  );
};

export default ListItems;
