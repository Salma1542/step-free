

import UsersPage from './pages/Admin/UsersPage'
import PlacesPage from './pages/Admin/PlacesPage'
import ReviewsPage from './pages/Admin/ReviewsPage'


import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlogsPage from "./pages/BlogsPage/BlogsPage";


import LoginPage from './features/auth/pages/LoginPage';
import UserRegisterPage from './pages/UserRegisterPage';
import RoleSelectionPage from './features/auth/pages/RoleSelection';
import { ForgotPassword, OTPVerification, ResetPassword ,RoleSelection} from './features/auth';
import { DriverRegisterAuth } from './features/auth';
import { DriverForm }      from './features/driver';
import "./App.css";
import RegisterPlace from "./pages/RegisterPlacePage";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="roleselection" element={<RoleSelectionPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="blogs" element={<BlogsPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="user" element={<UserRegisterPage />} />
        <Route path="forgetPassword" element={<ForgotPassword />} />
        <Route path="otp" element={<OTPVerification />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="driver-form" element={<DriverForm />} />
        <Route path="driver" element={<DriverRegisterAuth />} />
        <Route path="register-place" element={<RegisterPlace />} />
      <Route path="/admin" element={<AdminDashboardPage />} />
       
        <Route path="role" element={<RoleSelection />} />


<Route path="/users" element={<UsersPage />} />
<Route path="/places" element={<PlacesPage />} />
<Route path="/reviews" element={<ReviewsPage />} />
        

      </Route>
    </Routes>
  );
}