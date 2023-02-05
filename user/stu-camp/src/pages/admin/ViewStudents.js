import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import { useNavigate, useLocation } from "react-router-dom";
import { ConfigProvider, Table } from "antd";
import { useSelector } from "react-redux";

const ViewStudents = () => {
  const { isDark } = useSelector((store) => store.theme);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const controller = new AbortController(); // cancel our request, when component unmounts

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/admin/user", {
          signal: controller.signal,
        });
        console.log(response.data);
        setUsers(response.data.users);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      controller.abort();
    };
  }, []);

  const columns = [
    {
      title: "University ID",
      width: 100,
      dataIndex: "uni_id",
      key: "uni_id",
      fixed: "left",
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "userType",
      key: "userType",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const data = [];

  // populating table data
  for (let i = 0; i < users.length; i++) {
    data.push({
      key: i,
      uni_id: users[i].uni_id,
      name: users[i].name,
      userType: users[i].userType === 1845 ? "Student" : "Class Representative",
      department: users[i].department,
      year: users[i].year,
      section: users[i].section,
      email: users[i].email,
    });
  }

  return (
    <>
      <SettingWrapper>
        <H1>View Students</H1>

        <div className="mt-10">
          <ConfigProvider
            theme={{
              token: {
                colorBgBase: isDark ? "#2B2B2B" : '',
                colorText: isDark? "white" : '',
                borderRadius: "none",
              },
            }}
          >
            <Table
              columns={columns}
              dataSource={data}
              bordered={true}
              scroll={{
                x: 1300,
              }}
              pagination={{ pageSize: 4 }} // 4 rows per page
            />
          </ConfigProvider>
        </div>
      </SettingWrapper>
    </>
  );
};

export default ViewStudents;
