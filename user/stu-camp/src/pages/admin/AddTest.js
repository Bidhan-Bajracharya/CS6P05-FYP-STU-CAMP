import React from "react";
import { axiosPrivate } from "../../api/axios";

const AddTest = () => {
  const handleSubmit = async () => {
    try {
      const response = await axiosPrivate.post(
        "/admin/user",
        JSON.stringify({
          name: "Nischal",
          email: "nisi",
          password: "secret",
          uni_id: "12345",
          userType: 1845,
          department: "Computing",
          section: "C1",
          year: 1,
        })
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return <div onClick={handleSubmit}>AddTest</div>;
};

export default AddTest;
