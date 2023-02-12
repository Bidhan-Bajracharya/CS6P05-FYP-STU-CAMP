import React, { useEffect, useState } from "react";
import StARsList from "./StARsList";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const StARs = ({ currentSection }) => {
  const [expanded, setExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users/people");
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  // filtering out stars
  const getStars = users.filter((student) => student.userType === 1691);

  // filtering stars according to their department
  const displayStars = getStars.filter((star) =>
    currentSection === "Common" ? true : star.department === currentSection
  );

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  // display only 4 names initially
  const dataForDisplay = expanded ? displayStars : displayStars.slice(0, 4);

  return (
    <>
      <div className="flex border-2 border-[#FFA500] rounded-xl invisible flex-col p-1.5 w-0 h-0 lg:w-[260px] lg:visible lg:ml-7 lg:h-max lg:max-xl:ml-5">
        <h2 className="flex justify-center text-base font-semibold dark:text-white">
          StARs
        </h2>
        <hr className="dark:border-0 dark:h-[1px] dark:bg-[#808080] mb-1" />

        {dataForDisplay.map((star) => (
          <StARsList
            key={star.section}
            fname={star.name}
            department={star.department}
            section={star.section}
            email={star.email}
            profile_pic={star.profile_pic}
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
