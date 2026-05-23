// src/components/layout/AuthLayout.jsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      {/* لا Navbar ولا Footer هنا */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;