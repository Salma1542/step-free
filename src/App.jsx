

import UsersPage from './pages/Admin/UsersPage'
import AdminplacesPage from './pages/Admin/AdminPlacesPage'
import ReviewsPage from './pages/Admin/ReviewsPage'


import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogsPage from "./pages/BlogsPage/BlogsPage";

import PlacesPage from "./pages/PlacesPage/PlacesPage";
import LoginPage from './features/auth/pages/LoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import RoleSelectionPage from './features/auth/pages/RoleSelection';
// import { ForgotPassword, OTPVerification, ResetPassword } from './features/auth';
import { DriverRegisterAuth } from './features/auth';
import { DriverForm } from './features/driver';
import "./App.css";
import RegisterPlace from "./pages/RegisterPlacePage";

import {
  ForgotPassword,
  OTPVerification,
  ResetPassword,
  RoleSelection,
} from "./features/auth";


import ExplorePage from "./pages/ExplorePage/ExplorePage";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

export default function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <Routes>
      {/* صفحات مع Navbar و Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="places" element={<PlacesPage />} />   {/* ملاحظة: كان موجوداً في Route السابق */}
       <Route path="explore" element={<ExplorePage />} />

      </Route>

      {/* صفحات بدون Navbar و Footer (صفحات Auth) */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="user" element={<UserRegisterPage />} />
        <Route path="roleselection" element={<RoleSelectionPage />} />
        <Route path="forgetPassword" element={<ForgotPassword />} />
        <Route path="otp" element={<OTPVerification />} />
        <Route path="reset-password" element={<ResetPassword />} />
         <Route path="register-place" element={<RegisterPlace />} />
        <Route path="driver" element={<DriverRegisterAuth />} />
        <Route path="register-place" element={<RegisterPlace />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
       
        <Route path="role" element={<RoleSelection />} />


<Route path="/users" element={<UsersPage />} />
<Route path="/Adminplaces" element={<AdminplacesPage/>} />
<Route path="/reviews" element={<ReviewsPage />} />
        
                <Route path="driver-form" element={<DriverForm />} />

      </Route>
    </Routes>
  );
}