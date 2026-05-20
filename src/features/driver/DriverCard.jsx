export default function DriverCard({ driver, className }) {
  return (
    <div
      className={`card shadow-card border-0 rounded-4 p-3 d-flex flex-row align-items-center gap-3 transition ${className || ""}`}
    >
      <div
        className="rounded-circle overflow-hidden border border-light"
        style={{ width: 56, height: 56 }}
      >
        <img
          src={driver.avatarSrc}
          alt={driver.avatarAlt}
          className="w-100 h-100 object-fit-cover"
          loading="lazy"
        />
      </div>
      <div className="flex-grow-1 min-w-0">
        <p className="fw-semibold text-truncate mb-1">{driver.name}</p>
        <small className="text-muted">{driver.phone}</small>
      </div>
    </div>
  );
}