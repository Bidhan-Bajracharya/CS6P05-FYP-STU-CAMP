import React, { useState } from "react";
import axios from "../api/axios";
import { BsFillCheckCircleFill } from "react-icons/bs";

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/forgot-password", { email: email });
      setSuccess(true);
      console.log(response);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-[#FA8128]">
        {!success ? (
          <form
            className="flex flex-col justify-center items-center w-4/5 h-max p-5 bg-[#FC6A03] rounded-3xl gap-y-2 md:w-[50%] md:p-2 lg:p-2 lg:w-[450px]"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-white mt-2">
              Forgot Password
            </h2>
            <p className="mb-3 text-white text-center">
              Enter your email and we will send you a request link
            </p>

            <input
              required
              placeholder="someone@islingtoncollege.edu.np"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none h-8 w-full rounded-md mb-1 p-2 sm:w-[80%] lg:w-[80%] outline-offset-0 focus:outline-[#FFA500]"
            />
            <button
              className="bg-[#EC9706] hover:bg-[#ec9806b6] mb-3 h-8 w-full rounded-md sm:w-[80%] lg:w-[80%]"
              type="submit"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="flex flex-col justify-center items-center w-4/5 h-max p-5 bg-[#FC6A03] rounded-3xl gap-y-2 md:w-[40%] md:p-2 lg:p-2 lg:w-[350px]">
            <BsFillCheckCircleFill size={30} className="text-white my-2" />

            <p className="mb-2">An email has been sent to your account</p>
          </div>
        )}
      </section>
    </>
  );
};

export default ForgotPasswordRequest;
