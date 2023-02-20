import React, { useState } from "react";
import axios from "../api/axios";

const ForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/forgot-password", { email: email });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-[#FA8128]">
        <form
          className="flex flex-col justify-center items-center w-4/5 h-max p-2 bg-[#FC6A03] rounded-3xl gap-y-2 md:w-[50%] lg:w-[450px]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-white mt-2">
            Forgot Password
          </h2>
          <p>Enter your email and we will send you a request link</p>

          <p className="text-red-600 text-center">
            This email does not exist. Please provide a valid email.
          </p>
          <input
            required
            placeholder="someone@islingtoncollege.edu.np"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
      </section>
    </>
  );
};

export default ForgotPasswordRequest;
