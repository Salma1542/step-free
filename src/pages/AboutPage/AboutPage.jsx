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

/* ─── Stat card ─── */
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

/* ─── Contact Form ─── */
function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };
  if (sent) {
    return (
      <div className="sf-contact-success">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <div className="sf-contact-success-title">Message Sent!</div>
        <p>Thanks for reaching out. We'll get back to you within 2 business days.</p>
        <button className="sf-hero-cta-primary" style={{ border: "none", cursor: "pointer" }} onClick={() => setSent(false)}>
          Send Another
        </button>
      </div>
    );
  }
  return (
    <form className="sf-contact-form" onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <label className="sf-contact-label">Full Name *</label>
          <input className="sf-contact-input" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="col-12 col-sm-6">
          <label className="sf-contact-label">Email Address *</label>
          <input className="sf-contact-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="sf-contact-label">Subject</label>
          <input className="sf-contact-input" type="text" name="subject" placeholder="What's this about?" value={form.subject} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="sf-contact-label">Message *</label>
          <textarea className="sf-contact-input sf-contact-textarea" name="message" placeholder="Tell us how we can help..." value={form.message} onChange={handleChange} rows={5} required />
        </div>
        <div className="col-12">
          <button type="submit" className="sf-hero-cta-primary" style={{ border: "none", cursor: "pointer", width: "100%" }}>
            Send Message
          </button>
        </div>
      </div>
    </form>
  );
}

/* ══ SVG ICON COMPONENTS ══ */

const IconWheelchair = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="4" r="1.5"/>
    <path d="M9 9h4l1 5h3"/>
    <path d="M10 9l-1 4h5"/>
    <circle cx="10" cy="19" r="2.5"/>
    <circle cx="17" cy="19" r="2.5"/>
    <path d="M7.5 19H6a1 1 0 0 1-1-1v-5"/>
  </svg>
);

const IconCommunity = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconMap = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

const IconShield = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const IconGlobe = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const IconTrend = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const IconCar = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2"/>
    <circle cx="9" cy="17" r="2"/>
    <circle cx="17" cy="17" r="2"/>
  </svg>
);

const IconPin = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconUsers = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const IconCheck = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconKeyboard = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10"/>
  </svg>
);

const IconEye = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const IconContrast = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 2v20M2 12h20" opacity="0.3"/>
    <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" stroke="none"/>
  </svg>
);

const IconMegaphone = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
  </svg>
);

const IconCode = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/>
    <polyline points="8 6 2 12 8 18"/>
  </svg>
);

const IconClock = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconMail = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconPhone = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.54 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

/* ══ DATA ══ */
const values = [

  { icon: "♿", color: "#f0fdfa", border: "#ccfbf1", title: "Accessibility First", desc: "Every decision starts with 'how does this serve people with disabilities?' — not as an afterthought, but as our core." },
  { icon: "🤝", color: "#fef3c7", border: "#fde68a", title: "Community Driven", desc: "Real users shape our platform. Reviews, ratings, and feedback from the community drive every improvement." },
  { icon: "🗺️", color: "#eff6ff", border: "#bfdbfe", title: "Radical Transparency", desc: "We publish accurate, detailed accessibility info — even when it's imperfect — because honesty builds trust." },
  { icon: "🚀", color: "#fdf4ff", border: "#e9d5ff", title: "Continuous Impact", desc: "We measure success in lives made easier — trips completed, barriers removed, confidence restored." },
  { icon: "🛡️", color: "#fff1f2", border: "#fecdd3", title: "Safety & Dignity", desc: "Every person deserves to travel safely and with full dignity. We hold our driver network to that standard." },
  { icon: "🌍", color: "#f0fdf4", border: "#bbf7d0", title: "Inclusive by Design", desc: "From our codebase to our content, we build for every disability type — visual, mobility, cognitive, and more." },
];

const partners = [
  "AccessAbility Egypt", "Cairo Metro Authority", "WHO Disability Unit",
  "UNDP Egypt", "Wheels of Hope NGO", "CAPMAS",

  {
    icon: <IconWheelchair size={20} />,
    color: "var(--primary-soft)", border: "var(--primary-border)",
    title: "Accessibility First",
    desc: "Every decision starts with 'how does this serve people with disabilities?' — not as an afterthought, but as our core.",
  },
  {
    icon: <IconCommunity size={20} />,
    color: "#fef3c7", border: "#fde68a",
    title: "Community Driven",
    desc: "Real users shape our platform. Reviews, ratings, and feedback from the community drive every improvement.",
  },
  {
    icon: <IconMap size={20} />,
    color: "#eff6ff", border: "#bfdbfe",
    title: "Radical Transparency",
    desc: "We publish accurate, detailed accessibility info — even when it's imperfect — because honesty builds trust.",
  },
  {
    icon: <IconTrend size={20} />,
    color: "#fdf4ff", border: "#e9d5ff",
    title: "Continuous Impact",
    desc: "We measure success in lives made easier — trips completed, barriers removed, confidence restored.",
  },
  {
    icon: <IconShield size={20} />,
    color: "#fff1f2", border: "#fecdd3",
    title: "Safety & Dignity",
    desc: "Every person deserves to travel safely and with full dignity. We hold our driver network to that standard.",
  },
  {
    icon: <IconGlobe size={20} />,
    color: "#f0fdf4", border: "#bbf7d0",
    title: "Inclusive by Design",
    desc: "From our codebase to our content, we build for every disability type — visual, mobility, cognitive, and more.",
  },

];

const timeline = [
  {
    year: "Research",
    title: "Understanding User Needs",
    desc: "We explored the daily challenges faced by people with disabilities and identified the need for reliable accessibility information."
  },
  {
    year: "Planning",
    title: "Designing the Platform",
    desc: "Our team planned a solution that connects users with accessible places, transportation services, and useful community resources."
  },
  {
    year: "Development",
    title: "Building Step Free",
    desc: "Using modern web technologies, we developed a user-friendly and responsive platform focused on accessibility and ease of use."
  },
  {
    year: "Features",
    title: "Creating Meaningful Solutions",
    desc: "We introduced features that help users discover accessible locations, find suitable transportation options, and access essential information."
  },
  {
    year: "Vision",
    title: "A More Inclusive Future",
    desc: "Our goal is to continue improving Step Free and contribute to a world where accessibility information is available to everyone."
  },
];

const a11yCommitments = [
  { icon: <IconCheck size={18} />,    title: "WCAG 2.1 AA Compliant",      desc: "Our platform meets international web accessibility standards across all pages and features." },
  { icon: <IconKeyboard size={18} />, title: "Full Keyboard Navigation",    desc: "Every feature is fully accessible without a mouse or touch screen." },
  { icon: <IconEye size={18} />,      title: "Screen Reader Optimized",     desc: "ARIA labels, semantic HTML, and live regions ensure compatibility with screen readers." },
  { icon: <IconContrast size={18} />, title: "High Contrast Mode",          desc: "A dedicated high-contrast theme is available for users with low vision." },
];

const volunteerRoles = [
  {
    icon: <IconPin size={22} />,
    title: "Accessibility Mapper",
    desc: "Visit locations in your city and submit detailed accessibility reports — ramps, elevators, parking, restrooms, and more.",
    commitment: "2–4 hrs/week",
  },
  {
    icon: <IconCar size={22} />,
    title: "Driver Ambassador",
    desc: "Own an accessible vehicle? Join our driver network and help people with disabilities reach their destinations safely.",
    commitment: "Flexible hours",
  },
  {
    icon: <IconCode size={22} />,
    title: "Tech Contributor",
    desc: "Developer or designer? Help us build, test, and improve the platform. Open source contributions are always welcome.",
    commitment: "Project-based",
  },
  {
    icon: <IconMegaphone size={22} />,
    title: "Community Advocate",
    desc: "Spread the word, organize local events, and help grow the Step Free community in your city.",
    commitment: "3–5 hrs/week",
  },
];

const contactChannels = [
  { icon: <IconMail size={20} />, label: "Email Us",  value: "hello@stepfree.app",  href: "mailto:hello@stepfree.app" },
  { icon: <IconPhone size={20} />, label: "Call Us",  value: "+20 100 000 0000",     href: "tel:+201000000000" },
  { icon: <IconPin size={20} />,   label: "Visit Us", value: "Cairo, Egypt",         href: "#" },
];

/* ══ MAIN COMPONENT ══ */
export default function AboutPage() {
  return (
    <>
      <div className="sf-about">

        {/* ══ HERO ══ */}
        <section className="sf-hero" id="about">
          <div className="sf-hero-deco sf-hero-deco-1" />
          <div className="sf-hero-deco sf-hero-deco-2" />
          <div className="container">
            <div className="row align-items-center g-5">
              <div className="col-lg-6">
                <div className="sf-hero-eyebrow">
                  <IconPin size={12} />
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
                  <a href="#values" className="sf-hero-cta-secondary">Our Values</a>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="sf-hero-card">
                  <div className="sf-hero-card-title">What we believe in</div>
                  {[
                    { icon: <IconWheelchair size={14} />, text: "Mobility is a human right" },
                    { icon: <IconMap size={14} />,        text: "Accurate accessibility info saves lives" },
                    { icon: <IconCommunity size={14} />,  text: "Community-verified reviews you can trust" },
                    { icon: <IconCar size={14} />,        text: "Trained drivers who understand your needs" },
                    { icon: <IconGlobe size={14} />,      text: "Inclusion is everyone's responsibility" },
                  ].map((p, i) => (
                    <span className="sf-hero-pill" key={i}>
                      {p.icon} {p.text}
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
                { value: 12400, suffix: "+", label: "Active Users",             icon: <IconUsers size={20} />,  featured: false, delay: 0 },
                { value: 3800,  suffix: "+", label: "Accessible Places Listed", icon: <IconPin size={20} />,    featured: true,  delay: 100 },
                { value: 420,   suffix: "+", label: "Trained Drivers",          icon: <IconCar size={20} />,    featured: false, delay: 200 },
                { value: 18,    suffix: "",  label: "Cities Covered",           icon: <IconGlobe size={20} />,  featured: false, delay: 300 },
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
                  { icon: <IconPin size={18} />,       title: "Map every accessible place",   desc: "Building a real-time, community-verified map of accessible restaurants, hospitals, parks, transit stations, and more across Africa." },
                  { icon: <IconCar size={18} />,        title: "Connect with trained drivers", desc: "Our vetted driver network specializes in accessible transport — equipped vehicles, trained in disability awareness, rated by users." },
                  { icon: <IconCommunity size={18} />,  title: "Empower the community",        desc: "Users contribute reviews, report inaccurate info, and help improve data for everyone — making every contribution count." },
                  { icon: <IconTrend size={18} />,      title: "Drive systemic change",        desc: "Our data helps policymakers, city planners, and businesses understand and improve accessibility in the real world." },
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

                <h2 className="sf-section-title">
                  Empowering Accessibility Through Technology
                </h2>

                <p className="sf-section-desc" style={{ marginBottom: 0 }}>
                  Step Free is a graduation project created to support people with disabilities
                  by making accessibility information easier to find. Our platform helps users
                  discover accessible places, transportation options, and essential services,
                  promoting greater independence and inclusion in everyday life. Through
                  technology, we aim to build a more connected and accessible community for
                  everyone.
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
                        <div className="sf-a11y-card-icon">{c.icon}</div>
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

        {/* ══ VOLUNTEER ══ */}
        <section className="sf-section-alt" id="volunteer">
          <div className="container">
            <div className="text-center mb-5">
              <div className="sf-eyebrow">Get Involved</div>
              <h2 className="sf-section-title">Volunteer with Step Free</h2>
              <p className="sf-section-desc mx-auto" style={{ maxWidth: 520 }}>
                You don't need to be a developer to make an impact. There are many ways to contribute to a more accessible world.
              </p>
            </div>
            <div className="row g-3">
              {volunteerRoles.map((role, i) => (
                <div className="col-12 col-sm-6 col-lg-3" key={i}>
                  <div className="sf-value-card" style={{ height: "100%" }}>
                    <div className="sf-value-icon" style={{ background: "var(--primary-soft)", border: "1px solid var(--primary-border)" }}>
                      {role.icon}
                    </div>
                    <div className="sf-value-title">{role.title}</div>
                    <div className="sf-value-desc">{role.desc}</div>
                    <div style={{ marginTop: "auto", paddingTop: 12, fontSize: 12, fontWeight: 600, color: "var(--teal-dark)", display: "flex", alignItems: "center", gap: 5 }}>
                      <IconClock size={12} />
                      {role.commitment}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <a href="#contact" className="sf-hero-cta-primary">Apply to Volunteer</a>
            </div>
          </div>
        </section>

        {/* ══ CONTACT ══ */}
        <section className="sf-section" id="contact">
          <div className="container">
            <div className="row g-5 align-items-start">
              <div className="col-lg-5">
                <div className="sf-eyebrow">Get in Touch</div>
                <h2 className="sf-section-title">We'd love to hear from you</h2>
                <p className="sf-section-desc">
                  Whether you have a question, a partnership proposal, or just want to say hello — our team is happy to help.
                </p>
                <div className="sf-contact-channels">
                  {contactChannels.map((ch, i) => (
                    <a key={i} href={ch.href} className="sf-contact-channel">
                      <div className="sf-contact-channel-icon">{ch.icon}</div>
                      <div>
                        <div className="sf-contact-channel-label">{ch.label}</div>
                        <div className="sf-contact-channel-value">{ch.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="col-lg-7">
                <div className="sf-newsletter-box" style={{ padding: "32px", borderRadius: 16 }}>
                  <div className="sf-newsletter-title" style={{ fontSize: 18, marginBottom: 4 }}>Send us a message</div>
                  <div className="sf-newsletter-sub" style={{ marginBottom: 24 }}>
                    Fill in the form below and we'll get back to you as soon as possible.
                  </div>
                  <ContactForm />
                </div>
              </div>
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
                <a href="/user" className="sf-cta-btn-outline">Create Free Account</a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}