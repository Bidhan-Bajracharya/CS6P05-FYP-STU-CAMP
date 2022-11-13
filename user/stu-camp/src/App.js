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

import "./App.css";

function App() {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <div className={isDark ? "dark" : ""}>
      <div className="dark:bg-tb">
        <Router>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/people" element={<People />} />
            <Route path="/account" element={<Setting />} />
            <Route path="/notifications" element={<Notification />} />
            <Route
              path="/account_notifications"
              element={<AccountNotification />}
            />
            <Route path="/account_post" element={<AccountPosts />} />
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/add_student" element={<AdminAdd />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;