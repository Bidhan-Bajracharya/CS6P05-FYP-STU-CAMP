import React, { useState, useEffect } from "react";
import SettingWrapper from "../../components/UI/SettingWrapper";
import H1 from "../../components/UI/H1";
import { MdEdit } from "react-icons/md";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminUpdate = () => {

  return (
    <>
      <SettingWrapper>
        <H1>Update Students</H1>

        <section className="p-2 lg:p-0">
          
         
        </section>
      </SettingWrapper>
    </>
  );
};

export default AdminUpdate;
