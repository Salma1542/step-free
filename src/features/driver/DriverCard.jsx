// export default function DriverCard({ driver, className }) {
//   return (
//     <div
//       className={`card shadow-card border-0 rounded-4 p-3 d-flex flex-row align-items-center gap-3 transition ${className || ""}`}
//     >
//       <div
//         className="rounded-circle overflow-hidden border border-light"
//         style={{ width: 56, height: 56 }}
//       >
//         <img
//           src={driver.avatarSrc}
//           alt={driver.avatarAlt}
//           className="w-100 h-100 object-fit-cover"
//           loading="lazy"
//         />
//       </div>
//       <div className="flex-grow-1 min-w-0">
//         <p className="fw-semibold text-truncate mb-1">{driver.name}</p>
//         <small className="text-muted">{driver.phone}</small>
//       </div>
//     </div>
//   );
// }










export default function DriverCard({ driver, className }) {
  const initials = driver.name
    ? driver.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  const statusLabel =
    driver.status === "busy" ? "On trip" : "Available";
  const statusClass =
    driver.status === "busy" ? "driver-badge busy" : "driver-badge avail";

  return (
    <div
      className={`driver-card card border-0 rounded-4 p-3 d-flex flex-row align-items-center gap-3 ${className || ""}`}
    >
      {/* Avatar */}
      <div
        className="driver-avatar rounded-circle overflow-hidden flex-shrink-0 d-flex align-items-center justify-content-center"
        style={{
          width: 48,
          height: 48,
          border: "2px solid rgba(15,118,110,0.2)",
          background: "var(--bs-teal-light, #f0fdfa)",
        }}
      >
        {driver.avatarSrc ? (
          <img
            src={driver.avatarSrc}
            alt={driver.avatarAlt || driver.name}
            className="w-100 h-100 object-fit-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <span
          className="fw-medium"
          style={{
            fontSize: 15,
            color: "var(--bs-teal)",
            display: driver.avatarSrc ? "none" : "flex",
          }}
        >
          {initials}
        </span>
      </div>

      {/* Info */}
      <div className="flex-grow-1 min-w-0">
        <p className="fw-semibold text-truncate mb-1" style={{ fontSize: 14 }}>
          {driver.name}
        </p>
        <small className="text-muted d-flex align-items-center gap-1">
          <span className="material-symbols-outlined" style={{ fontSize: 13 }}>
            phone
          </span>
          {driver.phone}
        </small>
      </div>

      {/* Status badge */}
      <span className={statusClass}>{statusLabel}</span>
    </div>
  );
}