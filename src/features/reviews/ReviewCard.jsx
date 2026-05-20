import StarRating from "../../components/common/StarRating";

export default function ReviewCard({ review }) {
  return (
    <div className="card shadow-card border-0 rounded-4 p-3 p-sm-4 hover-lift">
      <div className="d-flex align-items-center gap-3 mb-3">
        <div
          className="rounded-circle overflow-hidden"
          style={{ width: 44, height: 44 }}
        >
          <img
            src={review.avatarSrc}
            alt={review.avatarAlt}
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="fw-semibold mb-1">{review.author}</p>
          <StarRating rating={review.rating} size={14} />
        </div>
      </div>
      <p className="text-secondary fst-italic mb-0">“{review.text}“</p>
    </div>
  );
}