import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/images/logo.png";

export default function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="navbar navbar-expand-lg sf-nav sticky-top">
      <div className="container-fluid sf-container">
        {/* Logo - مظبوط دلوقتي */}
        <NavLink className="navbar-brand sf-brand" to="/">
          <img src={logo} alt="Step Free Logo" className="sf-logo" />
          <span>Step Free</span>
        </NavLink>

        {/* Toggler */}
        <button
          className="navbar-toggler sf-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sfNav"
          aria-controls="sfNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapse */}
        <div className="collapse navbar-collapse" id="sfNav">
          {/* Nav Links - وسطينهم دلوقتي */}
          <ul className="navbar-nav sf-links">
            {links.map((link) => (
              <li className="nav-item" key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `nav-link sf-link ${isActive ? "sf-active" : ""}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Buttons - يمين */}
          <div className="sf-right">
            <NavLink to="/login" className="sf-btn-login">
              Log in
            </NavLink>
            <NavLink to="/register" className="sf-btn-signup">
              Sign up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}