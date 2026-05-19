import { useState } from "react";
import Icon from "../common/Icon";

export default function AddReviewForm({ currentUser, onSubmit }) {
  const user = currentUser || {
    name: "Demo User",
    avatarSrc: "https://i.pravatar.cc/150?u=demo",
  };

  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!rating) e.rating = "Please select a star rating";
    if (!comment.trim()) e.comment = "Please write a comment";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    onSubmit({
      rating,
      text: comment.trim(),
      author: user.name,
      avatarSrc: user.avatarSrc,
      avatarAlt: user.name,
    });
    setRating(0);
    setComment("");
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="bg-white rounded-4 shadow p-4 p-sm-5 border border-light">
      <div className="d-flex align-items-center gap-3 mb-4">
        <div
          className="rounded-circle overflow-hidden border border-2 border-teal flex-shrink-0"
          style={{ width: "2.5rem", height: "2.5rem" }}
        >
          <img
            src={user.avatarSrc}
            alt={user.name}
            className="w-100 h-100 object-cover"
          />
        </div>
        <div>
          <p className="small fw-semibold text-dark mb-0">
            Reviewing as <span className="text-teal">{user.name}</span>
          </p>
          <p className="small text-muted mb-0" style={{ fontSize: "0.75rem" }}>
            Your review will be visible to others
          </p>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label small fw-medium text-secondary mb-2">
          Your Rating <span className="text-danger">*</span>
        </label>
        <div className="d-flex align-items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              onClick={() => {
                setRating(s);
                setErrors((p) => ({ ...p, rating: undefined }));
              }}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              className="btn btn-link p-0 border-0 transition-all rounded-circle d-flex align-items-center justify-content-center"
              style={{
                fontSize: "2rem",
                lineHeight: 1,
                color: s <= (hovered || rating) ? "#fbbf24" : "#e5e7eb",
                width: "2.5rem",
                height: "2.5rem",
              }}
              aria-label={`Rate ${s} star${s > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
          {(hovered || rating) > 0 && (
            <span className="ms-2 small text-muted fw-medium">
              {["", "Poor", "Fair", "Good", "Great", "Excellent"][
                hovered || rating
              ]}
            </span>
          )}
        </div>
        {errors.rating && (
          <div className="invalid-feedback d-block">{errors.rating}</div>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="reviewComment"
          className="form-label small fw-medium text-secondary mb-2"
        >
          Your Review <span className="text-danger">*</span>
        </label>
        <textarea
          id="reviewComment"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            if (e.target.value.trim())
              setErrors((p) => ({ ...p, comment: undefined }));
          }}
          placeholder="Share your experience with accessibility at this location…"
          rows={4}
          className={`form-control rounded-4 ${errors.comment ? "is-invalid" : ""}`}
          style={{ resize: "none", padding: "0.75rem 1rem", fontSize: "0.875rem" }}
        />
        <div className="d-flex justify-content-between mt-1">
          {errors.comment ? (
            <div className="invalid-feedback d-block">{errors.comment}</div>
          ) : (
            <span />
          )}
          <span className="small text-muted" style={{ fontSize: "0.75rem" }}>
            {comment.length} chars
          </span>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-teal w-100 fw-semibold py-2 rounded-4"
      >
        Publish Review
      </button>

      {submitted && (
        <div className="mt-3 d-flex align-items-center justify-content-center gap-2 text-teal fw-semibold small">
          <Icon
            name="check_circle"
            filled
            className="text-teal"
            style={{ fontSize: "1.5rem" }}
          />
          Review published successfully!
        </div>
      )}
    </div>
  );
}