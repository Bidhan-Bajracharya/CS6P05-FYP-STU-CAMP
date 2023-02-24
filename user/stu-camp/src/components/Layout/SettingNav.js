import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "antd";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons";
import { AiOutlineClose } from "react-icons/ai";

import { closeNav, toggleNav } from "../../features/navbarSlice";
import { toggleDarkMode } from "../../features/themeSlice";

import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as GoIcons from "react-icons/go";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

import logo from "../../images/logo-no-background.png";
import "../../styles/navbar.css";

const SettingNav = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const { navIsActive } = useSelector((store) => store.navbar);
  const { isDark } = useSelector((store) => store.theme);
  const { unreadNotifications } = useSelector((store) => store.notification);
  const { profile_pic } = useSelector((store) => store.user);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER; // image folder path

  const dispatch = useDispatch();

  let menuRef = useRef();

  useEffect(() => {
    let handler = (event) => {
      // checking if the mouseclick is inside or outside the div
      if (!menuRef.current.contains(event.target)) {
        // if click outside, close navbar
        dispatch(closeNav());
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const signout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      {navIsActive && <div className="nav-backdrop"></div>}

      <IconContext.Provider value={{ color: "#A3A1A1" }}>
        <div className="navbar dark:bg-cb sticky top-0 bg-white">
          <Link to="#" className="menu-bars">
            <FaBars
              size={30}
              onClick={() => {
                dispatch(toggleNav());
              }}
            />
          </Link>

          <div className="w-[30%] lg:w-fit">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                width="250px"
                height="150px"
                style={{ marginLeft: "20px" }}
              />
            </Link>
          </div>

          <div className="flex flex-row ml-auto">
            <Link to="/notifications">
              <div className="relative h-fit mr-5 lg:mr-8 my-auto lg:mt-1 rounded-full dark:hover:bg-sg p-2 hover:bg-[#DFDFDF] cursor-pointer">
                <BsIcons.BsBellFill size={25} />
                {unreadNotifications.length !== 0 && (
                  <div className="absolute top-0 right-0 flex items-center justify-center rounded-full bg-red-600 text-white w-[20px] h-[20px] text-[10px]">
                  {unreadNotifications.length}
                </div>
                )}
              </div>
            </Link>

            <Avatar
              size={{
                xs: 40, // mobile
                md: 50, // tablet
                xl: 50, // laptop
              }}
              icon={<UserOutlined />}
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                position: "static",
                marginRight: "20px",
                boxShadow: "0 0 0 2px #FFA500",
              }}
              src={
                profile_pic !== "default" && (
                  <img alt="user" src={PF + "/" + profile_pic} />
                )
              }
              className="cursor-pointer"
            />
          </div>
        </div>

        <nav
          className={
            navIsActive ? "nav-menu active dark:bg-cb" : "nav-menu dark:bg-cb"
          }
          ref={menuRef}
        >
          <ul className="nav-menu-items">
            <li
              className="navbar-toggle dark:bg-cb"
              onClick={() => {
                dispatch(toggleNav());
              }}
            >
              <Link to="#" className="menu-bars">
                <AiOutlineClose size={25}/>
              </Link>
            </li>

            <li
              className="nav-text"
              onClick={() => {
                dispatch(toggleNav());
              }}
            >
              <Link to="/">
                <AiIcons.AiFillHome size={20}/>{" "}
                <span className="ml-4 text-base select-none dark:text-white">Home</span>
              </Link>
            </li>

            <li className="nav-text">
              {/* MdLightMode */}
              <Link to="#">
                <div>
                  {isDark ? <MdIcons.MdNightlight size={20}/> : <MdIcons.MdLightMode size={20}/>}
                </div>
                <span className="ml-4 text-base select-none dark:text-white">Theme</span>
                <div className="switch">
                  <Switch
                    checked={isDark}
                    style={{ marginLeft: "70px" }}
                    onChange={() => {
                      dispatch(toggleDarkMode());
                    }}
                  />
                </div>
              </Link>
            </li>

            <li
              className="nav-text"
              onClick={() => {
                dispatch(toggleNav());
              }}
            >
              <Link to="/account">
                <IoIcons.IoMdSettings size={20}/>{" "}
                <span className="ml-4 text-base select-none dark:text-white">Settings</span>
              </Link>
            </li>

            <li
              className="nav-text"
              onClick={() => {
                dispatch(toggleNav());
                signout();
              }}
            >
              <Link>
                <GoIcons.GoSignOut size={20}/>{" "}
                <span className="ml-4 text-base select-none dark:text-white">Sign out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default SettingNav;
