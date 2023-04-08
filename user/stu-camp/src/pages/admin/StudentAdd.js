import React, { useState, useEffect } from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Select } from "antd";
import SelectConfig from "../../components/wrapper/SelectConfig";
import QuickPopUp from "../../components/UI/QuickPopUp";

const StudentAdd = () => {
  const initial = {
    name: "",
    email: "",
    password: "",
    uni_id: "",
    userType: 1845,
    department: "Computing",
    section: "",
    year: 1,
  };

  const [userData, setUserData] = useState(initial);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorInfo, setErrorInfo] = useState({});
  const axiosPrivate = useAxiosPrivate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // check for section's value pattern
      let pattern;
      switch (userData.department) {
        // pattern -> start with starting letter of corresponding department, followed by single or double digit number
        case "Computing":
          pattern = /^C[0-9]{1,2}$/;
          break;
        case "Networking":
          pattern = /^N[0-9]{1,2}$/;
          break;
        case "MultiMedia":
          pattern = /^M[0-9]{1,2}$/;
          break;
        default:
          pattern = /^[A-Z][0-9]{1,2}$/;
          break;
      }

      const isValid = pattern.test(userData.section);
      if (!isValid) {
        setShowError(true);
        setErrorInfo(() => {
          return {
            title: "Section mismatch",
            subTitle: "Section must match department",
          };
        });
        return;
      }

      // submit the form
      const response = await axiosPrivate.post("/admin/user", userData);
      console.log(response);
      setSuccess(true);
      setUserData(initial);
    } catch (error) {
      setShowError(true);
      setErrorInfo(() => {
        return {
          title: "Registration Error",
          subTitle: error.response.data.msg,
        };
      });
    }
  };

  // successful quick pop-up
  useEffect(() => {
    if (success) {
      const timeoutId = setTimeout(() => {
        setSuccess(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [success]);

  // error quick pop-up
  useEffect(() => {
    if (showError) {
      const timeoutId = setTimeout(() => {
        setShowError(false);
        setErrorInfo({});
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [showError]);

  return (
    <>
      <SettingWrapper>
        <H1>Add Students</H1>

        {success && (
          <QuickPopUp
            icon="success"
            title="Added"
            subTitle="Student added successfully"
          />
        )}

        {showError && (
          <QuickPopUp
            icon="warning"
            title={errorInfo.title}
            subTitle={errorInfo.subTitle}
          />
        )}

        <form onSubmit={handleSubmit} autoComplete="new-password">
          <div className="flex flex-col flex-wrap h-fit p-2 rounded-lg m-3 bg-[#E9ECEF] dark:bg-sg">
            <section className="flex flex-row justify-around">
              <div className="flex flex-col mb-3 lg:mx-auto">
                <label className="dark:text-white text-md lg:text-lg">
                  Role
                </label>
                <SelectConfig>
                  <Select
                    defaultValue={1845}
                    style={{
                      width: 120,
                    }}
                    options={[
                      {
                        value: 1845,
                        label: "Student",
                      },
                      {
                        value: 1691,
                        label: "Class Rep",
                      },
                    ]}
                    onChange={(value) =>
                      setUserData((prevState) => {
                        return { ...prevState, userType: value };
                      })
                    }
                  />
                </SelectConfig>
              </div>

              <div className="flex flex-col mb-5 lg:mx-auto">
                <label className="dark:text-white text-md lg:text-lg">
                  Department
                </label>
                <SelectConfig>
                  <Select
                    defaultValue="Computing"
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
                      setUserData((prevState) => {
                        return { ...prevState, department: value };
                      })
                    }
                  />
                </SelectConfig>
              </div>

              <div className="flex flex-col mb-5 lg:mx-auto">
                <label className="dark:text-white text-md lg:text-lg">
                  Year
                </label>
                <SelectConfig>
                  <Select
                    defaultValue={1}
                    style={{
                      width: 120,
                    }}
                    options={[
                      {
                        value: 1,
                        label: "1st",
                      },
                      {
                        value: 2,
                        label: "2nd",
                      },
                      {
                        value: 3,
                        label: "3rd",
                      },
                    ]}
                    onChange={(value) =>
                      setUserData((prevState) => {
                        return { ...prevState, year: value };
                      })
                    }
                  />
                </SelectConfig>
              </div>
            </section>

            <section>
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col  mb-3 lg:mx-auto">
                  <label className="dark:text-white text-md lg:text-lg">
                    Full Name
                  </label>
                  <input
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 bg-[#DFDFDF] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] lg:w-60 dark:bg-sg dark:text-white"
                    placeholder="Full name"
                    value={userData.name}
                    required
                    onChange={(e) =>
                      setUserData((prevState) => {
                        return { ...prevState, name: e.target.value };
                      })
                    }
                  />
                </div>

                <div className="flex flex-col  mb-3 lg:mx-auto">
                  <label className="dark:text-white text-md lg:text-lg">
                    Email
                  </label>
                  <input
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 bg-[#DFDFDF] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] lg:w-60 dark:bg-sg dark:text-white"
                    placeholder="Email"
                    autoComplete="off"
                    type={"email"}
                    required
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prevState) => {
                        return { ...prevState, email: e.target.value };
                      })
                    }
                  />
                </div>

                <div className="flex flex-col mb-3 lg:mr-auto lg:mx-auto">
                  <label className="dark:text-white text-md lg:text-lg">
                    Default password
                  </label>
                  <input
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 bg-[#DFDFDF] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] lg:w-60 dark:bg-sg dark:text-white"
                    placeholder="Default password"
                    type="password"
                    required
                    autoComplete="new-password"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData((prevState) => {
                        return { ...prevState, password: e.target.value };
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col  mb-3 lg:mx-auto">
                  <label className="dark:text-white text-md lg:text-lg">
                    Uni ID
                  </label>
                  <input
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 bg-[#DFDFDF] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] lg:w-60 dark:bg-sg dark:text-white"
                    placeholder="University ID"
                    value={userData.uni_id}
                    required
                    onChange={(e) =>
                      setUserData((prevState) => {
                        return { ...prevState, uni_id: e.target.value };
                      })
                    }
                  />
                </div>

                <div className="flex flex-col  mb-5 lg:mr-auto">
                  <label className="dark:text-white text-md lg:text-lg">
                    Section
                  </label>
                  <input
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 bg-[#DFDFDF] outline-none outline-offset-0 border-[1px] border-[#FFA500] focus:border-0 focus:outline-[#FFA500] lg:w-60 dark:bg-sg dark:text-white"
                    placeholder="Section"
                    required
                    value={userData.section}
                    onChange={(e) =>
                      setUserData((prevState) => {
                        return { ...prevState, section: e.target.value };
                      })
                    }
                  />
                </div>
              </div>
            </section>
          </div>
          <button
            type="submit"
            className="bg-[#ED820E] rounded-lg h-12 p-2 text-white w-24 hover:bg-[#FC6A03] ml-3"
          >
            Add
          </button>
        </form>
      </SettingWrapper>
    </>
  );
};

export default StudentAdd;
