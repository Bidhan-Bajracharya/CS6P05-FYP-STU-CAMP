import React, { useState } from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import { axiosPrivate } from "../../api/axios";

import { Select, ConfigProvider } from "antd";

const AdminAdd = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    uni_id: "",
    userType: 1845,
    department: "",
    section: "",
    year: 1,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosPrivate.post("/admin/user", userData);
      console.log(response);
      setUserData({});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SettingWrapper>
        <H1>Add Students</H1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row flex-wrap h-fit bg-white p-2 rounded-lg dark:bg-sg m-3">
            <div className="flex flex-col order-1 mb-3 lg:mx-auto">
              <label>Full Name</label>
              <input
                className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
                placeholder="Full name"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prevState) => {
                    return { ...prevState, name: e.target.value };
                  })
                }
              />
            </div>

            <div className="flex flex-col order-2 mb-3 lg:mx-auto">
              <label>Email</label>
              <input
                className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prevState) => {
                    return { ...prevState, email: e.target.value };
                  })
                }
              />
            </div>

            <div className="flex flex-col order-3 mb-3 mr-auto lg:mx-auto">
              <label>Default password</label>
              <input
                className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
                placeholder="Default password"
                value={userData.password}
                onChange={(e) =>
                  setUserData((prevState) => {
                    return { ...prevState, password: e.target.value };
                  })
                }
              />
            </div>

            <div className="flex flex-col order-4 mb-3 lg:mx-auto">
              <label>Uni ID</label>
              <input
                className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
                placeholder="University ID"
                value={userData.uni_id}
                onChange={(e) =>
                  setUserData((prevState) => {
                    return { ...prevState, uni_id: e.target.value };
                  })
                }
              />
            </div>

            <div className="flex flex-col order-5 mb-3 mr-auto ml-9 lg:mx-auto">
              <label>Role</label>
              <ConfigProvider theme={{ components: { borderRadius: 2 } }}>
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

            <div className="flex flex-col order-6 mb-5 lg:mx-auto">
              <label>Department</label>
              <Select
                defaultValue="Computing"
                style={{
                  width: 120,
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
            </div>

            <div className="flex flex-col order-8 mb-5 lg:mx-auto">
              <label>Year</label>
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
            </div>

            <div className="flex flex-col order-7 mb-5 mr-auto">
              <label>Section</label>
              <input
                className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
                placeholder="section"
                value={userData.section}
                onChange={(e) =>
                  setUserData((prevState) => {
                    return { ...prevState, section: e.target.value };
                  })
                }
              />
            </div>
          </div>
          <button type="submit" className="order-9 w-fit">
            Add
          </button>
        </form>
      </SettingWrapper>
    </>
  );
};

export default AdminAdd;
