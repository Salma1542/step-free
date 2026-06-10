

import AdminAnalyticsPage from './pages/Admin/AdminAnalyticsPage'
import AdminSettingsPage from './pages/Admin/AdminSettingsPage'

import "bootstrap-icons/font/bootstrap-icons.css";
import AdminLayout from "./components/layout/AdminLayout";
import UsersPage from "./pages/Admin/UsersPage";
import AdminPlacesPage from "./pages/Admin/AdminPlacesPage";
import ReviewsPage from "./pages/Admin/ReviewsPage";

import ScrollToTop from "./components/ScrollToTop";
import AdminDashboardPage from "./pages/Admin/AdminDashboardPage";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogsPage from "./pages/BlogsPage/BlogsPage";

import PlacesPage from "./pages/PlacesPage/PlacesPage";
import LoginPage from "./features/auth/pages/LoginPage";
import UserRegisterPage from "./pages/UserRegisterPage";
import RoleSelectionPage from "./features/auth/pages/RoleSelection";
import { DriverRegisterAuth } from "./features/auth";
import { DriverForm } from "./features/driver";
import "./App.css";
import RegisterPlace from "./pages/RegisterPlacePage";
import PlaceForm from './features/placeForm/placeForm';
import OrganizationProfile from './pages/organization/OrganizationProfile';
import {
  ForgotPassword,
  OTPVerification,
  ResetPassword,
  RoleSelection,
} from "./features/auth";

import AdminRoute from "./routes/AdminRoute";

import ExplorePage from "./pages/ExplorePage/ExplorePage";

import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

export default function App() {
  // useEffect(() => {
  //   AOS.init({
  //     duration: 1000,
  //     once: true,
  //     easing: "ease-in-out",
  //   });
  // }, []);

  return(
    <>
      <ScrollToTop />

      <Routes>

        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="places/:id" element={<PlacesPage />} />
          <Route path="explore" element={<ExplorePage />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="user" element={<UserRegisterPage />} />
          <Route path="roleselection" element={<RoleSelectionPage />} />
          <Route path="forgetPassword" element={<ForgotPassword />} />
          <Route path="otp" element={<OTPVerification />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="register-place" element={<RegisterPlace />} />
          <Route path="placeForm" element={<PlaceForm />} />
          <Route path="driver" element={<DriverRegisterAuth />} />
          <Route path="organization-profile" element={<OrganizationProfile />} />
          <Route path="driver-form" element={<DriverForm />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="Adminplaces" element={<AdminPlacesPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>

      </Routes>
    </>
  );
}