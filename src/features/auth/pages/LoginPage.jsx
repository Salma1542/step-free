// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { FaArrowRight } from 'react-icons/fa';
// import loginImage from "../../../Assets/Images/mobile.png";
// import styles from '../styles/Login.module.css';
// import SocialButtons from '../../../components/common/SocialButtons/SocialButtons';
// import PasswordInput from "../../../components/common/PasswordInput/PasswordInput";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (error) setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.email.trim() || !formData.password.trim()) {
//       setError('Email and password are required');
//       return;
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const response = await axios.post(
//         'http://localhost:3000/api/auth/login',
//         {
//           email: formData.email,
//           password: formData.password,
//         }
//       );

//       if (response.data.success) {
//         localStorage.setItem('token', response.data.token);
//         localStorage.setItem('user', JSON.stringify(response.data.user));
//         navigate('/');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container-fluid p-0 vh-100 overflow-hidden">
//       <div className="row g-0 h-100">

//         <div className={`col-md-6 col-lg-7 d-none d-md-block position-relative p-0 ${styles.leftSection}`}>
//           <img src={loginImage} alt="Step Free" className={`w-100 h-100 ${styles.loginImage}`} />
//           <div className={`${styles.imageOverlay} d-flex flex-column justify-content-end p-5`}>
//             <h1 className={`text-white fw-bold display-5 mb-3 ${styles.overlayTitle}`}>
//               Welcome Back. Let's get moving.
//             </h1>
//             <p className={`text-white fs-5 ${styles.overlayDescription}`}>
//               Step Free is here to ensure your journey is seamless, accessible, and filled with joy.
//             </p>
//           </div>
//         </div>

//         <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center bg-white">
//           <div className={`${styles.loginFormContainer} p-4`}>
//             <h2 className="fw-bold mb-1 text-dark">Login</h2>
//             <p className="text-muted mb-4">Access your saved routes and preferences.</p>

//             {error && (
//               <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px' }}>
//                 ✕ {error}
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label className="form-label fw-semibold" htmlFor="email">Email Address</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className={`form-control py-2 shadow-none ${styles.customInput}`}
//                   placeholder="name@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   disabled={loading}
//                   required
//                 />
//               </div>

//               <PasswordInput
//                 showPassword={showPassword}
//                 setShowPassword={setShowPassword}
//                 password={formData.password}
//                 onChange={handleChange}
//                 disabled={loading}
//               />

//               <button
//                 type="submit"
//                 className={`btn w-100 py-2 mb-4 d-flex align-items-center justify-content-center gap-2 ${styles.loginButton}`}
//                 disabled={loading}
//               >
//                 {loading ? 'Logging in...' : 'Login'} <FaArrowRight />
//               </button>

//               <div className="position-relative mb-4 text-center">
//                 <hr className="text-muted" />
//                 <span className={`${styles.dividerLabel} text-muted px-3 bg-white`}>
//                   Or continue with
//                 </span>
//               </div>

//               <SocialButtons disabled={loading} />
//             </form>

//             <p className="text-center mt-4 mb-0 text-muted">
//               Don't have an account?{' '}
//               <Link to='/roleselection' className={`fw-bold text-decoration-none ${styles.signupLink}`}>
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import loginImage from "../../../Assets/Images/mobile.png";
import styles from "../styles/Login.module.css";
import SocialButtons from "../../../components/common/SocialButtons/SocialButtons";
import PasswordInput from "../../../components/common/PasswordInput/PasswordInput";
import { useAuth } from  "../../../context/AuthContext"
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); // دالة login من السياق
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    setError("Email and password are required");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const response = await axios.post(
      "http://localhost:3000/api/auth/login",
      formData
    );

    if (response.data.success) {

      const user = response.data.data;

      // تحديث الـ Context + LocalStorage
      login(response.data.token, user);

      // Redirect حسب الرول
      if (user.role === "placeOwner") {

        navigate("/organization-profile");

      } else if (user.role === "driver") {

        navigate("/driver-form");

      } else if (user.role === "admin") {

        navigate("/admin");

      } else {

        navigate("/");

      }
    }

  } catch (err) {

    setError(
      err.response?.data?.message ||
      "Login failed"
    );

  } finally {

    setLoading(false);

  }
};
  return (
    <div className="container-fluid p-0 vh-100 overflow-hidden">
      <div className="row g-0 h-100">
        <div
          className={`col-md-6 col-lg-7 d-none d-md-block position-relative p-0 ${styles.leftSection}`}
        >
          <img
            src={loginImage}
            alt="Step Free"
            className={`w-100 h-100 ${styles.loginImage}`}
          />
          <div
            className={`${styles.imageOverlay} d-flex flex-column justify-content-end p-5`}
          >
            <h1
              className={`text-white fw-bold display-5 mb-3 ${styles.overlayTitle}`}
            >
              Welcome Back. Let's get moving.
            </h1>
            <p className={`text-white fs-5 ${styles.overlayDescription}`}>
              Step Free is here to ensure your journey is seamless, accessible,
              and filled with joy.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-5 d-flex align-items-center justify-content-center bg-white">
          <div className={`${styles.loginFormContainer} p-4`}>
            <h2 className="fw-bold mb-1 text-dark">Login</h2>
            <p className="text-muted mb-4">
              Access your saved routes and preferences.
            </p>

            {error && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#991b1b",
                  padding: "12px 16px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              >
                ✕ {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-control py-2 shadow-none ${styles.customInput}`}
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>

              <PasswordInput
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                password={formData.password}
                onChange={handleChange}
                disabled={loading}
              />

              <button
                type="submit"
                className={`btn w-100 py-2 mb-4 d-flex align-items-center justify-content-center gap-2 ${styles.loginButton}`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"} <FaArrowRight />
              </button>

              <div className="position-relative mb-4 text-center">
                <hr className="text-muted" />
                <span
                  className={`${styles.dividerLabel} text-muted px-3 bg-white`}
                >
                  Or continue with
                </span>
              </div>

              <SocialButtons disabled={loading} />
            </form>

            <p className="text-center mt-4 mb-0 text-muted">
              Don't have an account?{" "}
              <Link
                to="/roleselection"
                className={`fw-bold text-decoration-none ${styles.signupLink}`}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}