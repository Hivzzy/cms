// css
import '../src/assets/css/global-style.css'
import '../src/assets/css/sidebar.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
// Not found
import NotFound from "./pages/NotFound";

// Auth
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ChangePassword from "./pages/auth/ChangePassword";
// Dashborad
import DashboardLayout from "./layouts/DashboardLayout";
import User from "./pages/dashboard/user/User";
import AddUser from "./pages/dashboard/user/AddUser";
import EditUser from "./pages/dashboard/user/EditUser";

// scss
import "./assets/scss/hope-ui.scss"
import "./assets/scss/custom.scss"
import "./assets/scss/dark.scss"
import "./assets/scss/rtl.scss"
import "./assets/scss/customizer.scss"

function App() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<AuthLayout isEmailSent={isEmailSent} setIsEmailSent={setIsEmailSent} />}>
            <Route path="/" element={<Navigate to="/sign-in" />}></Route>
            <Route path="/sign-in" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword isEmailSent={isEmailSent} setIsEmailSent={setIsEmailSent} />}></Route>
            <Route path="/change-password" element={<ChangePassword />}></Route>
            {/* Path nerima token */}
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="/dashboard/user" element={<User />}></Route>
            <Route path="/dashboard/user/add" element={<AddUser />}></Route>
            <Route path="/dashboard/user/edit/:userId" element={<EditUser />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
