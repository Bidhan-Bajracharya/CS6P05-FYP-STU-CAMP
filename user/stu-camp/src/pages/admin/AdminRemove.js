import React, { useState, useEffect } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import VerifyPopUp from "../../components/UI/VerifyPopUp";

const AdminRemove = () => {
  const [uniID, setUniID] = useState(""); // uniID search field
  const [student, setStudent] = useState({}); // student detail
  const [errMsg, setErrMsg] = useState("");
  const [verify, setVerify] = useState(false); // verfication box state
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
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  useEffect(() => {
    setErrMsg(""); // empty out any error if the user changes uniID
  }, [uniID]);

  return (
    <>
      <SettingWrapper>
        <H1>Remove Student</H1>

        <section className="flex flex-col p-3">
          <h1 className="text-xl font-semibold dark:text-white">
            Search for student
          </h1>
          {/* <label className="mb-2 ml-2 font-semibold">University ID</label> */}
          {errMsg && <h1 className="text-red-600 mb-1">{errMsg}</h1>}
          <input
            placeholder="University ID"
            className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
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

        {student.name && !errMsg && (
          <>
            <section className="flex flex-col  bg-[#FA8128] p-3 m-2 rounded-md lg:flex-row">
              <div className="flex justify-center w-full lg:w-fit lg:ml-5 lg:items-center">
                {verify && (
                  <VerifyPopUp
                    onClose={setVerify}
                    msg="Delete this user?"
                    deleteHandler={() => deleteHandler()}
                  />
                )}
                <Avatar
                  size={90}
                  icon={<UserOutlined />}
                  style={{
                    color: "#f56a00",
                    backgroundColor: "#fde3cf",
                    position: "static",
                    boxShadow: "0 0 0 2px #893101",
                  }}
                />
              </div>

              <div className="flex flex-col mt-5 ml-5 lg:ml-10">
                <h1 className="font-semibold text-xl">Student Information</h1>
                <h1 className="font-semibold text-lg mb-0">
                  University ID: {student.uni_id}
                </h1>
                <h1 className="font-semibold text-lg mb-0">
                  Name: {student.name}
                </h1>
                <h1 className="font-semibold text-lg mb-0">
                  Role: {student.userType}
                </h1>
                <h1 className="font-semibold text-lg mb-0">
                  Department: {student.department}
                </h1>
                <h1 className="font-semibold text-lg mb-0">
                  Section: {student.section}
                </h1>
                <h1 className="font-semibold text-lg mb-0">
                  Year: {student.year}
                </h1>
                <h1 className="font-semibold text-lg mb-0">
                  Email: {student.email}
                </h1>
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

export default AdminRemove;
