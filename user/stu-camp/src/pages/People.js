import React, { useState, useEffect } from "react";
import NavButtons from "../components/Layout/NavButtons";
import H1 from "../components/UI/H1";
import PeopleList from "../components/PeopleList";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

const People = () => {
  const [expanded, setExpanded] = useState();
  const [users, setUsers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const { userType } = useSelector((store) => store.user);

  const toggleExpand = () => {
    setExpanded((prevState) => !prevState);
  };

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

  useEffect(() => {
    const getAdmins = async () => {
      try {
        const response = await axiosPrivate.get("/users/people/admin");
        setAdmin(response.data.admins);
      } catch (error) {
        console.log(error);
      }
    };

    getAdmins();
  }, []);

  // filtering out stars
  const getStars = users.filter((student) => student.userType === 1691);

  // filtering out normal students
  const getStudents = users.filter((student) => student.userType === 1845);

  // only 4 stars displayed initially
  const starsForDisplay = expanded ? getStars : getStars.slice(0, 4);

  return (
    <>
      <div className="visible h-[80px] mb-4 lg:invisible lg:w-0 lg:h-0">
        <NavButtons userRoute={`${userType === 1991 ? '/admin' : '/'}`} />
      </div>

      <section className="lg:mx-[270px] sm:max-lg:mx-[30px] lg:max-xl:mx-[180px]">
        <div className="mb-6 dark:bg-tb">
          {/* Admin list*/}
          <H1>Admins</H1>

          {admin.map((admin) => (
            <PeopleList
              key={admin._id}
              fname={admin.name}
              email={admin.email}
            />
          ))}
        </div>

        <div className="mb-5">
          {/* star list*/}
          <H1>StARs</H1>

          {starsForDisplay.map((star) => (
            <PeopleList
              key={star.uni_id}
              fname={star.name}
              department={star.department}
              email={star.email}
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

          {getStudents.map((student) => (
            <PeopleList
              key={student.uni_id}
              fname={student.name}
              department={student.department}
              email={student.email}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default People;
