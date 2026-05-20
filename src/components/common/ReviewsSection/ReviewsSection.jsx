import styles from "./ReviewsSection.module.css";

const reviews = [
  {
    quote:
      "Step Free changed how I travel. I no longer have to call restaurants ahead of time to ask about their entrance. The verified photos tell me everything I need.",
    name: "Sarah J.",
    role: "Daily Commuter",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "The elevator status feature is a lifesaver. Avoiding broken lifts at subway stations saves me 20 minutes on my commute every single day.",
    name: "Mark L.",
    role: "Tech Consultant",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  },
  {
    quote:
      "I finally feel like cities are built for me too. Exploring new neighborhoods is exciting again because Step Free does the hard work of scouting for me.",
    name: "Elena R.",
    role: "Artist & Traveler",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
  },
];

const ReviewsSection = () => {
  return (
    <section className={`container ${styles.testimonials}`}>

      <div className={`text-center ${styles.sectionTitle}`}>
        <h2>Stories of Independence</h2>
      </div>

      <div className="row g-4">
        {reviews.map((review, index) => (
          <div className="col-md-4" key={index}>
            <div className={styles.testimonialCard}>

              <div className={styles.quoteBadge}>99</div>

              <p>"{review.quote}"</p>

              <div className={styles.reviewer}>
                <img src={review.avatar} alt={review.name} className={styles.avatar} />
                <div>
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
