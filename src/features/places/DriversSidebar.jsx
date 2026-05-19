// import DriverCard from "../driver/DriverCard";
// import Icon from "../../components/common/Icon";

// export default function DriversSidebar({ drivers }) {
//   return (
//     <>
//      <div className="card border-0 rounded-4 p-4 shadow hover-lift mb-4"
//      style={{
//        background: 'linear-gradient(135deg, #0f766e 0%, #0d6b63 100%)',
//        color: '#fff'
//      }}>
//   <div className="d-flex align-items-center gap-3 mb-3">
//     <div
//       className="d-flex align-items-center justify-content-center rounded-3"
//       style={{
//         width: 48,
//         height: 48,
//         background: 'rgba(255,255,255,0.2)',
//         backdropFilter: 'blur(4px)',
//         boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//       }}
//     >
//       <Icon name="directions_car" filled className="fs-4 text-white" />
//     </div>
//     <h3 className="h5 fw-bold mb-0 text-white">Accessible Rides</h3>
//   </div>
//   <p className="mb-0" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
//     Wheelchair-accessible vehicles ready to take you directly to this venue.
//   </p>
// </div>

//       <div className="d-flex flex-column gap-3 gap-lg-4">
//         {drivers.map((driver) => (
//           <DriverCard key={driver.id} driver={driver} className="hover-lift" />
//         ))}

//         <div className="card border-0 rounded-4 overflow-hidden shadow-card hover-lift">
//           <div className="position-relative" style={{ height: 200 }}>
//             <img
//               src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&h=300&fit=crop"
//               alt="Map"
//               className="w-100 h-100 object-fit-cover opacity-50"
//               loading="lazy"
//             />
//             <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center gap-2">
//               <div
//                 className="bg-white rounded-circle shadow d-flex align-items-center justify-content-center"
//                 style={{ width: 56, height: 56 }}
//               >
//                 <Icon name="location_on" filled className="text-teal fs-3" />
//               </div>
//               <span className="badge bg-white bg-opacity-75 text-dark px-3 py-2 rounded-pill shadow-sm">
//                 View on map
//               </span>
//             </div>
//           </div>
//           <div className="card-body text-center py-3">
//             <p className="fw-medium mb-0">Grand Central District</p>
//             <small className="text-muted">0.8 mi from city center</small>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }








import DriverCard from "../driver/DriverCard";

export default function DriversSidebar({ drivers }) {
  return (
    <>
      {/* Banner */}
      <div
        className="card border-0 rounded-4 p-4 mb-4"
        style={{ background: "var(--bs-teal, #0f766e)", color: "#fff" }}
      >
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="d-flex align-items-center justify-content-center rounded-3 flex-shrink-0"
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              background: "rgba(255,255,255,0.18)",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 22, color: "#fff", fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              directions_car
            </span>
          </div>
          <h3 className="h5 fw-bold mb-0 text-white">Accessible rides</h3>
        </div>
        <p
          className="mb-0"
          style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.6, fontSize: 14 }}
        >
          Wheelchair-accessible vehicles ready to take you directly to this venue.
        </p>
      </div>

      <div className="d-flex flex-column gap-3">
        {/* Section label */}
        <p
          className="mb-0 text-uppercase fw-semibold"
          style={{
            fontSize: 11,
            letterSpacing: "0.06em",
            color: "var(--bs-secondary-color, #6c757d)",
          }}
        >
          Available drivers
        </p>

        {/* Driver cards */}
        {drivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} className="hover-lift" />
        ))}

        {/* Map card */}
        <div
          className="card border-0 rounded-4 overflow-hidden hover-lift"
          style={{ border: "0.5px solid var(--bs-border-color)" }}
        >
          <div className="position-relative" style={{ height: 160 }}>
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=500&h=300&fit=crop"
              alt="Map of Grand Central District"
              className="w-100 h-100 object-fit-cover"
              style={{ filter: "saturate(0.7) brightness(0.92)" }}
              loading="lazy"
            />
            <div
              className="position-absolute"
              style={{
                inset: 0,
                background: "linear-gradient(to bottom, transparent 20%, rgba(0,0,0,0.28))",
              }}
            />
            <div className="position-absolute top-50 start-50 translate-middle d-flex flex-column align-items-center gap-2">
              <div
                className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: 44, height: 44, boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: 22,
                    color: "var(--bs-teal, #0f766e)",
                    fontVariationSettings: "'FILL' 1",
                  }}
                  aria-hidden="true"
                >
                  location_on
                </span>
              </div>
              <span
                className="rounded-pill px-3 py-1"
                style={{
                  background: "rgba(255,255,255,0.9)",
                  color: "#1a1a1a",
                  fontSize: 12,
                  fontWeight: 500,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                }}
              >
                View on map
              </span>
            </div>
          </div>
          <div className="card-body text-center py-3">
            <p className="fw-medium mb-1" style={{ fontSize: 13 }}>
              Grand Central District
            </p>
            <small className="text-muted">0.8 mi from city center</small>
          </div>
        </div>
      </div>
    </>
  );
}