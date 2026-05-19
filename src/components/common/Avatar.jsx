export default function Avatar({ src, alt, size = "w-10 h-10", rounded = "rounded-full" }) {
  const dimension = size === "w-10 h-10" ? "2.5rem" : size;
  return (
    <div
      className={`${rounded} overflow-hidden bg-light border border-2 border-light flex-shrink-0`}
      style={{ width: dimension, height: dimension }}
    >
      <img className="w-100 h-100 object-cover" src={src} alt={alt} loading="lazy" />
    </div>
  );
}