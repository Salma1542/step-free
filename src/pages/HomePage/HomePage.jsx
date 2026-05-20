import styles from "./HomePage.module.css";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { MdElevator, MdAccessible, MdPeople } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";

import ReviewsSection from "../../components/common/ReviewsSection/ReviewsSection";
import LocationIcon from "../../components/common/LocationIcon/LocationIcon";

export default function HomePage() {
  return (
    <div className={styles.homePage}>

      {/* HERO */}
      <section className={`container ${styles.heroSection}`}>
        <div className="row align-items-center">

          <div className={`col-lg-6 ${styles.heroLeft}`}>
            <h1>
              Freedom to Move.
              <br />
              <span>Places That Welcome You.</span>
            </h1>

            <p>
              Discover a world without barriers. Step Free provides real-time
              accessibility data to help you navigate your city with confidence
              and independence.
            </p>

            <button className={styles.mainBtn}>
              Explore Accessible Places <FaArrowRight />
            </button>
          </div>

          <div className="col-lg-6">
            <div className={styles.heroImageBox}>

              <img
                src="../../"
                alt=""
              />

              <div className={styles.floatingCard}>
                <div className={styles.iconBox}>
                  <FaCheckCircle />
                </div>

                <div>
                  <h6>Verified Accessible</h6>
                  <span>Real-time ramp & elevator status</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className={`container ${styles.featuresSection}`}>

        <div className={`text-center ${styles.sectionTitle}`}>
          <h2>Empowering Every Journey</h2>

          <p>
            We've mapped thousands of locations to ensure you have the precise
            information needed for a stress-free outing.
          </p>
        </div>

        {/* ROW 1 */}
        <div className="row g-4">

          {/* BIG CARD — Wide Entrances */}
          <div className="col-lg-8">
            <div className={`${styles.featureCard} ${styles.bigCard}`}>

              <div className={styles.featureText}>
                <div className={styles.smallIcon}>
                  <GiPathDistance />
                </div>

                <h4>Wide Entrances & Ramps</h4>

                <p>
                  Detailed measurements and photos of entryways. We verify
                  width, slope gradients, and door types so you know exactly
                  what to expect before you arrive.
                </p>
              </div>

              <img
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80"
                alt=""
              />
            </div>
          </div>

          {/* DARK CARD — Elevator Status */}
          <div className="col-lg-4">
            <div className={`${styles.featureCard} ${styles.darkCard}`}>

              <div className={`${styles.smallIcon} ${styles.white}`}>
                <MdElevator />
              </div>

              <h4>Elevator Status</h4>

              <p>
                Live updates on elevator operational status in public transit
                and major shopping centers.
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

          {/* LIGHT CARD — Accessible Facilities */}
          <div className="col-lg-4">
            <div className={`${styles.featureCard} ${styles.lightCard}`}>

              <div className={styles.smallIcon}>
                <MdAccessible />
              </div>

              <h4>Accessible Facilities</h4>

              <p>
                Comprehensive guides to accessible restrooms, including grab bar
                positions and turning radii.
              </p>
            </div>
          </div>

          {/* WIDE CARD — Community First */}
          <div className="col-lg-8">
            <div className={`${styles.featureCard} ${styles.bigCard} ${styles.reverseCard}`}>

              <img
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80"
                alt=""
              />

              <div className={styles.featureText}>
                <div className={styles.smallIcon}>
                  <MdPeople />
                </div>

                <h4>Community First</h4>

                <p>
                  Our data is powered by a community of thousands. Real users
                  upload photos and leave reviews based on lived experience,
                  creating a trust-based ecosystem for all.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* PARTNERS */}
      <section className={`text-center ${styles.partnersSection}`}>

        <p>TRUSTED BY GLOBAL ACCESSIBILITY PARTNERS</p>

        <div className={`container ${styles.partners}`}>
          <span>ACCESS ALL</span>
          <span>CITY PATHS</span>
          <span>URBAN EASE</span>
          <span>GLOBAL LINK</span>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* CTA */}
      <section className={`container text-center ${styles.ctaSection}`}>

        <h2>Ready to explore without limits?</h2>

        <p>
          Join 50,000+ users making the world more accessible.
        </p>

        <button className={styles.mainBtn}>
          Get Started For Free
        </button>
      </section>

      <LocationIcon />

    </div>
  );
}
