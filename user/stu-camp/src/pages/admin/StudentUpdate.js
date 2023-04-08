import React, { useState, useEffect } from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import { Radio, Select, ConfigProvider } from "antd";
import SelectConfig from "../../components/wrapper/SelectConfig";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import QuickPopUp from "../../components/UI/QuickPopUp";

const StudentUpdate = () => {
  const [uniID, setUniID] = useState("");
  const [student, setStudent] = useState({});
  const [initialDetail, setInitialDetail] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const getStudent = async () => {
    try {
      const response = await axiosPrivate.get(`/admin/user/${uniID}`);
      setStudent(response.data.user);
      setInitialDetail(response.data.user); // saving initial detail for comparison
      console.log(response.data);
    } catch (err) {
      setErrMsg("User not found");

      // clear state if error
      setStudent({});
      setInitialDetail({});
      console.log(err.response.data.msg);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // passing only the modified fields as body
      const modifiedData = Object.fromEntries(
        Object.entries(student).filter(
          ([key, value]) => initialDetail[key] !== value
        )
      );

      const response = await axiosPrivate.patch(
        `/admin/user/${student._id}`,
        modifiedData
      );
      console.log(response);
      setUpdateSuccess(true);
      setStudent({});
      setInitialDetail({});
      setUniID("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setErrMsg(""); // empty out any error if the user changes uniID
  }, [uniID]);

  const onRoleChange = (e) => {
    setStudent((prevState) => {
      return { ...prevState, userType: e.target.value };
    });
  };

  const onYearChange = (e) => {
    setStudent((prevState) => {
      return { ...prevState, year: e.target.value };
    });
  };

  const isDisabled = () => {
    // checking if any fields have been updated
    return (
      student.department === initialDetail.department &&
      student.email === initialDetail.email &&
      student.name === initialDetail.name &&
      student.section === initialDetail.section &&
      student.uni_id === initialDetail.uni_id &&
      student.year === initialDetail.year &&
      student.userType === initialDetail.userType
    );
  };

  // update successful quick pop-up
  useEffect(() => {
    if (updateSuccess) {
      const timeoutId = setTimeout(() => {
        setUpdateSuccess(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [updateSuccess]);

  return (
    <>
      <SettingWrapper>
        <H1>Update Students</H1>

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
            disabled={!uniID} // disabled if no uniID is provided
            className={`rounded-lg h-12 p-2 text-white w-32 ${
              !uniID ? "bg-gray-500" : "bg-[#ED820E] hover:bg-[#FC6A03]"
            }`}
          >
            Search
          </button>
        </section>

        {updateSuccess && (
          <QuickPopUp
            icon="success"
            title="Updated"
            subTitle="Details updated successfully"
          />
        )}

        {initialDetail.name && (
          <section className="mt-5">
            <h1 className="ml-3 dark:text-white text-lg font-semibold lg:text-lg">
              Student Information
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col flex-wrap h-fit bg-[#DFDFDF] p-2 pt-5 pl-5 rounded-lg dark:bg-sg m-3">
                <div className="my-auto">
                  <label className="dark:text-white font-semibold text-md lg:text-lg">
                    University ID:
                  </label>
                  <input
                    required
                    value={student.uni_id}
                    className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 ml-[24px] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
                    onChange={(e) =>
                      setStudent((prevState) => {
                        return { ...prevState, uni_id: e.target.value };
                      })
                    }
                  />
                </div>

                <div className="my-auto">
                  <label className="dark:text-white font-semibold text-md lg:text-lg">
                    Full Name:
                  </label>
                  <input
                    required
                    value={student.name}
                    className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 ml-[42px] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] dark:bg-sg dark:text-white lg:ml-[50px]"
                    onChange={(e) =>
                      setStudent((prevState) => {
                        return { ...prevState, name: e.target.value };
                      })
                    }
                  />
                </div>

                <div className="mb-[10px]">
                  <label className="dark:text-white font-semibold text-md mr-12 lg:text-lg lg:mr-[30px]">
                    Role:
                  </label>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#ED820E",
                      },
                    }}
                  >
                    <Radio.Group
                      onChange={onRoleChange}
                      value={student.userType}
                    >
                      <Radio
                        value={1845}
                        className="dark:text-white text-md lg:text-lg"
                      >
                        Student
                      </Radio>
                      <Radio
                        value={1691}
                        className="dark:text-white text-md lg:text-lg"
                      >
                        Class Representative
                      </Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>

                <div className="mb-[10px]">
                  <label className="dark:text-white font-semibold text-md mr-[30px] lg:text-lg lg:mr-[40px]">
                    Department:
                  </label>
                  <SelectConfig>
                    <Select
                      value={student.department}
                      style={{
                        width: 140,
                      }}
                      options={[
                        {
                          value: "Computing",
                          label: "Computing",
                        },
                        {
                          value: "Networking",
                          label: "Networking",
                        },
                        {
                          value: "MultiMedia",
                          label: "MultiMedia",
                        },
                      ]}
                      onChange={(value) =>
                        setStudent((prevState) => {
                          console.log(value);
                          return { ...prevState, department: value };
                        })
                      }
                    />
                  </SelectConfig>
                </div>

                <div className="mb-[10px]">
                  <label className="dark:text-white font-semibold text-md mr-12 lg:text-lg lg:mr-[30px]">
                    Year:
                  </label>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorPrimary: "#ED820E",
                      },
                    }}
                  >
                    <Radio.Group onChange={onYearChange} value={student.year}>
                      <Radio
                        value={1}
                        className="dark:text-white text-md lg:text-lg"
                      >
                        Year 1
                      </Radio>
                      <Radio
                        value={2}
                        className="dark:text-white text-md lg:text-lg"
                      >
                        Year 2
                      </Radio>
                      <Radio
                        value={3}
                        className="dark:text-white text-md lg:text-lg"
                      >
                        Year 3
                      </Radio>
                    </Radio.Group>
                  </ConfigProvider>
                </div>

                <div className="my-auto">
                  <label className="dark:text-white font-semibold text-md lg:text-lg">
                    Section:
                  </label>
                  <input
                    required
                    value={student.section}
                    className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 ml-[58px] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] lg:ml-[70px] dark:bg-sg dark:text-white"
                    onChange={(e) =>
                      setStudent((prevState) => {
                        return { ...prevState, section: e.target.value };
                      })
                    }
                  />
                </div>

                <div className="my-auto">
                  <label className="dark:text-white font-semibold text-md lg:text-lg">
                    Email:
                  </label>
                  <input
                    required
                    value={student.email}
                    className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 ml-[70px] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] lg:ml-[86px] dark:bg-sg dark:text-white"
                    onChange={(e) =>
                      setStudent((prevState) => {
                        return { ...prevState, email: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`rounded-lg h-12 p-2 text-white w-24 ml-3 mb-3 ${
                  isDisabled()
                    ? "bg-gray-500"
                    : "bg-[#ED820E] hover:bg-[#FC6A03]"
                }`}
                disabled={isDisabled()}
              >
                Update
              </button>
            </form>
          </section>
        )}
      </SettingWrapper>
    </>
  );
};

export default StudentUpdate;
