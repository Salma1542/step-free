import { useEffect, useRef } from "react";
import DriverCard from "../driver/DriverCard";

function VenueMap({ lat = 30.0444, lng = 31.2357, venueName = "Grand Central District" }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

  // فتح Google Maps لما يضغط على المابس
  const openInMaps = () => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  useEffect(() => {
    if (instanceRef.current) return;

    import("leaflet").then((L) => {
      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

      const venueIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            width:44px; height:44px;
            background:#2a9d8f;
            border-radius:50%;
            display:flex; align-items:center; justify-content:center;
            border:3px solid white;
            box-shadow:0 2px 12px rgba(42,157,143,0.45);
          ">
            <span class="material-symbols-rounded" style="color:white;font-size:20px;">location_on</span>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -26],
      });

      L.marker([lat, lng], { icon: venueIcon })
        .addTo(map)
        .bindPopup(`<b>${venueName}</b><br>Tap to open in Maps`)
        .openPopup();

      instanceRef.current = map;
    });

    return () => {
      instanceRef.current?.remove();
      instanceRef.current = null;
    };
  }, [lat, lng]);

  return (
    // ✅ overlay شفاف فوق المابس يفتح Google Maps عند الضغط
    <div style={{ position: "relative", height: 220 }}>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
      <div
        onClick={openInMaps}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 999,
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default function DriversSidebar({ drivers, venueLat, venueLng, venueName }) {
  const openInMaps = () => {
    window.open(`https://www.google.com/maps?q=${venueLat},${venueLng}`, "_blank");
  };

  return (
    <>

      {/* ✅ Map Card — أول حاجة فوق كل شيء */}
      <div
        className="card border-0 rounded-4 overflow-hidden shadow-card hover-lift mb-4"
        style={{ cursor: "pointer" }}
      >
        <VenueMap lat={venueLat} lng={venueLng} venueName={venueName} />
        <div className="card-body d-flex align-items-center justify-content-between py-3 px-3">
          <div>
            <p className="fw-semibold mb-0">{venueName ?? "Grand Central District"}</p>
            <small className="text-muted">0.8 mi from city center</small>
          </div>
          <button
            className="btn btn-sm rounded-pill px-3"
            style={{ background: "#edf6f4", color: "#2a9d8f", fontWeight: 600, fontSize: 12 }}
            onClick={openInMaps}
          >
            <Icon name="location_on" className="me-1 small" />
            Open in Maps
          </button>
        </div>
      </div>

      {/* Header Card */}
      <div className="card bg-teal text-white border-0 rounded-4 p-3 p-sm-4 shadow hover-lift mb-4">
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

      {/* Driver Cards */}
      <div className="d-flex flex-column gap-3 gap-lg-4">
        {drivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} className="hover-lift" />
        ))}
      </div>
    </>
  );
}