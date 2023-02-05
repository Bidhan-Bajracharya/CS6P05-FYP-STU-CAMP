import React, { useState } from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";
import { Select, ConfigProvider, theme } from "antd";

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
  const axiosPrivate = useAxiosPrivate();
  const { isDark } = useSelector((store) => store.theme);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.post("/admin/user", userData);
      console.log(response);
      setUserData(initial);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SettingWrapper>
        <H1>Add Students</H1>

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="flex flex-col flex-wrap h-fit bg-white p-2 rounded-lg dark:bg-sg m-3">
            <section className="flex flex-row justify-around">
              <div className="flex flex-col mb-3 lg:mx-auto">
                <label className="dark:text-white text-md lg:text-lg">
                  Role
                </label>
                <ConfigProvider
                  theme={{
                    token: {
                      colorBgBase: isDark ? "#2B2B2B" : "",
                      colorText: isDark ? "white" : "",
                      colorBorder: "#FFA500",
                      // colorPrimary: '#FFA500',
                    },
                    algorithm: isDark && theme.darkAlgorithm,
                  }}
                >
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
                </ConfigProvider>
              </div>

              <div className="flex flex-col mb-5 lg:mx-auto">
                <label className="dark:text-white text-md lg:text-lg">
                  Department
                </label>
                <ConfigProvider
                  theme={{
                    token: {
                      colorBgBase: isDark ? "#2B2B2B" : "",
                      colorText: isDark ? "white" : "",
                      colorBorder: "#FFA500",
                    },
                    algorithm: isDark && theme.darkAlgorithm,
                  }}
                >
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
                </ConfigProvider>
              </div>

              <div className="flex flex-col mb-5 lg:mx-auto">
                <label className="dark:text-white text-md lg:text-lg">
                  Year
                </label>
                <ConfigProvider
                  theme={{
                    token: {
                      colorBgBase: isDark ? "#2B2B2B" : "",
                      colorText: isDark ? "white" : "",
                      colorBorder: "#FFA500",
                    },
                    algorithm: isDark && theme.darkAlgorithm,
                  }}
                >
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
                </ConfigProvider>
              </div>
            </section>

            <section>
              <div className="flex flex-col lg:flex-row">
                <div className="flex flex-col  mb-3 lg:mx-auto">
                  <label className="dark:text-white text-md lg:text-lg">
                    Full Name
                  </label>
                  <input
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] lg:w-60 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
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
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] lg:w-60 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
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
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] lg:w-60 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
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
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] lg:w-60 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
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
                    className="w-full h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] lg:w-60 focus:outline-[#FFA500] dark:bg-sg dark:text-white"
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
