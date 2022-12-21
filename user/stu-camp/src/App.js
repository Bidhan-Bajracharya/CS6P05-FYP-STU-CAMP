import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Layout from "./components/Layout/Layout";
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
import Unauthorized from "./pages/Unauthorized";
import Test from "./components/Test";

import "./App.css";

function App() {
  const { isDark } = useSelector((store) => store.theme);
  const ROLES = {
    ADMIN: 1991,
    STUDENT: 1845,
    STAR: 1691,
  };

  return (
    // <div className={isDark ? "dark min-h-screen" : "min-h-screen"}>
    //   <div className="dark:bg-tb ">
    //     <Router>
    //       <Routes>
    //         <Route path="/" exact element={<Home />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/people" element={<People />} />
    //         <Route path="/account" element={<Setting />} />
    //         <Route path="/notifications" element={<Notification />} />
    //         <Route path="/account-notifications" element={<AccountNotification />} />
    //         <Route path="/account-post" element={<AccountPosts />} />
    //         <Route path="/admin" element={<AdminHome />} />
    //         <Route path="/admin/add-student" element={<AdminAdd />} />
    //         <Route path="/test" element={<Test />} />
    //         <Route path="/*" element={<PageNotFound />} />
    //       </Routes>
    //     </Router>
    //   </div>
    // </div>

    <div className={isDark ? "dark min-h-screen" : "min-h-screen"}>
      <div className="dark:bg-tb ">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public route */}
            <Route path="/login" exact element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLES.STUDENT, ROLES.STAR]} />
                }
              >
                <Route path="/" element={<Home />} />
                <Route path="/people" element={<People />} />
                <Route path="/account" element={<Setting />} />
                <Route path="/notifications" element={<Notification />} />
                <Route
                  path="/account-notifications"
                  element={<AccountNotification />}
                />
                <Route path="/account-post" element={<AccountPosts />} />
                <Route path="/test" element={<Test />} />
              </Route>

              {/* Admin routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/admin/add-student" element={<AdminAdd />} />
              </Route>
            </Route>

            {/* catch all */}
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
