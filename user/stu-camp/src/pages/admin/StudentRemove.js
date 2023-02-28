import React, { useState, useEffect } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import ConfirmationPopUp from "../../components/UI/ConfirmationPopUp";
import QuickPopUp from "../../components/UI/QuickPopUp";
import { HiOutlineSquare2Stack } from "react-icons/hi2";

const StudentRemove = () => {
  const [uniID, setUniID] = useState(""); // uniID search field
  const [student, setStudent] = useState({}); // student detail
  const [errMsg, setErrMsg] = useState("");
  const [verify, setVerify] = useState(false); // verfication box state
  const [removeSuccessful, setRemoveSuccessful] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const getStudent = async () => {
    try {
      const response = await axiosPrivate.get(`/admin/user/${uniID}`);
      setStudent(response.data.user);
      console.log(response.data);
    } catch (err) {
      setErrMsg("User not found");
      setStudent({});
      console.log(err.response.data.msg);
    }
  };

  const deleteHandler = async () => {
    try {
      const response = await axiosPrivate.delete(`/admin/user/${uniID}`);
      setUniID("");
      setStudent({});
      setRemoveSuccessful(true);
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  useEffect(() => {
    setErrMsg(""); // empty out any error if the user changes uniID
  }, [uniID]);

  // open and closing of delete confirmation pop-over
  const handleDeleteConfirmation = () => {
    setVerify((prevState) => !prevState);
  };

  // deletion successful quick pop-up
  useEffect(() => {
    if (removeSuccessful) {
      const timeoutId = setTimeout(() => {
        setRemoveSuccessful(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [removeSuccessful]);

  return (
    <>
      <SettingWrapper>
        <H1>Remove Student</H1>

        <section className="flex flex-col p-3">
          <h1 className="text-xl mb-1 font-semibold dark:text-white">
            Search for student
          </h1>
          {/* <label className="mb-2 ml-2 font-semibold">University ID</label> */}
          {errMsg && <h1 className="text-red-600 mb-1">{errMsg}</h1>}
          <input
            placeholder="University ID"
            className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 bg-[#DFDFDF] outline-none outline-offset-0 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
            value={uniID}
            onChange={(e) => setUniID(e.target.value)}
            required
          />
          <button
            onClick={() => getStudent()}
            disabled={!uniID}
            className={`rounded-lg h-12 p-2 text-white w-32 ${
              !uniID ? "bg-gray-500" : "bg-[#ED820E] hover:bg-[#FC6A03]"
            }`}
          >
            Search
          </button>
        </section>

        {removeSuccessful && (
          <QuickPopUp
            icon="success"
            title="Deleted"
            subTitle="Student has been removed"
          />
        )}

        {student.name && !errMsg && (
          <>
            <section className="flex flex-col m-2 rounded-md lg:flex-row dark:text-white">
              {/* pfp box */}
              <div className="flex flex-col p-2 rounded-md items-center w-fit h-fit bg-[#DFDFDF] dark:bg-sg lg:w-[15%]">
                <Avatar
                  size={70}
                  icon={<UserOutlined />}
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    position: "static",
                    boxShadow: "0 0 0 2px #893101",
                  }}
                />
                <hr className="dark:border-0 h-[2px] dark:h-[1px] w-full bg-[#FFA500] mt-3" />
                <h3 className="mt-3">{student.name}</h3>
                <p className="text-[#808080] text-sm">{student.uni_id}</p>
              </div>

              {/* details box */}
              <div className="flex flex-col p-2 rounded-md w-fit bg-[#DFDFDF] lg:ml-10 lg:p-3 lg:w-[45%] dark:bg-sg">
                <h2 className="flex flex-row mb-3 text-xl">
                  <HiOutlineSquare2Stack size={24} className="my-auto" />
                  General Information
                </h2>

                <table className="w-full">
                  <tr>
                    <td className="border-[1px] p-2 border-gray-400 font-semibold">Role</td>
                    <td className="border-[1px] p-2 border-gray-400 w-5 text-center">:</td>
                    <td className="border-[1px] p-2 border-gray-400">{student.userType}</td>
                  </tr>
                  <tr>
                    <td className="border-[1px] p-2 border-gray-400 font-semibold">Department</td>
                    <td className="border-[1px] p-2 border-gray-400 w-5 text-center">:</td>
                    <td className="border-[1px] p-2 border-gray-400">{student.department}</td>
                  </tr>
                  <tr>
                    <td className="border-[1px] p-2 border-gray-400 font-semibold">Section</td>
                    <td className="border-[1px] p-2 border-gray-400 w-5 text-center">:</td>
                    <td className="border-[1px] p-2 border-gray-400">{student.section}</td>
                  </tr>
                  <tr>
                    <td className="border-[1px] p-2 border-gray-400 font-semibold">Year</td>
                    <td className="border-[1px] p-2 border-gray-400 w-5 text-center">:</td>
                    <td className="border-[1px] p-2 border-gray-400">{student.year}</td>
                  </tr>
                  <tr>
                    <td className="border-[1px] p-2 border-gray-400 font-semibold">Email</td>
                    <td className="border-[1px] p-2 border-gray-400 w-5 text-center">:</td>
                    <td className="border-[1px] p-2 border-gray-400">{student.email}</td>
                  </tr>
                </table>
              </div>
            </section>
            <button
              onClick={() => setVerify(true)}
              className="bg-[#ED820E] rounded-lg h-12 p-2 text-white w-32 hover:bg-[#FC6A03] ml-2 mb-5"
            >
              Delete
            </button>
          </>
        )}
      </SettingWrapper>
    </>
  );
};

export default StudentRemove;
