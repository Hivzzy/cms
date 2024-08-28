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
import EditMetadata from './pages/dashboard/metadata/EditMetadata';
import Expertise from './pages/dashboard/expertise/Expertise';
import AddExpertise from './pages/dashboard/expertise/AddExpertise';
import EditExpertise from './pages/dashboard/expertise/EditExpertise';
import Team from './pages/dashboard/team/Team';
import AddTeam from './pages/dashboard/team/AddTeam';
import EditTeam from './pages/dashboard/team/EditTeam';
import Testimonial from './pages/dashboard/testimonial/Testimonial';
import AddTestimonial from './pages/dashboard/testimonial/AddTestimonial';
import EditTestimonial from './pages/dashboard/testimonial/EditTestimonial';
import { AuthProvider } from './pages/auth/AuthProvider';
import RoutePrivate from './pages/auth/RoutePrivate';
import RouteGuest from './pages/auth/RouteGuest';
import Career from './pages/dashboard/career/Career';
import AddCareer from './pages/dashboard/career/AddCareer';
import EditCareer from './pages/dashboard/career/EditCareer';
import ClientCategory from './pages/dashboard/client-category/ClientCategory';
import AddClientCategory from './pages/dashboard/client-category/AddClientCategory';
import EditClientCategory from './pages/dashboard/client-category/EditClientCategory';
import ExpertiseCategory from './pages/dashboard/expertise-category/ExpertiseCategory';
import AddExpertiseCategory from './pages/dashboard/expertise-category/AddExpertiseCategory';
import EditExpertiseCategory from './pages/dashboard/expertise-category/EditExpertiseCategory';
import Client from './pages/dashboard/client/Client';
import AddClient from './pages/dashboard/client/AddClient';
import EditClient from './pages/dashboard/client/EditClient';
import Portofolio from './pages/dashboard/portofolio/Portofolio';
import AddPortofolio from './pages/dashboard/portofolio/AddPortofolio';
import EditPortofolio from './pages/dashboard/portofolio/EditPortofolio';
import Visitor from './pages/dashboard/visitor/Visitor';

function App() {
  const [isEmailSent, setIsEmailSent] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={
            <RouteGuest element={<AuthLayout isEmailSent={isEmailSent} setIsEmailSent={setIsEmailSent} />}
            />}
          >
            <Route path="/" element={<Navigate to="/sign-in" />}></Route>
            <Route path="/sign-in" element={<Login />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword isEmailSent={isEmailSent} setIsEmailSent={setIsEmailSent} />}></Route>
            <Route path="/change-password" element={<ChangePassword />}></Route>
            {/* Path nerima token */}
          </Route>
          <Route path="/dashboard" element={
            <RoutePrivate element={<DashboardLayout />} />}
          >
            <Route path="/dashboard/metadata" element={<Metadata />}></Route>
            <Route path="/dashboard/metadata/add" element={<AddMetadata />}></Route>
            <Route path="/dashboard/metadata/edit/:id" element={<EditMetadata />}></Route>

            <Route path="/dashboard/article" element={<Article />}></Route>
            <Route path="/dashboard/article/add" element={<AddArticle />}></Route>
            <Route path="/dashboard/article/edit/:id" element={<EditArticle />}></Route>
            <Route path="/dashboard/article/detail/:id" element={<Article />}></Route>

            <Route path="/dashboard/expertise" element={<Expertise />}></Route>
            <Route path="/dashboard/expertise/add" element={<AddExpertise />}></Route>
            <Route path="/dashboard/expertise/edit/:id" element={<EditExpertise />}></Route>

            <Route path="/dashboard/team" element={<Team />}></Route>
            <Route path="/dashboard/team/add" element={<AddTeam />}></Route>
            <Route path="/dashboard/team/edit/:id" element={<EditTeam />}></Route>

            <Route path="/dashboard/testimonial" element={<Testimonial />}></Route>
            <Route path="/dashboard/testimonial/add" element={<AddTestimonial />}></Route>
            <Route path="/dashboard/testimonial/edit/:id" element={<EditTestimonial />}></Route>

            <Route path="/dashboard/career" element={<Career />}></Route>
            <Route path="/dashboard/career/add" element={<AddCareer />}></Route>
            <Route path="/dashboard/career/edit/:id" element={<EditCareer />}></Route>

            <Route path="/dashboard/clientCategory" element={<ClientCategory />}></Route>
            <Route path="/dashboard/clientCategory/add" element={<AddClientCategory />}></Route>
            <Route path="/dashboard/clientCategory/edit/:id" element={<EditClientCategory />}></Route>

            <Route path="/dashboard/expertiseCategory" element={<ExpertiseCategory />}></Route>
            <Route path="/dashboard/expertiseCategory/add" element={<AddExpertiseCategory />}></Route>
            <Route path="/dashboard/expertiseCategory/edit/:Id" element={<EditExpertiseCategory />}></Route>

            <Route path="/dashboard/portofolio" element={<Portofolio />}></Route>
            <Route path="/dashboard/portofolio/add" element={<AddPortofolio />}></Route>
            <Route path="/dashboard/portofolio/edit/:portofolioId" element={<EditPortofolio />}></Route>
            {/* <Route path="/dashboard/portofolio/detail/:portofolioId" element={<EditPortofolio />}></Route> */}

            <Route path="/dashboard/client" element={<Client />}></Route>
            <Route path="/dashboard/client/add" element={<AddClient />}></Route>
            <Route path="/dashboard/client/edit/:id" element={<EditClient />}></Route>

            <Route path="/dashboard/user" element={<User />}></Route>
            <Route path="/dashboard/user/add" element={<AddUser />}></Route>
            <Route path="/dashboard/user/edit/:id" element={<EditUser />}></Route>

            <Route path="/dashboard/visitor" element={<Visitor />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
