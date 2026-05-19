export default function Icon({ name, filled = false, className = "", size = "text-xl", ...props }) {
  const style = filled
    ? { fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }
    : {};
  return (
    <span
      className={`material-symbols-outlined leading-none select-none ${size} ${className}`}
      style={style}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
}