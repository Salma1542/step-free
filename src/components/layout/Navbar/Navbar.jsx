import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

import "./Navbar.css";
import logo from "../../../Assets/Images/logo.png";

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const links = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sf-nav">
      <div className="sf-container">

        <div className="sf-logo-area">
          <NavLink to="/" className="sf-brand">
            <img src={logo} alt="Step Free" className="sf-logo-img" />
            <span>Step Free</span>
          </NavLink>
        </div>

        <div className={`sf-links-area ${isNavCollapsed ? "collapsed" : ""}`}>
          <ul className="sf-nav-links">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsNavCollapsed(true)}
                  className={({ isActive }) =>
                    isActive ? "active" : ""
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="sf-mobile-buttons">
            {user ? (
              <button
                className="btn-signup"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn-login"
                >
                  Log in
                </NavLink>

                <NavLink
                  to="/roleselection"
                  className="btn-signup"
                >
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>

        <div className="sf-buttons-area">
          {user ? (
   <div className="profile-box">

  <div className="profile-avatar">
    {(user?.firstName || user?.name)?.charAt(0)}
  </div>

  <span className="profile-name">
    {user?.firstName || user?.name}
  </span>

  <button
    className="logout-icon"
    onClick={handleLogout}
  >
    Logout
  </button>

</div>
          ) : (
            <>
              <NavLink
                to="/login"
                className="btn-login"
              >
                Log in
              </NavLink>

              <NavLink
                to="/roleselection"
                className="btn-signup"
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>

        <button
          className="sf-toggler"
          onClick={() =>
            setIsNavCollapsed(!isNavCollapsed)
          }
        >
          ☰
        </button>

      </div>
    </nav>
  );
}