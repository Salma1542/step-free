import styles from "./HomePage.module.css";
import { useEffect, useRef } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { MdElevator, MdAccessible, MdPeople } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import heroImg from "../../Assets/Images/heroHome.jpg"
import homeRamp from "../../Assets/Images/homeRamp.jpg"
import homeRealExperience from "../../Assets/Images/homeRealExperience.jpg"
import { useNavigate } from "react-router-dom";
import { 
  HiMagnifyingGlass, 
  HiMapPin,
  HiClipboardDocumentList,
  HiTruck,
  HiUserGroup,
  HiBuildingOffice2
} from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";

import ReviewsSection from "../../components/common/ReviewsSection/ReviewsSection";
import LocationIcon from "../../components/common/LocationIcon/LocationIcon";

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      ".revealUp, .revealLeft, .revealRight"
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function HomePage() {
  useScrollReveal(); 

const navigate = useNavigate();
const { user } = useAuth();

// Helper function: Check login and navigate accordingly
const handleAuthenticatedNavigation = (destination) => {
  if (user) {
    navigate(destination);
  } else {
    navigate("/login");
  }
};

  return (
    <div className={styles.homePage}>

      {/* ── HERO ── */}
      <section className={`container ${styles.heroSection}`}>
        <div className="row align-items-center">

          <div className={`col-lg-6 ${styles.heroLeft}`}>
            <div className={`${styles.heroBadge} revealUp`}>
              <span className={styles.badgeDot}></span>
              5,000+ verified accessible places in Egypt
            </div>

            <h1 className="revealUp">
              Move Freely.
              <br />
              <span>The World, Without Barriers.</span>
            </h1>

            <p className="revealUp">
              StepFree helps you find places with ramps, elevators, and wide
              entrances — every detail you need before you leave home.
            </p>

            <button className={`${styles.mainBtn} revealUp`}  onClick={() => handleAuthenticatedNavigation("/explore")}>
                  Explore Places <FaArrowRight />
            </button>
          </div>

          <div className="col-lg-6 revealRight">
            <div className={styles.heroImageBox}>
              <img
                src={heroImg}
                alt="Person in wheelchair navigating an accessible city space"
              />

            
            </div>

            {/* Stats */}
            <div className={styles.heroStats}>
              <div className={`${styles.statChip} revealUp`}>
                <strong>5K+</strong>
                <span>Registered Places</span>
              </div>
              <div className={`${styles.statChip} revealUp`} style={{ animationDelay: "0.12s" }}>
                <strong>50K+</strong>
                <span>Active Users</span>
              </div>
              <div className={`${styles.statChip} revealUp`} style={{ animationDelay: "0.24s" }}>
                <strong>98%</strong>
                <span>Data Accuracy</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className={styles.partnersSection}>
        <p>TRUSTED PARTNERS</p>
        <div className={`container ${styles.partners}`}>
          <span>MINISTRY OF SOLIDARITY</span>
          <span>ACCESSIBILITY EGYPT</span>
          <span>URBAN EASE</span>
          <span>CITY PATHS</span>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className={`container ${styles.howSection}`}>
        <div className={`text-center ${styles.sectionTitle} revealUp`}>
          <h2>
            <span className={styles.greenText}>Three</span> Simple Steps
         </h2>
          <p>
            No calls, no guesswork — all the information you need before you
            head out.
          </p>
        </div>

        <div className="row g-4">
          {[
            {
              n: "01",
                icon: <HiMagnifyingGlass />,
              title: "Search Your Destination",
              desc: "Enter a neighbourhood or city area and filter by category — restaurant, hospital, hotel, and more.",
            },
            {
              n: "02",
               icon: <HiClipboardDocumentList />,
              title: "See What's Available",
              desc: "Every place shows exactly what's offered — ramps, elevators, wide entrances, accessible bathrooms — with photos and real reviews.",
            },
            {
              n: "03",
               icon: <HiTruck />,
              title: "Book a Specialist Driver",
              desc: "Request a verified driver who can assist you getting in and out of the vehicle, and transport you safely.",
            },
          ].map((s, i) => (
            <div className="col-lg-4" key={i}>
              <div
                className={`${styles.stepCard} revealUp`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className={styles.stepNumber}>{s.n}</div>
                <div className={styles.stepIcon}>{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className={`container ${styles.featuresSection}`}>

        <div className={`text-center ${styles.sectionTitle} revealUp`}>
         <h2> Everything You Need, In{" "} <span className={styles.greenText}>One Place</span>
        </h2>
          <p>
            We cover every accessibility detail so there are no surprises when
            you arrive.
          </p>
        </div>

        {/* ROW 1 */}
        <div className="row g-4">
          <div className="col-lg-8">
            <div className={`${styles.featureCard} ${styles.bigCard} revealLeft`}>
              <div className={styles.featureText}>
                <div className={styles.smallIcon}><GiPathDistance /></div>
                <h4>Ramps & Wide Entrances</h4>
                <p>
                  We document entry details — door width, ramp gradient, and
                  surface type — so you know exactly what to expect before you
                  arrive.
                </p>
              </div>
              <img
                src={homeRamp}
                alt="Accessible ramp"
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div className={`${styles.featureCard} ${styles.darkCard} revealRight`}>
              <div className={`${styles.smallIcon} ${styles.white}`}><MdElevator /></div>
              <h4>Elevator Status</h4>
              <p>
                Live updates on elevator availability in metro stations, malls,
                and hospitals.
              </p>
              <span className={styles.accuracy}>
                <span className={styles.accuracyDot}></span>
                98% Data Accuracy
              </span>
            </div>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="row g-4 mt-0">
          <div className="col-lg-4">
            <div className={`${styles.featureCard} ${styles.lightCard} revealLeft`}>
              <div className={styles.smallIcon}><MdAccessible /></div>
              <h4>Accessible Facilities</h4>
              <p>
                Comprehensive guides to accessible restrooms, dedicated parking,
                and rest areas throughout the city.
              </p>
            </div>
          </div>

          <div className="col-lg-8">
            <div className={`${styles.featureCard} ${styles.bigCard} ${styles.reverseCard} revealRight`}>
              <img
                src={homeRealExperience}
                alt="Community"
              />
              <div className={styles.featureText}>
                <div className={styles.smallIcon}><MdPeople /></div>
                <h4>Powered by Real Experiences</h4>
                <p>
                  Our data comes from people like you — users and place owners
                  sharing genuine experiences so everyone benefits from a
                  trusted, community-driven ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section className={styles.rolesSection}>
        <div className="container">
          <div className={`text-center ${styles.rolesSectionTitle} revealUp`}>
            <span className={styles.rolesSectionTag}>For Everyone</span>
            <h2>Whatever Your Role</h2>
            <p>
              StepFree is built to serve everyone involved in making the world
              more accessible.
            </p>
          </div>

          <div className="row g-4">
            {[
              {
                icon: <HiUserGroup />,
                color: "user",
                title: "The User",
                desc: "Looking for accessible places for yourself or a loved one? Search, filter, and get all the details before you move.",
                features: [
                  "Advanced search & filters",
                  "Interactive map view",
                  "Book a specialist driver",
                  "Rate & review places",
                ],
              },
              {
                icon: <HiTruck />,
                color: "driver",
                title: "The Driver",
                desc: "Can you assist people with mobility needs? Register your details and vehicle, and start receiving ride requests.",
                features: [
                  "Verified profile with documents",
                  "Set your available area",
                  "Passenger ratings & reviews",
                  "Manage your schedule",
                ],
              },
              {
                icon: <HiBuildingOffice2 />,
                color: "owner",
                title: "The Place Owner",
                desc: "Own a restaurant, hospital, or any venue? List it as accessible and let the community find you.",
                features: [
                  "Register place details & location",
                  "Upload photos & documentation",
                  "Appear in search results",
                  "Track reviews & feedback",
                ],
              },
            ].map((r, i) => (
              <div className="col-lg-4" key={i}>
                <div
                  className={`${styles.roleCard} revealUp`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className={`${styles.roleIcon} ${styles["roleIcon_" + r.color]}`}>
                    {r.icon}
                  </div>
                  <h4>{r.title}</h4>
                  <p>{r.desc}</p>
                  <ul className={styles.roleFeatures}>
                    {r.features.map((f, j) => (
                      <li key={j}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <ReviewsSection />

      {/* ── CTA ── */}
      <section className={`container text-center ${styles.ctaSection} revealUp`}>
        <h2>Ready to Explore Without Limits?</h2>
        <p>Join 50,000+ users discovering their city with confidence and independence.</p>
        <button className={styles.mainBtn} onClick={() => handleAuthenticatedNavigation(user ? "/explore" : "/login")}>Get Started — It's Free</button>
      </section>

      <LocationIcon />
    </div>
  );
}