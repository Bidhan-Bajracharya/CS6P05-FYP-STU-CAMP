import React from "react";
import StARsData from "../data/StARsData";
import StARsList from "./StARsList";

import { useDispatch, useSelector } from "react-redux";
import { toggleExpand } from "../features/stARsSlice";

const StARs = () => {
  const { expanded } = useSelector((store) => store.stARs);
  const { isDark } = useSelector((store) => store.theme);

  const dispatch = useDispatch();

  const dataForDisplay = expanded ? StARsData : StARsData.slice(0, 4); // display only 4 names initially

  return (
    <>
      <div className="flex border-2 border-[#FFA500] rounded-xl invisible flex-col p-1.5 w-0 h-0 lg:w-[260px] lg:visible lg:ml-7 lg:h-max lg:max-xl:ml-5">
        <h2 className="flex justify-center text-base font-semibold dark:text-white">StARs</h2>
        <hr className="dark:border-0 dark:h-[1px] dark:bg-[#808080]"/>

        {dataForDisplay.map((stars) => (
          <StARsList
            key={stars.section}
            fname={stars.fname}
            department={stars.department}
            section={stars.section}
          />
        ))}
        <button
          type="button"
          onClick={() => dispatch(toggleExpand())}
          className="font-semibold pt-2 w-fit ml-auto mr-auto dark:text-white"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </>
  );
};

export default StARs;
