import { useEffect } from "react";
import HeroSection from "../../features/places/HeroSection";
import AboutSection from "../../features/places/AboutSection";
import CommunityReviews from "../../features/reviews/CommunityReviews";
import DriversSidebar from "../../features/places/DriversSidebar";
import placeData from "../../features/places/data/placeData.json";
import styles from "./PlacesPage.module.css"; // نستورد فقط للأنماط المحلية (إن وجدت)

export default function PlacesPage() {
  const { description, rating, reviewCount, features, reviews, drivers } = placeData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // نضيف الكلاس العام "is-visible"
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    // نختار كل العناصر ذات الكلاس العام "animate-on-scroll"
    document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-vh-100 bg-light">
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


