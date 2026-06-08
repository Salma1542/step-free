import { useState, useCallback } from "react";
import organizations from "../../features/organizations/data/organizations.json";
import OrganizationCard from "../../features/organizations/OrganizationCard";
import backgroundImage from "../../Assets/Images/background.png";
import styles from "./BlogsPage.module.css";

export default function BlogsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [animating, setAnimating] = useState(false);

  const navigate = useCallback(
    (delta) => {
      if (animating) return;
      setAnimating(true);
      setDirection(delta > 0 ? "right" : "left");
      setTimeout(() => {
        setCurrentIndex(
          (prev) => (prev + delta + organizations.length) % organizations.length
        );
        setDirection(null);
        setAnimating(false);
      }, 280);
    },
    [animating]
  );

  if (!organizations.length) {
    return <div className={styles.emptyState}>No organizations found.</div>;
  }

  return (
    <div className={styles.page}>
      {/* Background image - يفضل inline عشان الصورة متغيرة */}
      <div
        className={styles.bgImage}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className={styles.overlay} aria-hidden="true" />

      {/* تأثيرات الزينة */}
      <div className={styles.decorBlobs} aria-hidden="true">
        <div className={styles.blob1} />
        <div className={styles.blob2} />
      </div>

      {/* المحتوى الرئيسي */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            Organizations Supporting{" "}
            <span className={styles.accent}>People with Special Needs</span>
          </h1>
          <p className={styles.subtitle}>
            Discover trusted organizations and initiatives dedicated to improving
            accessibility, inclusion, and quality of life for people with
            disabilities.
          </p>
        </div>

        {/* السلايدر */}
        <div className={styles.carouselWrap}>
          <button
            onClick={() => navigate(-1)}
            aria-label="Previous organization"
            className={`${styles.navButton} ${styles.navButtonLeft}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                 strokeLinejoin="round" aria-hidden="true">
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* الكارد مع حركة الانتقال */}
          <div
            className={styles.cardContainer}
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? `translateX(${direction === "right" ? "-28px" : "28px"})`
                : "translateX(0)",
            }}
          >
            <OrganizationCard org={organizations[currentIndex]} />
          </div>

          <button
            onClick={() => navigate(1)}
            aria-label="Next organization"
            className={`${styles.navButton} ${styles.navButtonRight}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                 strokeLinejoin="round" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* النقط والعداد */}
        <div className={styles.dotsSection}>
          <div className={styles.dotsContainer}>
            {organizations.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (!animating) setCurrentIndex(idx);
                }}
                aria-label={`Go to organization ${idx + 1}`}
                aria-current={idx === currentIndex ? "true" : undefined}
                className={`${styles.dot} ${
                  idx === currentIndex ? styles.dotActive : styles.dotInactive
                }`}
              />
            ))}
          </div>
          <span className={styles.counter}>
            {currentIndex + 1} / {organizations.length}
          </span>
        </div>
      </div>
    </div>
  );
}