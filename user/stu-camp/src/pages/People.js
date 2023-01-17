import React, { useState, useEffect } from "react";
import NavButtons from "../components/Layout/NavButtons";
import H1 from "../components/UI/H1";
import PeopleList from "../components/PeopleList";
import StARsData from "../data/StARsData";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const People = () => {
  const [expanded, setExpanded] = useState();
  const [stars, setStars] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [students, setStudents] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

  const starsForDisplay = expanded ? StARsData : StARsData.slice(0, 4);

  useEffect(() => {
    const getUsers = async() => {
      try {
        const response = await axiosPrivate.get("/users/people")
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
        <NavButtons />
      </div>

      <section className="lg:mx-[270px] sm:max-lg:mx-[30px] lg:max-xl:mx-[180px]">
        <div className="mb-5">
          {/* star list*/}
          <H1>StARs</H1>

          {starsForDisplay.map((stars) => (
            <PeopleList
              key={stars.section}
              fname={stars.fname}
              department={stars.department}
            />
          ))}

          <div className="flex w-full justify-center">
            <button
              type="button"
              onClick={() => toggleExpand()}
              className="font-semibold pt-2 w-fit text-lg dark:text-white"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>

        <div className="h-screen dark:bg-tb">
          {/* normal students list*/}
          <H1>Users</H1>

          {StARsData.map((stars) => (
            <PeopleList
              key={stars.section}
              fname={stars.fname}
              department={stars.department}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default People;
