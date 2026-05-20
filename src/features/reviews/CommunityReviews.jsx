import { useState } from "react";
import ReviewCard from "./ReviewCard";
import StarRating from "../../components/common/StarRating";
import Icon from "../../components/common/Icon";

const ratingBars = [
  { stars: 5, percent: 78 },
  { stars: 4, percent: 16 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

export default function CommunityReviews({ reviews, rating, reviewCount }) {
  const [showForm, setShowForm] = useState(false);
  const [localReviews, setLocalReviews] = useState([]);
  const [newName, setNewName] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [newText, setNewText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const reviewToAdd = {
      id: Date.now(),
      author: newName.trim() || "Anonymous",
      avatarSrc: "https://via.placeholder.com/40/0f766e/ffffff?text=👤",
      avatarAlt: newName.trim() || "Anonymous",
      rating: newRating,
      text: newText.trim(),
    };

    setLocalReviews([reviewToAdd, ...localReviews]);
    setNewName("");
    setNewRating(0);
    setNewText("");
    setShowForm(false);
  };

  const starsForInput = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h3 className="h3 fw-bold mb-0">Community Reviews</h3>
        <div className="d-flex align-items-center gap-2">
          <Icon name="star" filled className="text-warning fs-5" />
          <span className="fw-bold fs-5">{rating}</span>
          <span className="text-muted">· {reviewCount} reviews</span>
        </div>
      </div>

      <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 mb-4 hover-lift">
        <div className="row align-items-center g-4">
          <div className="col-auto">
            <span className="display-3 fw-extrabold lh-1">{rating}</span>
            <div className="mt-2">
              <StarRating rating={Math.round(rating)} size={20} />
            </div>
            <small className="text-muted">out of 5</small>
          </div>
          <div className="col">
            {ratingBars.map((bar) => (
              <div key={bar.stars} className="d-flex align-items-center gap-2 mb-2">
                <span className="fw-medium" style={{ width: 28 }}>{bar.stars} ★</span>
                <div className="progress flex-grow-1" style={{ height: 6 }}>
                  <div
                    className="progress-bar bg-warning"
                    style={{ width: `${bar.percent}%`, borderRadius: "inherit" }}
                    role="progressbar"
                    aria-valuenow={bar.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <small className="text-muted" style={{ width: 32 }}>{bar.percent}%</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        {!showForm ? (
          <button
            className="btn btn-teal fw-semibold px-4 mb-3 hover-lift"
            onClick={() => setShowForm(true)}
          >
            Write a Review
          </button>
        ) : (
          <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 mb-3 hover-lift">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="reviewerName" className="form-label fw-semibold">Your Name</label>
                <input
                  type="text"
                  className="form-control rounded-3"
                  id="reviewerName"
                  placeholder="Your name (optional)"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold d-block">Your Rating</label>
                <div className="d-flex gap-1">
                  {starsForInput.map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="btn p-0 border-0 bg-transparent"
                      onClick={() => setNewRating(star)}
                      aria-label={`${star} star${star > 1 ? "s" : ""}`}
                    >
                      <Icon
                        name="star"
                        filled={star <= newRating}
                        className={star <= newRating ? "text-warning fs-4" : "text-warning fs-4"}
                      />
                    </button>
                  ))}
                  {newRating > 0 && (
                    <small className="ms-2 align-self-center text-muted">{newRating} / 5</small>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="reviewText" className="form-label fw-semibold">Your Review</label>
                <textarea
                  className="form-control rounded-3"
                  id="reviewText"
                  rows="4"
                  placeholder="Share your experience…"
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-teal fw-semibold px-4">Submit Review</button>
                <button
                  type="button"
                  className="btn btn-outline-secondary fw-semibold px-4"
                  onClick={() => {
                    setShowForm(false);
                    setNewRating(0);
                    setNewText("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="d-flex flex-column gap-3">
          {localReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}