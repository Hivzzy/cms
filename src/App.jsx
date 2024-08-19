// css
import '../src/assets/css/global-style.css'
import '../src/assets/css/sidebar.css'
import '../src/assets/css/form-style.css'

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
import Metadata from './pages/dashboard/metadata/Metadata';
import Article from './pages/dashboard/article/Article';
import AddArticle from './pages/dashboard/article/AddArticle';
import EditArticle from './pages/dashboard/article/EditArticle';
import AddMetadata from './pages/dashboard/metadata/AddMetadata';
import Career from './pages/dashboard/career/Career';
import AddCareer from './pages/dashboard/career/AddCareer';
import EditCareer from './pages/dashboard/career/EditCareer';
import ClientCategory from './pages/dashboard/client-category/ClientCategory';
import AddClientCategory from './pages/dashboard/client-category/AddClientCategory';
import EditClientCategory from './pages/dashboard/client-category/EditClientCategory';
import Client from './pages/dashboard/client/Client';
import AddClient from './pages/dashboard/client/AddClient';
import EditClient from './pages/dashboard/client/EditClient';

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
            <Route path="/dashboard/metadata" element={<Metadata />}></Route>
            <Route path="/dashboard/metadata/add" element={<AddMetadata />}></Route>

            <Route path="/dashboard/article" element={<Article />}></Route>
            <Route path="/dashboard/article/add" element={<AddArticle />}></Route>
            <Route path="/dashboard/article/edit/:articleId" element={<EditArticle />}></Route>
            <Route path="/dashboard/article/detail/:articleId" element={<Article />}></Route>

            <Route path="/dashboard/career" element={<Career />}></Route>
            <Route path="/dashboard/career/add" element={<AddCareer />}></Route>
            <Route path="/dashboard/career/edit/:careerId" element={<EditCareer />}></Route>

            <Route path="/dashboard/clientCategory" element={<ClientCategory />}></Route>
            <Route path="/dashboard/clientCategory/add" element={<AddClientCategory />}></Route>
            <Route path="/dashboard/clientCategory/edit/:clientCategoryId" element={<EditClientCategory />}></Route>

            <Route path="/dashboard/client" element={<Client />}></Route>
            <Route path="/dashboard/client/add" element={<AddClient />}></Route>
            <Route path="/dashboard/client/edit/:clientId" element={<EditClient />}></Route>
            
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
