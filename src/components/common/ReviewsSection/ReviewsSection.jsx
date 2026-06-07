import styles from "./ReviewsSection.module.css";

const reviews = [
  {
    quote:
      "I can plan outings without calling ahead to ask about ramps. StepFree does all the research for me — it changed how I experience the city.",
    name: "Sarah Ahmed",
    role: "Daily Commuter · Cairo",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "The elevator status feature saves me so much time. Broken lifts at metro stations used to add 20 minutes to every single commute.",
    name: "Mark L.",
    role: "Tech Consultant · Giza",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "The city finally feels built for me too. Exploring new neighbourhoods is exciting again because StepFree scouts everything ahead of time.",
    name: "Elena R.",
    role: "Artist & Traveller",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  },
];

const ReviewsSection = () => {
  return (
    <section className={`container ${styles.testimonials}`}>

      <div className={`text-center ${styles.sectionTitle} revealUp`}>
        <h2>
          People Who Found Their{" "}
          <span className={styles.greenText}>Freedom</span>
        </h2>
      </div>

      <div className="row g-4">
        {reviews.map((review, index) => (
          <div className="col-md-4" key={index}>
            <div
              className={`${styles.testimonialCard} revealUp`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className={styles.quoteBadge}>"</div>

              <div className={styles.stars}>★★★★★</div>

              <p className={styles.quoteText}>"{review.quote}"</p>

              <div className={styles.reviewer}>
                <img
                  src={review.avatar}
                  alt={review.name}
                  className={styles.avatar}
                />
                <div className={styles.reviewerInfo}>
                  <h6>{review.name}</h6>
                  <span>{review.role}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default ReviewsSection;