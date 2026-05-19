import { useEffect } from "react";
import HeroSection from "../../features/places/HeroSection";
import AboutSection from "../../features/places/AboutSection";
import CommunityReviews from "../../features/reviews/CommunityReviews";
import DriversSidebar from "../../features/places/DriversSidebar";
import placeData from "../../features/places/data/placeData.json";
import "./PlacesPage.css";

export default function PlacesPage() {
  const { description, rating, reviewCount, features, reviews, drivers } = placeData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.08), 0 4px 10px -6px rgba(0,0,0,0.04);
        }
      `}</style>

      <div className="container-xl px-3 px-sm-4 py-4 py-lg-5">
        <div className="animate-on-scroll">
          <HeroSection place={placeData} />
        </div>

        <h2 className="display-6 fw-extrabold mb-4 mb-lg-5 animate-on-scroll">
          Accessibility Highlights
        </h2>

        <div className="row g-4 g-lg-5">
          <div className="col-12 col-lg-8 d-flex flex-column gap-4 gap-lg-5">
            <div className="animate-on-scroll hover-lift rounded-4">
              <AboutSection description={description} features={features} />
            </div>
            <div className="animate-on-scroll hover-lift rounded-4">
              <CommunityReviews
                reviews={reviews}
                rating={rating}
                reviewCount={reviewCount}
              />
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="animate-on-scroll hover-lift rounded-4">
              <DriversSidebar drivers={drivers} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}