
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
        <div className="sf-footer-accent" />
 
        <div className="sf-footer-main">
          <div className="container">
            <div className="row g-4 g-lg-5">
 
              <div className="col-12 col-sm-6 col-lg-4">
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
 
               
             
              </div>
 
              <div className="col-6 col-sm-3 col-lg-2">
                <div className="sf-footer-col-title">Platform</div>
                <ul className="sf-footer-links">
                  <li><Link to="/explore">Explore Places</Link></li>
                  <li><Link to="/explore">Accessible Map</Link></li>
                  <li><Link to="/">Driver Network</Link></li>
                  <li><Link to="/blogs">Organization</Link></li>
                </ul>
              </div>
 
              <div className="col-6 col-sm-3 col-lg-2">
                <div className="sf-footer-col-title">Company</div>
                <ul className="sf-footer-links">
                  <li><a href="/about#about">About Us</a></li>
                  <li><a href="/about#mission">Our Mission</a></li>
                  <li><a href="/about#volunteer">Volunteer</a></li>
                  <li><a href="/about#contact">Contact</a></li>
                </ul>
              </div>
 
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
 
        <hr className="sf-footer-divider" />
 
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
 

