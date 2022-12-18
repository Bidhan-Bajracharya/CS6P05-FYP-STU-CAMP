import React, { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/select.css";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // where the user came from

  const emailRef = useRef(); // to focus on email when the component loads
  const errRef = useRef(); // to focus on error when error is generated

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus(); // to set the focus on the first input when the component loads
  }, []);

  useEffect(() => {
    setErrMsg(""); // empty out any error if the user changes the user state or password state
  }, [email, password]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const userType = response?.data?.user.userType;
      const roles = [userType];

      setAuth({ email, password, roles, accessToken });

      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Invalid request message");
      } else if (error.response?.status === 401) {
        setErrMsg("Invalid email and password");
      } else {
        setErrMsg("Login failed");
      }
      // errRef.current.focus();
    }
  };

  return (
    <section className="flex justify-center items-center h-screen font-poppins bg-[#FA8128]">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-4/5 h-max p-2 border-2 bg-[#FC6A03] rounded-3xl gap-y-2 lg:w-[450px]"
      >
        <h2 className="text-2xl font-bold text-white">Login</h2>
        <label
          htmlFor="userEmail"
          className="mr-[200px] text-lg font-medium text-white lg:mr-[300px]"
        >
          Email
        </label>
        <input
          type="Email"
          id="userEmail"
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email} // makes this a controlled input
          required
          className="w-[80%] h-9 rounded-3xl align-baseline p-3 mb-2 focus:outline-[#FFA500]"
          placeholder="mail@islingtoncollege.edup.np"
        />

        <label
          htmlFor="password"
          className="mr-[160px] text-lg font-medium text-white lg:mr-[260px]"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          value={password} // makes this a controlled input
          // required
          className="w-[80%] h-9 rounded-3xl align-baseline p-3 mb-2 focus:outline-[#FFA500]"
        />
        <button className="border-2 rounded-3xl w-24 h-9 bg-[#EC9706]">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
