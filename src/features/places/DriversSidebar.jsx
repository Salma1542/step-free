import { useState, useEffect, useRef } from "react";
import DriverCard from "../driver/DriverCard";
import "leaflet/dist/leaflet.css";

/* ---------- خريطة المكان (مع دبوس بدلاً من الدائرة) ---------- */
function VenueMap({ lat = 30.0444, lng = 31.2357, venueName = "Grand Central District" }) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

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

      setTimeout(() => {
        map.invalidateSize();
      }, 0);

      // ✅ أيقونة دبوس (مثل جوجل مابس)
      const venueIcon = L.icon({
iconUrl: "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
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
  }, [lat, lng, venueName]);

  return (
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

/* ---------- المكون الرئيسي ---------- */
export default function DriversSidebar({ placeId, venueLat, venueLng, venueName }) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  const openInMaps = () => {
    window.open(`https://www.google.com/maps?q=${venueLat},${venueLng}`, "_blank");
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      if (!placeId) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/drivers/place/${placeId}`);
        const data = await res.json();
        if (data.success) {
          setDrivers(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch drivers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [placeId]);

  return (
    <>
      {/* Map Card */}
      <div
        className="card border-0 rounded-4 overflow-hidden shadow-card hover-lift mb-4"
        style={{ cursor: "pointer" }}
        onClick={openInMaps}
      >
        <VenueMap lat={venueLat} lng={venueLng} venueName={venueName} />
        <div className="card-body d-flex align-items-center justify-content-between py-3 px-3">
          <div>
            <p className="fw-semibold mb-0">{venueName ?? "Grand Central District"}</p>
            <small className="text-muted">0.8 mi from city center</small>
          </div>
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
        {loading ? (
          <div className="text-center py-3 text-muted">Loading accessible rides...</div>
        ) : drivers.length === 0 ? (
          <div className="text-muted text-center py-3">No accessible rides found nearby</div>
        ) : (
          drivers.map((driver) => (
            <DriverCard key={driver._id} driver={driver} className="hover-lift" />
          ))
        )}
      </div>
    </>
  );
}