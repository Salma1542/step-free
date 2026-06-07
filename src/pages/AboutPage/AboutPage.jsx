import { useEffect, useRef, useState } from "react";

import "./AboutPage.css";

/* ─── Animated counter hook ─── */
function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Intersection observer hook ─── */
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Stat card with animated counter ─── */
function StatCard({ value, suffix = "", label, icon, featured, delay = 0 }) {
  const [ref, inView] = useInView(0.3);
  const count = useCounter(value, 1800, inView);
  return (
    <div ref={ref} className={`sf-stat-card ${featured ? "sf-stat-featured" : ""}`}
      style={{ animationDelay: `${delay}ms` }}>
      <div className="sf-stat-icon">{icon}</div>
      <div className="sf-stat-number">{count.toLocaleString()}{suffix}</div>
      <div className="sf-stat-label">{label}</div>
    </div>
  );
}



/* ── Data ── */
const teamMembers = [
  { initials: "SN", name: "Sara Nour", role: "CEO & Co-Founder", bio: "Accessibility advocate with 10+ years in inclusive urban mobility design." },
  { initials: "AM", name: "Ahmed Malik", role: "CTO & Co-Founder", bio: "Software engineer passionate about building tech that genuinely includes everyone." },
  { initials: "LO", name: "Lena Omar", role: "Head of Community", bio: "Connects drivers, users, and partners to build a stronger accessible network." },
  { initials: "KT", name: "Karim Taha", role: "Lead Designer", bio: "Crafts intuitive, barrier-free interfaces that put the user first, always." },
];

const values = [
  { icon: "♿", color: "var(--primary-soft)", border: "var(--primary-border)", title: "Accessibility First", desc: "Every decision starts with 'how does this serve people with disabilities?' — not as an afterthought, but as our core." },
  { icon: "🤝", color: "#fef3c7", border: "#fde68a", title: "Community Driven", desc: "Real users shape our platform. Reviews, ratings, and feedback from the community drive every improvement." },
  { icon: "🗺️", color: "#eff6ff", border: "#bfdbfe", title: "Radical Transparency", desc: "We publish accurate, detailed accessibility info — even when it's imperfect — because honesty builds trust." },
  { icon: "🚀", color: "#fdf4ff", border: "#e9d5ff", title: "Continuous Impact", desc: "We measure success in lives made easier — trips completed, barriers removed, confidence restored." },
  { icon: "🛡️", color: "#fff1f2", border: "#fecdd3", title: "Safety & Dignity", desc: "Every person deserves to travel safely and with full dignity. We hold our driver network to that standard." },
  { icon: "🌍", color: "#f0fdf4", border: "#bbf7d0", title: "Inclusive by Design", desc: "From our codebase to our content, we build for every disability type — visual, mobility, cognitive, and more." },
];

const partners = [
  "AccessAbility Egypt", "Cairo Metro Authority", "WHO Disability Unit",
  "UNDP Egypt", "Wheels of Hope NGO", "CAPMAS",
];

const timeline = [
  { year: "2021", title: "The idea begins", desc: "Two friends, one with a mobility disability, couldn't find reliable accessible transport in Cairo. Step Free was born from that frustration." },
  { year: "2022", title: "First 100 places listed", desc: "We manually surveyed and listed 100 accessible locations across Cairo, Alexandria, and Giza." },
  { year: "2023", title: "Driver network launched", desc: "30 trained accessible transport drivers joined our network in the first month. Users rated their first trips." },
  { year: "2024", title: "10,000 users milestone", desc: "The platform crossed 10,000 active users and partnered with 3 national disability organizations." },
  { year: "2025", title: "Pan-Africa expansion", desc: "Step Free expands to 5 more African cities, carrying our mission across borders." },
];

const a11yCommitments = [
  { icon: "✓", title: "WCAG 2.1 AA Compliant", desc: "Our platform meets international web accessibility standards across all pages and features." },
  { icon: "⌨", title: "Full Keyboard Navigation", desc: "Every feature is fully accessible without a mouse or touch screen." },
  { icon: "👁", title: "Screen Reader Optimized", desc: "ARIA labels, semantic HTML, and live regions ensure compatibility with screen readers." },
  { icon: "🎨", title: "High Contrast Mode", desc: "A dedicated high-contrast theme is available for users with low vision." },
];

export default function AboutPage() {
  return (
    <>
 
      <div className="sf-about">

        {/* ══ HERO ══ */}
        <section className="sf-hero">
          <div className="sf-hero-deco sf-hero-deco-1" />
          <div className="sf-hero-deco sf-hero-deco-2" />
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="sf-hero-eyebrow">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  About Step Free
                </div>

                <h1 className="sf-hero-title">
                  Every place should be<br />
                  <span>accessible</span> to everyone
                </h1>

                <p className="sf-hero-desc">
                  Step Free is a platform built to remove barriers — physical, informational, and social — for people with disabilities. We map accessible places, connect passengers with trained drivers, and empower communities to travel freely.
                </p>

                <div className="d-flex gap-3 flex-wrap">
                  <a href="#mission" className="sf-hero-cta-primary">Our Mission</a>
                  <a href="#team" className="sf-hero-cta-secondary">Meet the Team</a>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="sf-hero-card">
                  <div className="sf-hero-card-title">What we believe in</div>
                  {[
                    { icon: "♿", text: "Mobility is a human right" },
                    { icon: "🗺️", text: "Accurate accessibility info saves lives" },
                    { icon: "🤝", text: "Community-verified reviews you can trust" },
                    { icon: "🚘", text: "Trained drivers who understand your needs" },
                    { icon: "🌍", text: "Inclusion is everyone's responsibility" },
                  ].map((p, i) => (
                    <span className="sf-hero-pill" key={i}>
                      <span>{p.icon}</span> {p.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="sf-section" id="impact">
          <div className="container">
            <div className="text-center mb-5">
              <div className="sf-eyebrow">Our Impact</div>
              <h2 className="sf-section-title mx-auto" style={{ maxWidth: 500 }}>Numbers that reflect real lives changed</h2>
            </div>
            <div className="row g-3">
              {[
                { value: 12400, suffix: "+", label: "Active Users", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, featured: false, delay: 0 },
                { value: 3800, suffix: "+", label: "Accessible Places Listed", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, featured: true, delay: 100 },
                { value: 420, suffix: "+", label: "Trained Drivers", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, featured: false, delay: 200 },
                { value: 18, suffix: "", label: "Cities Covered", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, featured: false, delay: 300 },
              ].map((s, i) => (
                <div className="col-6 col-md-3" key={i}>
                  <StatCard {...s} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MISSION ══ */}
        <section className="sf-section-teal" id="mission">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5">
                <div className="sf-eyebrow">Our Mission</div>
                <h2 className="sf-section-title">Breaking barriers, one place at a time</h2>
                <p className="sf-section-desc">
                  We believe that accessibility information should be free, accurate, and community-powered. Our mission is to build the most comprehensive, reliable, and inclusive accessibility platform in the region.
                </p>
              </div>
              <div className="col-lg-7">
                {[
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>, title: "Map every accessible place", desc: "Building a real-time, community-verified map of accessible restaurants, hospitals, parks, transit stations, and more across Africa." },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>, title: "Connect with trained drivers", desc: "Our vetted driver network specializes in accessible transport — equipped vehicles, trained in disability awareness, rated by users." },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title: "Empower the community", desc: "Users contribute reviews, report inaccurate info, and help improve data for everyone — making every contribution count." },
                  { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>, title: "Drive systemic change", desc: "Our data helps policymakers, city planners, and businesses understand and improve accessibility in the real world." },
                ].map((item, i) => (
                  <div className="sf-mission-item" key={i}>
                    <div className="sf-mission-icon">{item.icon}</div>
                    <div>
                      <div className="sf-mission-text-title">{item.title}</div>
                      <div className="sf-mission-text-desc">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ VALUES ══ */}
        <section className="sf-section" id="values">
          <div className="container">
            <div className="text-center mb-5">
              <div className="sf-eyebrow">Our Values</div>
              <h2 className="sf-section-title">What drives everything we build</h2>
            </div>
            <div className="row g-3">
              {values.map((v, i) => (
                <div className="col-12 col-sm-6 col-lg-4" key={i}>
                  <div className="sf-value-card">
                    <div className="sf-value-icon" style={{ background: v.color, border: `1px solid ${v.border}` }}>
                      {v.icon}
                    </div>
                    <div className="sf-value-title">{v.title}</div>
                    <div className="sf-value-desc">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ STORY / TIMELINE ══ */}
        <section className="sf-section-alt">
          <div className="container">
            <div className="row g-5 align-items-start">
              <div className="col-lg-5">
                <div className="sf-eyebrow">Our Story</div>
                <h2 className="sf-section-title">From a personal struggle to a regional platform</h2>
                <p className="sf-section-desc" style={{ marginBottom: 0 }}>
                  Step Free started when two friends realized that for one of them, navigating Cairo was a daily battle. No reliable info on ramps, no accessible transport, no community to turn to. That moment became a mission.
                </p>
              </div>
              <div className="col-lg-7">
                <div className="sf-timeline">
                  {timeline.map((t, i) => (
                    <div className="sf-timeline-item" key={i}>
                      <div className="sf-timeline-dot" />
                      <div className="sf-timeline-year">{t.year}</div>
                      <div className="sf-timeline-title">{t.title}</div>
                      <div className="sf-timeline-desc">{t.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ TEAM ══ */}
        <section className="sf-section" id="team">
          <div className="container">
            <div className="text-center mb-5">
              <div className="sf-eyebrow">The Team</div>
              <h2 className="sf-section-title">People behind the platform</h2>
              <p className="sf-section-desc mx-auto" style={{ maxWidth: 500 }}>
                A small, passionate team united by one belief — that access to the world should never depend on your disability.
              </p>
            </div>
            <div className="row g-3 justify-content-center">
              {teamMembers.map((m, i) => (
                <div className="col-12 col-sm-6 col-lg-3" key={i}>
                  <div className="sf-team-card">
                    <div className="sf-team-avatar-placeholder">{m.initials}</div>
                    <div className="sf-team-info">
                      <div className="sf-team-name">{m.name}</div>
                      <div className="sf-team-role">{m.role}</div>
                      <div className="sf-team-bio">{m.bio}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ ACCESSIBILITY COMMITMENT ══ */}
        <section className="sf-section-teal">
          <div className="container">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5">
                <div className="sf-eyebrow">Accessibility Commitment</div>
                <h2 className="sf-section-title">We practice what we preach</h2>
                <p className="sf-section-desc" style={{ marginBottom: 0 }}>
                  Building a platform for accessibility means our platform itself must be fully accessible. Here's our promise to every user.
                </p>
              </div>
              <div className="col-lg-7">
                <div className="row g-3">
                  {a11yCommitments.map((c, i) => (
                    <div className="col-12 col-sm-6" key={i}>
                      <div className="sf-a11y-card">
                        <div className="sf-a11y-card-icon">
                          <span style={{ fontSize: 18 }}>{c.icon}</span>
                        </div>
                        <div>
                          <div className="sf-a11y-card-title">{c.title}</div>
                          <div className="sf-a11y-card-desc">{c.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PARTNERS ══ */}
        <section className="sf-section">
          <div className="container">
            <div className="text-center mb-5">
              <div className="sf-eyebrow">Our Partners</div>
              <h2 className="sf-section-title">Together for a more inclusive world</h2>
            </div>
            <div className="row g-3 justify-content-center">
              {partners.map((p, i) => (
                <div className="col-6 col-md-4 col-lg-2" key={i}>
                  <div className="sf-partner-logo">
                    <span className="sf-partner-name">{p}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA BANNER ══ */}
        <section className="sf-section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="sf-cta-banner">
              <h2 className="sf-cta-title">Ready to explore a more accessible world?</h2>
              <p className="sf-cta-sub">Join thousands of users discovering barrier-free places every day.</p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <a href="/explore" className="sf-cta-btn-white">Explore Places</a>
                <a href="/register" className="sf-cta-btn-outline">Create Free Account</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}