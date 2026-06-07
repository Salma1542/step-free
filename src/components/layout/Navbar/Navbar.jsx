import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../Assets/Images/logo.png";

export default function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const links = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="sf-nav">
      <div className="sf-container">
        {/* 1. اللوجو (يسار) */}
        <div className="sf-logo-area">
          <NavLink to="/" className="sf-brand">
            <img src={logo} alt="Step Free" className="sf-logo-img" />
            <span>Step Free</span>
          </NavLink>
        </div>

        {/* 2. روابط المنتصف (تظهر على سطح المكتب فقط، وعلى الموبايل داخل القائمة) */}
        <div className={`sf-links-area ${isNavCollapsed ? "collapsed" : ""}`}>
          <ul className="sf-nav-links">
            {links.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  onClick={() => setIsNavCollapsed(true)}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* أزرار الموبايل (تظهر داخل القائمة فقط) */}
          <div className="sf-mobile-buttons">
            <NavLink to="/login" className="btn-login" onClick={() => setIsNavCollapsed(true)}>Log in</NavLink>
            <NavLink to="/roleselection" className="btn-signup" onClick={() => setIsNavCollapsed(true)}>Sign up</NavLink>
          </div>
        </div>

        {/* 3. أزرار سطح المكتب (يمين) */}
        <div className="sf-buttons-area">
          <NavLink to="/login" className="btn-login">Log in</NavLink>
          <NavLink to="/roleselection" className="btn-signup">Sign up</NavLink>
        </div>

        {/* زر التوجل للموبايل */}
        <button className="sf-toggler" onClick={() => setIsNavCollapsed(!isNavCollapsed)}>
          ☰
        </button>
      </div>
    </nav>
  );
}