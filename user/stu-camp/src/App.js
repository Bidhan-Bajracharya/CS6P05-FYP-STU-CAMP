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
import StudentAdd from "./pages/admin/StudentAdd";
import StudentUpdate from "./pages/admin/StudentUpdate";
import AdminAccount from "./pages/admin/AdminAccount";
import AdminAccountSetting from "./pages/admin/AdminAccountSetting";
import Report from "./pages/admin/Report";
import NotifyPage from "./pages/admin/NotifyPage";
import Unauthorized from "./pages/Unauthorized";
import AdminOperationLayout from "./components/wrapper/AdminOperationLayout";
import AdminLayout from "./components/wrapper/AdminLayout"
import ViewStudents from "./pages/admin/ViewStudents";
import StudentRemove from "./pages/admin/StudentRemove";
import DeletePosts from "./pages/admin/DeletePosts";
import StudentHistory from "./pages/admin/StudentHistory";
import ForgotPasswordRequest from "./pages/ForgotPasswordRequest";
import ResetPassword from "./pages/ResetPassword";
import PeopleLayout from "./components/wrapper/PeopleLayout";
import roles from "./data/roles";
import "./App.css";
import StudentManagementLayout from "./components/wrapper/StudentManagementLayout";
import AdminAccountManagementLayout from "./components/wrapper/AdminAccountManagementLayout";

function App() {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <div className={isDark ? "dark min-h-screen" : "min-h-screen"}>
      <div className="dark:bg-tb ">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public route */}
            <Route path="/login" exact element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/forgot-password" element={<ForgotPasswordRequest />} />
            <Route path="/reset-password/:id/:token" element={<ResetPassword />} />

            {/* protected routes */}
            <Route element={<PersistLogin />}>
              <Route
                element={
                  <RequireAuth allowedRoles={[roles.STUDENT, roles.STAR]} />
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
                    allowedRoles={[roles.ADMIN, roles.STUDENT, roles.STAR]}
                  />
                }
              >
                <Route element={<PeopleLayout />}>
                  <Route path="/people" element={<People />} />
                </Route>
              </Route>

              {/* Admin routes */}
              <Route element={<RequireAuth allowedRoles={[roles.ADMIN]} />}>
                <Route element={<AdminLayout />}>
                  <Route path="/admin" element={<AdminHome />} />
                </Route>

                <Route element={<AdminAccountManagementLayout />}>
                  <Route path="/admin/account" element={<AdminAccount />} />
                  <Route
                    path="/admin/account-setting"
                    element={<AdminAccountSetting />}
                  />
                </Route>

                <Route element={<StudentManagementLayout />}>
                  <Route path="/admin/view-students" element={<ViewStudents />} />
                  <Route path="/admin/add-student" element={<StudentAdd />} />
                  <Route path="/admin/remove-student" element={<StudentRemove />} />
                  <Route
                    path="/admin/update-student"
                    element={<StudentUpdate />}
                  />
                  <Route path="/admin/history-student" element={<StudentHistory />} />
                </Route>

                <Route element={<AdminOperationLayout />}> 
                  <Route path="/admin/reports" element={<Report />} />
                  <Route path="/admin/notify" element={<NotifyPage />} />
                  <Route path="/admin/posts" element={<DeletePosts />} />
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
