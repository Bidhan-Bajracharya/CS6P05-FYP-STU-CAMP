import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import { useNavigate, useLocation } from "react-router-dom";
import { ConfigProvider, Table, theme } from "antd";
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
      width: 130,
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
      filters: [
        {
          text: 'Student',
          value: 'Student',
        },
        {
          text: 'Class Representative',
          value: 'Class Representative',
        },
      ],
      onFilter: (value, record) => record.userType.startsWith(value),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: [
        {
          text: 'Computing',
          value: 'Computing',
        },
        {
          text: 'Networking',
          value: 'Networking',
        },
        {
          text: 'Multimedia',
          value: 'Multimedia',
        },
      ],
      onFilter: (value, record) => record.department === value,
      width: '12%',
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      filters: [
        {
          text: '1st',
          value: 1,
        },
        {
          text: '2nd',
          value: 2,
        },
        {
          text: '3rd',
          value: 3,
        },
      ],
      onFilter: (value, record) => record.year === value,
      width: '10%',
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

  // const onChange = (pagination, filters, sorter, extra) => {
  //   console.log('params', filters, extra);
  // };

  return (
    <>
      <SettingWrapper>
        <H1>View Students</H1>

        <div className="mt-10">
          <ConfigProvider
            theme={{
              token: {
                // colorBgBase: isDark ? "#2B2B2B" : '',
                // colorText: isDark? "white" : '',
                borderRadius: "none",
                colorPrimary: "#ED820E"
              },
              algorithm: isDark && theme.darkAlgorithm,
            }}
          >
            <Table
              columns={columns}
              dataSource={data}
              bordered={true}
              scroll={{
                x: 1300,
              }}
              pagination={{ pageSize: 6 }} // 4 rows per page
              // onChange={onChange}
            />
          </ConfigProvider>
        </div>
      </SettingWrapper>
    </>
  );
};

export default ViewStudents;
