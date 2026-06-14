import styles from "./ReviewsSection.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomOrder, setRandomOrder] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const placesRes = await fetch(`/api/places`);
        const placesData = await placesRes.json();

        if (!placesData.success || !Array.isArray(placesData.data)) {
          throw new Error("Failed to fetch places");
        }

        console.log(`📍 Found ${placesData.data.length} places`);

        let allReviews = [];

        for (const place of placesData.data) {
          try {
            const reviewRes = await fetch(`/api/places/${place._id}/reviews`);
            const reviewData = await reviewRes.json();

            if (reviewData.success && Array.isArray(reviewData.data)) {
              const reviewsWithPlace = reviewData.data.map(review => ({
                ...review,
                placeId: place._id,
                placeName: place.name
              }));
              allReviews = [...allReviews, ...reviewsWithPlace];
            }
          } catch (err) {
            console.warn(`⚠️ Failed to fetch reviews for place ${place._id}`);
          }
        }

        console.log(`📊 Total reviews: ${allReviews.length}`);

        const filteredReviews = allReviews.filter(
          (review) => review.rating >= 4
        );

        console.log(`⭐ Filtered (rating ≥ 4): ${filteredReviews.length}`);

        if (filteredReviews.length === 0) {
          setError("No reviews available with 4+ stars");
          setLoading(false);
          return;
        }

        setReviews(filteredReviews);
        const shuffled = shuffleArray(filteredReviews);
        setRandomOrder(shuffled);
        setError(null);
      } catch (error) {
        console.error("❌ Error fetching reviews:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const shuffleArray = (arr) => {
    const newArr = [...arr];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  };

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setRandomOrder((prev) => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleCardClick = (placeId) => {
    navigate(`/places/${placeId}`);
  };

  if (loading) {
    return (
      <section className={`container ${styles.testimonials}`}>
        <div className="text-center py-5">
          <p>Loading reviews...</p>
        </div>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return (
      <section className={`container ${styles.testimonials}`}>
        <div className="text-center py-5">
          <p style={{ color: "#d9534f" }}>
            {error || "No reviews available"}
          </p>
          <small style={{ color: "#888" }}>
            Make sure:
            <br />
            ✓ API endpoint is correct
            <br />✓ There are reviews with rating ≥ 4
          </small>
        </div>
      </section>
    );
  }

  return (
    <section className={`${styles.testimonials}`}>
      <div className="container">
        <div className={`text-center ${styles.sectionTitle}`}>
          <h2>
            What Our Users{" "}
            <span className={styles.greenText}>Say</span>
          </h2>
         
        </div>

       
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel}>
            {randomOrder.map((review, index) => (
              <div
                key={`${review._id}-${index}`}
                className={styles.reviewCard}
                onClick={() => handleCardClick(review.placeId)}
              >
                <div className={styles.cardContent}>
                
                  <div className={styles.stars}>
                    {"★".repeat(review.rating)}
                  </div>

                  <p className={styles.reviewText}>
                    "{review.comment}"
                  </p>

                 
                  <div className={styles.reviewerName}>
                    <strong>
                      {review.user?.firstName || ""}{" "}
                      {review.user?.lastName || "User"}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
           
            {randomOrder.map((review, index) => (
              <div
                key={`duplicate-${review._id}-${index}`}
                className={styles.reviewCard}
                onClick={() => handleCardClick(review.placeId)}
              >
                <div className={styles.cardContent}>
                  <div className={styles.stars}>
                    {"★".repeat(review.rating)}
                  </div>
                  <p className={styles.reviewText}>
                    "{review.comment}"
                  </p>
                  <div className={styles.reviewerName}>
                    <strong>
                      {review.user?.firstName || ""}{" "}
                      {review.user?.lastName || "User"}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;