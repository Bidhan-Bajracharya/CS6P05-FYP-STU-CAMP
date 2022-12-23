import React, { useEffect, useState } from "react";
import StARsData from "../../data/StARsData";
import StARsList from "./StARsList";
import axios from "axios";

import { useSelector } from "react-redux";

const StARs = () => {
  const [expanded, setExpanded] = useState(false);
  const { isDark } = useSelector((store) => store.theme);

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  const dataForDisplay = expanded ? StARsData : StARsData.slice(0, 4); // display only 4 names initially

  return (
    <>
      <div className="flex border-2 border-[#FFA500] rounded-xl invisible flex-col p-1.5 w-0 h-0 lg:w-[260px] lg:visible lg:ml-7 lg:h-max lg:max-xl:ml-5">
        <h2 className="flex justify-center text-base font-semibold dark:text-white">
          StARs
        </h2>
        <hr className="dark:border-0 dark:h-[1px] dark:bg-[#808080]" />

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
          onClick={() => toggleExpand()}
          className="font-semibold pt-2 w-fit ml-auto mr-auto dark:text-white"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>
    </>
  );
};

export default StARs;
