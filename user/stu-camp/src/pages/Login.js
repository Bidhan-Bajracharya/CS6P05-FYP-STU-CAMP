import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "../api/axios";
import "../styles/select.css";

const LOGIN_URL = "/api/v1/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef(); // to focus on user when the component loads
  const errRef = useRef(); // to focus on error when error is generated

  // for the type of user => admin, student
  // const [userType, setUserType] = useState('');
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(""); // replace this with react router in da future

  useEffect(() => {
    userRef.current.focus(); // to set the focus on the first input when the component loads
  }, []);

  useEffect(() => {
    setErrMsg(""); // empty out any error if the user changes the user state or password state
  }, [user, pwd]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL, // 1st param
        JSON.stringify({ user, pwd }), // 2nd param
        {
          // 3rd param
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No server response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
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
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user} // makes this a controlled input
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
          onChange={(e) => setPwd(e.target.value)}
          value={pwd} // makes this a controlled input
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
