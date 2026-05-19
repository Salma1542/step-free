import Icon from "./Icon";

export default function StarRating({ rating = 5, maxStars = 5 }) {
  const adjustedFull = Math.round(rating);
  return (
    <span className="d-inline-flex gap-1">
      {[...Array(maxStars)].map((_, i) => (
        <Icon
          key={i}
          name="star"
          filled={i < adjustedFull}
          className={i < adjustedFull ? "text-warning" : "text-warning"}
        />
      ))}
    </span>
  );
}