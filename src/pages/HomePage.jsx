
import { FaArrowRight, FaCheckCircle, FaMapMarkerAlt } from "react-icons/fa";
import { MdElevator, MdAccessible } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";

export default function Home() {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero-section container">
        <div className="row align-items-center">

          <div className="col-lg-6 hero-left">
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

            <button className="main-btn">
              Explore Accessible Places <FaArrowRight />
            </button>
          </div>

          <div className="col-lg-6">
            <div className="hero-image-box">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80"
                alt=""
              />

              <div className="floating-card">
                <div className="icon-box">
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
      <section className="features-section container">

        <div className="section-title text-center">
          <h2>Empowering Every Journey</h2>
          <p>
            We've mapped thousands of locations to ensure you have the precise
            information needed for a stress-free outing.
          </p>
        </div>

        <div className="row g-4">

          <div className="col-lg-8">
            <div className="feature-card big-card">
              <div className="feature-text">
                <div className="small-icon">
                  <GiPathDistance />
                </div>
                <h4>Wide Entrances & Ramps</h4>
                <p>
                  Detailed measurements and photos of entryways. We verify
                  width, slope gradients, and door types.
                </p>
              </div>

              <img
                src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=80"
                alt=""
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="feature-card dark-card">
              <div className="small-icon white">
                <MdElevator />
              </div>
              <h4>Elevator Status</h4>
              <p>
                Live updates on elevator operational status in public transit
                and shopping centers.
              </p>

              <span className="accuracy">98% Data Accuracy</span>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="feature-card small-card">
              <div className="small-icon orange">
                <MdAccessible />
              </div>
              <h5>Accessible Facilities</h5>
              <p>
                Grab bars, restrooms, parking and turning radius info.
              </p>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="feature-card phone-card">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80"
                alt=""
              />

              <div>
                <h5>Community First</h5>
                <p>
                  Real reviews powered by a community of travelers helping each
                  other explore.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* PARTNERS */}
      <section className="partners-section text-center">
        <p>TRUSTED BY GLOBAL ACCESSIBILITY PARTNERS</p>

        <div className="partners container">
          <span>ACCESS ALL</span>
          <span>CITY PATHS</span>
          <span>URBAN EASE</span>
          <span>GLOBAL LINK</span>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials container">

        <div className="section-title text-center">
          <h2>Stories of Independence</h2>
        </div>

        <div className="row g-4">

          <div className="col-md-4">
            <div className="testimonial-card">
              <p>
                Step Free changed how I travel. I no longer fear inaccessible
                places.
              </p>
              <h6>Sarah J.</h6>
              <span>Daily Commuter</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial-card">
              <p>
                Elevator alerts save me 20 minutes on my commute every day.
              </p>
              <h6>Mark L.</h6>
              <span>Tech Consultant</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial-card">
              <p>
                I finally feel like cities are built for me too.
              </p>
              <h6>Elena R.</h6>
              <span>Artist & Traveler</span>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="cta-section container text-center">
        <h2>Ready to explore without limits?</h2>
        <p>
          Join 50,000+ users making the world more accessible.
        </p>

        <button className="main-btn">Get Started For Free</button>
      </section>

      {/* Floating Button */}
      <button className="float-btn">
        <FaMapMarkerAlt />
      </button>

    </div>
  );
}