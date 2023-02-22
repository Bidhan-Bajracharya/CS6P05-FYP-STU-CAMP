import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      const error = new Error("Please enter the same password.");
      throw error;
    }

    try {
      const response = await axios.post(
        `/forgot-password/reset/${id}/${token}`,
        { newPassword }
      );
      console.log(response);
      setSuccess(true);
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-[#FA8128]">
        {!success ? (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center w-4/5 h-max p-5 bg-[#FC6A03] rounded-3xl gap-y-2 md:p-2 lg:p-2 md:w-[50%] lg:w-[450px]"
          >
            <h2 className="text-2xl font-bold text-white mt-2">
              Forgot Password
            </h2>
            <p>Please enter a new password</p>

            <input
              required
              placeholder="New password..."
              className="outline-none h-8 w-full rounded-md mb-1 p-2 sm:w-[80%] lg:w-[80%] outline-offset-0 focus:outline-[#FFA500]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
              required
              placeholder="Confirm password..."
              className="outline-none h-8 w-full rounded-md mb-1 p-2 sm:w-[80%] lg:w-[80%] outline-offset-0 focus:outline-[#FFA500]"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />

            <button
              className="bg-[#EC9706] hover:bg-[#ec9806b6] mb-3 h-8 w-full rounded-md sm:w-[80%] lg:w-[80%]"
              type="submit"
            >
              Reset Password
            </button>
          </form>
        ) : (
          <div className="flex flex-col justify-center items-center w-4/5 h-max p-5 bg-[#FC6A03] rounded-3xl gap-y-2 md:w-[40%] md:p-2 lg:p-2 md:py-5 lg:py-5 lg:w-[450px]">
            <h1 className="font-semibold text-3xl mb-2">Success!</h1>
            <p className="text-center">
              Your password has been reset, now please login with your new
              password
            </p>

            <button
              className="bg-[#EC9706] hover:bg-[#ec9806b6] h-8 w-full rounded-md sm:w-[80%] lg:w-[80%]"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        )}
      </section>
    </>
  );
};

export default ResetPassword;
