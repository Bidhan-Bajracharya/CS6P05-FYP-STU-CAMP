import React, { useState, useEffect, useRef } from "react";
import AdminNav from "../../components/Layout/AdminNav";
import AdminSideBoard from "../../components/Layout/AdminSideBoard";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import { Table } from "antd";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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

const AdminUpdate = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const data = [];

  const effectRun = useRef(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // cancel our request, when component unmounts

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/admin/user", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data.users);
      } catch (err) {
        console.log(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    // Check if useEffect has run the first time
    if (effectRun.current) {
      getUsers();
    }

    return () => {
      isMounted = false;
      controller.abort();
      effectRun.current = true;
    };
  }, []);

  // populating table data
  for (let i = 0; i < users.length; i++) {
    data.push({
      key: i,
      uni_id: users[i].uni_id,
      name: users[i].name,
      userType: users[i].userType,
      department: users[i].department,
      year: users[i].year,
      section: users[i].section,
      email: users[i].email,
    });
  }

  return (
    <>
      <AdminNav />
      <AdminSideBoard />
      <SettingWrapper>
        <H1>Update Students</H1>

        <section className="p-2 lg:p-0">
          <div className="mb-5">
            <button
              type="button"
              className="bg-[#ED820E] rounded-lg h-10 p-2 text-white w-24 hover:bg-[#FC6A03]"
            >
              Update
            </button>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{
              x: 1300,
            }}
            pagination={{ pageSize: 4 }} // 4 rows per page
          />

        </section>
      </SettingWrapper>
    </>
  );
};

export default AdminUpdate;
