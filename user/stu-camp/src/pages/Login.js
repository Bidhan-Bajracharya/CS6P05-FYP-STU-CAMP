import React, { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import ErrorPopUp from "../components/UI/ErrorPopUp";
import { useNavigate, Link } from "react-router-dom";
import "../styles/select.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/userSlice";
import jwt_decode from "jwt-decode";
// import { BiLogIn } from "react-icons/bi";

const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const emailRef = useRef(); // to focus on email when the component loads

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useDispatch();

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

      const accessToken = response?.data?.accessToken;
      const userType = response?.data?.user.userType;
      const roles = [userType];
      const userPayload = jwt_decode(accessToken);

      setAuth({ email, roles, accessToken });
      dispatch(loginUser(userPayload));

      setEmail("");
      setPassword("");

      if (userType === 1991) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg(error.response.data.msg);
      } else if (error.response?.status === 401) {
        setErrMsg(error.response.data.msg);
      } else {
        setErrMsg("Login failed");
      }
    }
  };

  return (
    <section className="flex justify-center items-center h-screen font-poppins bg-bubbles md:bg-[length:1888px_1180.25px] lg:bg-[length:1370px_856.25px]">
      {/* popup error message */}
      {errMsg && <ErrorPopUp onClose={setErrMsg} msg={errMsg} />}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center w-4/5 h-max p-2 bg-[#FC6A03] rounded-3xl gap-y-2 md:w-[50%] lg:w-[450px]"
      >
        <h2 className="text-2xl font-bold text-white mb-5 mt-2">Sign-in</h2>
        <div className="flex flex-col w-full px-5 lg:px-8">
          <label htmlFor="userEmail" className="text-lg font-medium text-white">
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
            className="w-full h-9 rounded-3xl align-baseline p-3 mb-5 outline-none outline-offset-0 focus:outline-[#FFA500] focus:shadow-lg"
            placeholder="mail@islingtoncollege.edup.np"
          />

          <label htmlFor="password" className="text-lg font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password..."
            required
            className="w-full h-9 rounded-3xl align-baseline p-3 outline-none outline-offset-0 focus:outline-[#FFA500] focus:shadow-lg"
          />
        </div>

        <Link to="/forgot-password" className="flex justify-end text-[15px] text-white px-5 mr-1 mt-2 w-full">Forgot password?</Link>
        <button className="relative shadow-lg rounded-3xl w-24 h-9 bg-[#EC9706] mb-2 mt-2 sm:mt-0 hover:bg-[#ec9806b6]">
          {/* <BiLogIn size={25} className="absolute left-0 ml-2"/> */}
          <span className="">Login</span>
        </button>
      </form>
    </section>
  );
};

export default Login;
