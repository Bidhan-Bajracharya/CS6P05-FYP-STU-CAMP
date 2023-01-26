import React, { useEffect, useState } from "react";
import H1 from "../../components/UI/H1";
import SettingWrapper from "../../components/UI/SettingWrapper";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";

const Setting = () => {
  useNotification();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const logout = useLogout();
  const navigate = useNavigate();

  const resetPassword = async (event) => {
    event.preventDefault();

    // checking done by the regex below
    // At least one lowercase letter (?=.*[a-z])
    // At least one uppercase letter (?=.*[A-Z])
    // At least one number (?=.*\d)
    // At least one special character (@$!%?&) (?=.[@$!%*?&])
    // starts and ends with alphanumeric or special characters [A-Za-z\d@$!%*?&]

    try {
      if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
      } else if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]*$/.test(newPassword)
      ) {
        throw new Error(
          "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character"
        );
      } else if (/\s/.test(newPassword)) {
        throw new Error("Password should not contain any spaces or tabs");
      }

      if (newPassword !== confirmNewPassword) {
        const error = new Error("Please enter the same password.");
        throw error;
      }

      await axiosPrivate.patch(
        "/users/reset-password",
        JSON.stringify({ newPassword })
      );

      // resetting the fields
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      // check if 'error.response' exists
      if (error.response && error.response.status === 400) {
        setErrMsg(error.response.data.msg);
      } else {
        setErrMsg(error.message);
      }
    }
  };

  useEffect(() => {
    setErrMsg(""); // empty out any error if the user changes the passwords
  }, [newPassword, confirmNewPassword]);

  const signout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <SettingWrapper>
        <H1>Edit Profile</H1>

        <div className="ml-7 mb-5">
          {/* Edit profile div */}
          <div className="flex flex-row items-center">
            <Avatar
              size={90}
              icon={<UserOutlined />}
              style={{
                color: "#f56a00",
                backgroundColor: "#fde3cf",
                position: "static",
                marginLeft: "10px",
                boxShadow: "0 0 0 2px #893101",
              }}
            />

            <button
              type="button"
              className="bg-[#ED820E] rounded-lg h-12 p-2 ml-5 text-white w-32 hover:bg-[#FC6A03]"
            >
              Change Photo
            </button>
          </div>
          <div className="mt-5 ml-3 dark:text-white">
            <p className="mb-0">Upload new avatar.</p>
            <p className="mb-0">
              Maximum upload size is{" "}
              <span className="font-semibold m-0">1MB.</span>
            </p>
          </div>
        </div>

        <H1>Reset Password</H1>

        <form onSubmit={resetPassword} autoComplete="off">
          <div className="flex flex-col ml-7">
            <input
              type="password"
              id="new_password"
              autoComplete="off"
              required
              value={newPassword}
              className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
              placeholder="New password..."
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              type="password"
              id="re_password"
              required
              value={confirmNewPassword}
              autoComplete="off"
              className="w-60 h-9 rounded-3xl align-baseline p-3 mb-4 border-2 border-[#FFA500] focus:outline-[#FFA500] dark:bg-sg dark:text-white"
              placeholder="Re-write password..."
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            {errMsg && <p className="text-red-600">{errMsg}</p>}

            <button
              type="submit"
              className="bg-[#ED820E] rounded-lg h-12 p-2 text-white w-32 hover:bg-[#FC6A03]"
            >
              Reset
            </button>

            <p className="italic text-[#808080] text-sm font-light mt-3">
              Passwords of minimum length 8 is recommended with special
              characters and numbers.
            </p>
          </div>
        </form>

        <H1>Sign-out</H1>
        <button
          type="button"
          className="bg-[#ED820E] rounded-lg h-12 p-2 text-white w-32 hover:bg-[#FC6A03] ml-7 lg:mb-2"
          onClick={() => signout()}
        >
          Sign out
        </button>
      </SettingWrapper>
    </>
  );
};

export default Setting;
