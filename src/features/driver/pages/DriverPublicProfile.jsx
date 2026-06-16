import { useEffect, useState } from "react";
import styles from "../styles/DriverPublicProfile.module.css";
import { listMyAreas } from "../services/driverApi";
import { useNavigate,useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
const BASE_URL =
  import.meta.env.VITE_API_URL?.replace("/api", "") || "http://localhost:3000";

export default function DriverPublicProfile() {
  const { driverId } = useParams();
  const [profile, setProfile] = useState(null);
  const [areas, setAreas] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });

  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviewError, setReviewError] = useState("");
  const navigate = useNavigate();

  const getImageUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${BASE_URL}${url}`;
  };

const getDriverId = (profileData) => {
  if (!profileData) return null;

  // Public profile
  if (profileData.driver) {
    if (typeof profileData.driver === "string") {
      return profileData.driver;
    }

    if (profileData.driver._id) {
      return profileData.driver._id;
    }
  }

  // Logged-in driver profile
  return profileData._id;
};

  const loadReviews = async (driverId) => {
    try {
      if (!driverId) return;

      const res = await fetch(`${BASE_URL}/api/driver-reviews/${driverId}`);
      const data = await res.json();
console.log(data.data);
      if (data.success) {
        setReviews(data.data || []);
        setAverageRating(data.averageRating || 0);
      }
    } catch (error) {
      console.error("Reviews error:", error);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found. Please login again as driver.");
          return;
        }
const profileUrl = driverId
  ? `${BASE_URL}/api/drivers/profile/${driverId}`
  : `${BASE_URL}/api/drivers/profile`;

const res = await fetch(profileUrl, {
  method: "GET",
  headers: driverId
    ? {}
    : {
        Authorization: `Bearer ${token}`,
      },
});

const data = await res.json();

if (!res.ok || !data.success) {
  setError(data.message || "Failed to load driver profile.");
  return;
}

setProfile(data.data);

const currentDriverId = getDriverId(data.data);
await loadReviews(currentDriverId);

        const areasRes = await listMyAreas();
        if (areasRes.success) {
          setAreas(areasRes.data || []);
        }
      } catch (error) {
        console.error(error);
        setError(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setReviewError("");
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setReviewError("Please login first to leave a review.");
        return;
      }

      const driverId = getDriverId(profile);

      if (!driverId) {
        setReviewError("Driver information is not available.");
        return;
      }

      setReviewLoading(true);
      setReviewError("");

      const res = await fetch(`${BASE_URL}/api/driver-reviews/${driverId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: Number(reviewForm.rating),
          comment: reviewForm.comment,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setReviewError(data.message || "Failed to save review.");
        return;
      }

      setReviewForm({
        rating: 5,
        comment: "",
      });

      await loadReviews(driverId);
    } catch (error) {
      setReviewError(error.message || "Something went wrong.");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading driver profile...</div>;
  }

  if (error) {
    return <div className={styles.loading}>{error}</div>;
  }

  if (!profile) {
    return <div className={styles.loading}>Driver profile not found.</div>;
  }

  const driver = profile.driver || {};
  const fullName = `${driver.firstName || ""} ${driver.lastName || ""}`.trim();

  return (
    <div className={styles.page}>
      <div className={styles.profileCard}>
        <div className={styles.container}>
          <aside className={styles.sidebar}>
            <div className={styles.hero}>
              <div className={styles.avatarBox}>
                <img
                  src={
                    getImageUrl(profile.photoUrl) ||
                    driver.profileImage ||
                    "https://res.cloudinary.com/demo/image/upload/default-profile.png"
                  }
                  alt={fullName}
                  className={styles.avatar}
                />
              </div>

              <div className={styles.heroInfo}>
                <span className={styles.badge}>Verified Step Free Driver</span>
                <h1>{fullName || "Step Free Driver"}</h1>
                <p>
                  Accessible ride driver available to support users with
                  mobility needs.
                </p>

                <div className={styles.ratingSummary}>
<strong>{averageRating.toFixed(1)}</strong>

<div className={styles.averageStars}>
  {[1, 2, 3, 4, 5].map((star) => (
    <FaStar
      key={star}
      className={
        star <= Math.round(averageRating)
          ? styles.starActiveSmall
          : styles.starSmall
      }
    />
  ))}
</div>                  <span>Average Rating</span>
                </div>

                <div className={styles.actions}>
                  {driver.phone && (
                    <a href={`tel:${driver.phone}`} className={styles.callBtn}>
                      Call Driver
                    </a>
                  )}

                  {driver.phone && (
                    <a
                      href={`https://wa.me/${driver.phone.replace(/^0/, "20")}`}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.whatsappBtn}
                    >
                      WhatsApp
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => navigate("/driver-form")}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </aside>

          <main className={styles.mainArea}>
            <div className={styles.grid}>
              <section className={styles.section}>
                <h3>Contact Information</h3>

                <div className={styles.infoRow}>
                  <span>Phone</span>
                  <strong>{driver.phone || "Not available"}</strong>
                </div>

                <div className={styles.infoRow}>
                  <span>City</span>
                  <strong>{driver.city || "Not available"}</strong>
                </div>

                <div className={styles.infoRow}>
                  <span>Status</span>
                  <strong>
                    {profile.isActive ? "Available" : "Not Available"}
                  </strong>
                </div>
              </section>

              <section className={styles.section}>
                <h3>Vehicle Information</h3>

                <div className={styles.infoRow}>
                  <span>Vehicle Type</span>
                  <strong>{profile.vehicleType || "Not available"}</strong>
                </div>

                <div className={styles.infoRow}>
                  <span>Model</span>
                  <strong>{profile.vehicleModel || "Not available"}</strong>
                </div>

                <div className={styles.infoRow}>
                  <span>Year</span>
                  <strong>{profile.vehicleYear || "Not available"}</strong>
                </div>

                <div className={styles.infoRow}>
                  <span>License Plate</span>
                  <strong>{profile.licensePlate || "Not available"}</strong>
                </div>
              </section>

              <section className={styles.section}>
                <h3>Accessibility Features</h3>

                <div className={styles.tags}>
                  {profile.accessibilityFeatures?.length ? (
                    profile.accessibilityFeatures.map((feature) => (
                      <span key={feature}>{feature}</span>
                    ))
                  ) : (
                    <p>No accessibility features added.</p>
                  )}
                </div>
              </section>

              <section className={styles.section}>
                <h3>Availability Time</h3>

                <div className={styles.infoRow}>
                  <span>From</span>
                  <strong>{profile.availabilityFrom || "Not available"}</strong>
                </div>

                <div className={styles.infoRow}>
                  <span>To</span>
                  <strong>{profile.availabilityTo || "Not available"}</strong>
                </div>
              </section>
            </div>

            <section className={styles.areasSection}>
              <h3>Available Service Areas</h3>
              <p>
                These are the areas where this driver is currently available.
              </p>

              <div className={styles.areas}>
                {areas.filter((a) => a.active).length > 0 ? (
                  areas
                    .filter((a) => a.active)
                    .map((area) => (
                      <span key={area._id}>{area.governorate}</span>
                    ))
                ) : (
                  <p>No active areas yet.</p>
                )}
              </div>
            </section>

            <div className={styles.documentsGrid}>
              {profile.vehicleImageUrl && (
                <section className={styles.documentCard}>
                  <h3>Vehicle Photo</h3>
                  <p className={styles.sectionIntro}>
                    A clear photo of the vehicle used for accessible rides.
                  </p>
                  <img
                    src={getImageUrl(profile.vehicleImageUrl)}
                    alt="Vehicle"
                  />
                </section>
              )}

              {profile.licenseImageUrl && (
                <section className={styles.documentCard}>
                  <h3>Driver License Photo</h3>
                  <p className={styles.sectionIntro}>
                    The official driver license uploaded for verification.
                  </p>
                  <img
                    src={getImageUrl(profile.licenseImageUrl)}
                    alt="Driver License"
                  />
                </section>
              )}
            </div>

            <section className={styles.reviewsSection}>
              <div className={styles.reviewsHeader}>
                <div>
                  <h3>Driver Reviews</h3>
                  <p>
                    See what users say about this driver's accessibility support
                    and service quality.
                  </p>
                </div>

                <div className={styles.reviewScore}>
                  <strong>{averageRating || "0.0"}</strong>
                  <span>{reviews.length} reviews</span>
                </div>
              </div>

              <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
                <div className={styles.reviewFormRow}>
                 <div className={styles.ratingField}>
  <label>Your Rating</label>

  <div className={styles.starRating}>
    {[1, 2, 3, 4, 5].map((star) => (
      <FaStar
        key={star}
        onClick={() =>
          setReviewForm((prev) => ({
            ...prev,
            rating: star,
          }))
        }
        className={
          star <= reviewForm.rating
            ? styles.starActive
            : styles.star
        }
      />
    ))}
  </div>
</div>

                  <div className={styles.commentField}>
                    <label>Your Review</label>
                    <textarea
                      name="comment"
                      value={reviewForm.comment}
                      onChange={handleReviewChange}
                      placeholder="Share your experience with this driver..."
                      rows="3"
                    />
                  </div>
                </div>

                {reviewError && (
                  <div className={styles.reviewError}>{reviewError}</div>
                )}

                <button
                  type="submit"
                  disabled={reviewLoading}
                  className={styles.submitReviewBtn}
                >
                  {reviewLoading ? "Saving Review..." : "Submit Review"}
                </button>
              </form>

              <div className={styles.reviewsList}>
                {reviews.length > 0 ? (
                  reviews.map((review) => {
                    const reviewerName = `${review.reviewer?.firstName || ""} ${
                      review.reviewer?.lastName || ""
                    }`.trim();

                    return (
                      <div key={review._id} className={styles.reviewCard}>
                        <div className={styles.reviewTop}>
                          <strong>{reviewerName || "User"}</strong>
                          <div className={styles.reviewStars}>
  {[1, 2, 3, 4, 5].map((star) => (
    <FaStar
      key={star}
      className={
        star <= review.rating
          ? styles.starActiveSmall
          : styles.starSmall
      }
    />
  ))}
</div>
                        </div>
                        <p>{review.comment || "No comment provided."}</p>
                      </div>
                    );
                  })
                ) : (
                  <p className={styles.noReviews}>
                    No reviews yet. Be the first to review this driver.
                  </p>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}