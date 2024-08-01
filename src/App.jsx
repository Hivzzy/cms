// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import AuthLayout from "./layouts/AuthLayout";
import ChangePassword from "./pages/ChangePassword";
import { useState } from "react";
import LoginHopeUI from "./pages/LoginHopeUI";

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/global-style.css'

function App() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route element={<AuthLayout isEmailSent={isEmailSent} />}>
            <Route path="/" element={<Navigate to="/login" />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword isEmailSent={isEmailSent} setIsEmailSent={setIsEmailSent} />}></Route>
            <Route path="/change-password" element={<ChangePassword />}></Route>
          </Route>
          <Route path="/hope/login" element={<LoginHopeUI />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
