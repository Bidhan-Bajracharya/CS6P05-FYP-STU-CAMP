import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import RequireAuth from "./components/wrapper/RequireAuth";
import PersistLogin from "./components/wrapper/PersistLogin";
import Layout from "./components/wrapper/Layout";
import Login from "./pages/Login";
import Home from "./pages/student/Home";
import UserHomeLayout from "./components/wrapper/UserHomeLayout";
import UserSettingLayout from "./components/wrapper/UserSettingLayout";
import People from "./pages/People";
import Setting from "./pages/student/Setting";
import Notification from "./pages/student/Notification";
import AccountPosts from "./pages/student/AccountPosts";
import AccountNotification from "./pages/student/AccountNotification";
import PageNotFound from "./pages/PageNotFound";
import AdminHome from "./pages/admin/AdminHome";
import AdminAdd from "./pages/admin/AdminAdd";
import AdminUpdate from "./pages/admin/AdminUpdate";
import AdminAccount from "./pages/admin/AdminAccount";
import AdminAccountSetting from "./pages/admin/AdminAccountSetting";
import Report from "./pages/admin/Report";
import NotifyPage from "./pages/admin/NotifyPage";
import Unauthorized from "./pages/Unauthorized";
import AdminSettingLayout from "./components/wrapper/AdminSettingLayout";
import AdminLayout from "./components/wrapper/AdminLayout"
import ViewStudents from "./pages/admin/ViewStudents";
import AdminRemove from "./pages/admin/AdminRemove";

import PeopleLayout from "./components/wrapper/PeopleLayout";
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
                <Route element={<UserHomeLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/notifications" element={<Notification />} />
                </Route>

                <Route element={<UserSettingLayout />}>
                  <Route path="/account" element={<Setting />} />
                  <Route
                    path="/account-notifications"
                    element={<AccountNotification />}
                  />
                  <Route path="/account-post" element={<AccountPosts />} />
                </Route>
              </Route>

              {/* Common Route */}
              <Route
                element={
                  <RequireAuth
                    allowedRoles={[ROLES.ADMIN, ROLES.STUDENT, ROLES.STAR]}
                  />
                }
              >
                <Route element={<PeopleLayout />}>
                  <Route path="/people" element={<People />} />
                </Route>
              </Route>

              {/* Admin routes */}
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                <Route path="/test" element={<Test />} />
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminHome />} />
                  <Route path="/admin/account" element={<AdminAccount />} />
                </Route>

                <Route element={<AdminSettingLayout />}>
                  <Route path="/admin/view-students" element={<ViewStudents />} />
                  <Route path="/admin/add-student" element={<AdminAdd />} />
                  <Route path="/admin/remove-student" element={<AdminRemove />} />
                  <Route
                    path="/admin/update-student"
                    element={<AdminUpdate />}
                  />
                  <Route
                    path="/admin/account-setting"
                    element={<AdminAccountSetting />}
                  />
                  <Route path="/admin/reports" element={<Report />} />
                  <Route path="/admin/notify" element={<NotifyPage />} />
                </Route>
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
