




import { useState } from "react";
import { Link } from "react-router-dom";
 
import "./Footer.css";
 
export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
 
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };
 
  return (
    <>
      
 
      <footer className="sf-footer">
        {/* Top teal gradient bar */}
        <div className="sf-footer-accent" />
 
        {/* Main content */}
        <div className="sf-footer-main">
          <div className="container">
            <div className="row g-4 g-lg-5">
 
              {/* ── Brand Column ── */}
              <div className="col-12 col-sm-6 col-lg-4">
                {/* Logo */}
                <div className="d-flex align-items-center gap-2 mb-1">
                  <div className="sf-footer-brand-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                      <circle cx="12" cy="9" r="2.5"/>
                    </svg>
                  </div>
                  <span className="sf-footer-logo-text">Step Free</span>
                </div>
 
                <p className="sf-footer-tagline">
                  Making every place accessible to everyone. Discover, review, and navigate barrier-free locations near you.
                </p>
 
                {/* Accessibility badge
                <a href="#" className="sf-a11y-badge">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="4.5" r="1.5"/>
                    <path d="M7 9h10M12 9v5l-2.5 4.5M12 14l2.5 4.5"/>
                  </svg>
                  WCAG 2.1 AA Compliant
                </a>
  */}
                {/* Socials */}
                <div className="sf-socials">
                  {/* Twitter/X */}
                  <a href="#" className="sf-social-btn" aria-label="Twitter">
                    <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* Facebook */}
                  <a href="#" className="sf-social-btn" aria-label="Facebook">
                    <svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="#" className="sf-social-btn" aria-label="Instagram">
                    <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="#" className="sf-social-btn" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                </div>
              </div>
 
              {/* ── Platform Links ── */}
              <div className="col-6 col-sm-3 col-lg-2">
                <div className="sf-footer-col-title">Platform</div>
                <ul className="sf-footer-links">
                  <li><Link to="/explore">Explore Places</Link></li>
                  <li><Link to="/explore">Accessible Map</Link></li>
                  <li><Link to="/">Driver Network</Link></li>
                  <li><Link to="/">Empowerment Hub</Link></li>
                  <li><Link to="/blogs">Blog</Link></li>
                </ul>
              </div>
 
              {/* ── Company Links ── */}
              <div className="col-6 col-sm-3 col-lg-2">
                <div className="sf-footer-col-title">Company</div>
                <ul className="sf-footer-links">
                  <li><a href="/about#about">About Us</a></li>
                  <li><a href="/about#mission">Our Mission</a></li>
                  {/* <li><a href="/about#partners">Partners</a></li> */}
                  <li><a href="/about#volunteer">Volunteer</a></li>
                  <li><a href="/about#contact">Contact</a></li>
                </ul>
              </div>
 
              {/* ── Newsletter ── */}
              <div className="col-12 col-lg-4">
                <div className="sf-newsletter-box">
                  <div className="sf-newsletter-title">Stay in the loop</div>
                  <div className="sf-newsletter-sub">
                    Get accessibility updates, new places, and community news.
                  </div>
 
                  {subscribed ? (
                    <div style={{ fontSize: "13.5px", color: "var(--teal-dark)", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      You're subscribed — thanks!
                    </div>
                  ) : (
                    <form className="sf-newsletter-form" onSubmit={handleSubscribe}>
                      <input
                        className="sf-newsletter-input"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                      />
                      <button type="submit" className="sf-newsletter-btn">
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </div>
 
            </div>
          </div>
        </div>
 
        {/* Divider */}
        <hr className="sf-footer-divider" />
 
        {/* Bottom bar */}
        <div className="container">
          <div className="sf-footer-bottom">
            <span className="sf-footer-copy">
              © {new Date().getFullYear()} Step Free. All rights reserved.
            </span>
 
            <div className="sf-footer-legal">
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Service</Link>
              <Link to="/">Accessibility Statement</Link>
              <Link to="/">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
 

