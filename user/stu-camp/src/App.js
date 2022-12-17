import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/Login";
import Home from "./pages/Home";
import People from "./pages/People";
import Setting from "./pages/Setting";
import Notification from "./pages/Notification";
import AccountPosts from "./pages/AccountPosts";
import AccountNotification from "./pages/AccountNotification";
import PageNotFound from "./pages/PageNotFound";
import AdminHome from "./pages/AdminHome";
import AdminAdd from "./pages/AdminAdd";
import Test from "./components/Test"

import "./App.css";

function App() {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <div className={isDark ? "dark min-h-screen" : "min-h-screen"}>
      <div className="dark:bg-tb ">
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/people" element={<People />} />
            <Route path="/account" element={<Setting />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/account-notifications" element={<AccountNotification />} />
            <Route path="/account-post" element={<AccountPosts />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/add-student" element={<AdminAdd />} />
            <Route path="/test" element={<Test />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;