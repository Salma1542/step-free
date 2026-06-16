import { useEffect, useRef, useState } from "react";
import DriverCard from "../driver/DriverCard";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
function VenueMap({
  lat = 30.0444,
  lng = 31.2357,
  venueName = "Grand Central District",
}) {
  const mapRef = useRef(null);
  const instanceRef = useRef(null);

  const openInMaps = () => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  useEffect(() => {
    let cancelled = false;
    const initMap = async () => {
      const L = await import("leaflet");

      if (cancelled || !mapRef.current) return;

      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 14,
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: false,
        doubleClickZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      const venueIcon = L.icon({
        iconUrl:
          "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
      });

      L.marker([lat, lng], { icon: venueIcon })
        .addTo(map)
        .bindPopup(`<b>${venueName}</b><br>Tap to open in Maps`)
        .openPopup();

      setTimeout(() => {
        map.invalidateSize();
      }, 0);

      instanceRef.current = map;
    };

    initMap();

    return () => {
      cancelled = true;

      if (instanceRef.current) {
        instanceRef.current.remove();
        instanceRef.current = null;
      }
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

export default function DriversSidebar({
  placeId,
  venueLat,
  venueLng,
  venueName,
  venueArea,
  venueCity,
  venueGovernorate,
}) {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
const navigate = useNavigate();

  const selectedArea =
    venueArea || venueCity || venueGovernorate || "";

  const openInMaps = () => {
    window.open(
      `https://www.google.com/maps?q=${venueLat},${venueLng}`,
      "_blank"
    );
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        setLoading(true);

        console.log("PLACE ID:", placeId);
        console.log("VENUE AREA:", venueArea);
        console.log("VENUE CITY:", venueCity);
        console.log("VENUE GOVERNORATE:", venueGovernorate);
        console.log("SELECTED AREA SENT TO API:", selectedArea);

        if (!selectedArea) {
          console.warn("No area found for this venue.");
          setDrivers([]);
          return;
        }

        const apiUrl = `${BASE_URL}/driver/service-areas/search?governorate=${encodeURIComponent(
          selectedArea
        )}`;

        console.log("DRIVERS API URL:", apiUrl);

        const res = await fetch(apiUrl);
        const data = await res.json();

        console.log("DRIVERS RESPONSE:", data);

        if (data.success) {
          setDrivers(data.data || []);
        } else {
          setDrivers([]);
        }
      } catch (err) {
        console.error("Failed to fetch drivers", err);
        setDrivers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, [placeId, selectedArea, venueArea, venueCity, venueGovernorate]);

  return (
    <>
      <div
        className="card border-0 rounded-4 overflow-hidden shadow-card hover-lift mb-4"
        style={{ cursor: "pointer" }}
        onClick={openInMaps}
      >
        <VenueMap
          lat={venueLat}
          lng={venueLng}
          venueName={venueName}
        />

        <div className="card-body d-flex align-items-center justify-content-between py-3 px-3">
          <div>
            <p className="fw-semibold mb-0">
              {venueName || "Grand Central District"}
            </p>

            <small className="text-muted">
              {selectedArea
                ? `Area: ${selectedArea}`
                : "Area not available for this venue"}
            </small>
          </div>
        </div>
      </div>

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
              style={{
                fontSize: 22,
                color: "#fff",
                fontVariationSettings: "'FILL' 1",
              }}
              aria-hidden="true"
            >
              directions_car
            </span>
          </div>

          <h3 className="h5 fw-bold mb-0 text-white">
            Accessible rides
          </h3>
        </div>

        <p
          className="mb-0"
          style={{
            color: "rgba(255,255,255,0.82)",
            lineHeight: 1.6,
            fontSize: 14,
          }}
        >
          Wheelchair-accessible drivers available in this area.
        </p>
      </div>

      <div className="d-flex flex-column gap-3 gap-lg-4">
        {loading ? (
          <div className="text-center py-3 text-muted">
            Loading accessible rides...
          </div>
        ) : drivers.length === 0 ? (
          <div className="text-muted text-center py-3">
            No accessible rides found in {selectedArea || "this area"}
          </div>
        ) : (
drivers.map((item) => {
  const d = item.driver || {};
  const profile = item.driverProfile || {};

  const driverData = {
    _id: d._id,
    name: `${d.firstName || ""} ${d.lastName || ""}`.trim() || "Step Free Driver",
    avatarSrc:
      profile.photoUrl ||
      d.profileImage ||
      "https://res.cloudinary.com/demo/image/upload/default-profile.png",
    phone: d.phone || "",
    city: d.city || "",
    serviceArea: item.governorate,
    averageRating: item.averageRating || 0,
    reviewsCount: item.reviewsCount || 0,
  };

  return (
    <div
      key={item._id}
      onClick={() => navigate(`/drivers/${d._id}`)}
      style={{ cursor: "pointer" }}
    >
      <DriverCard driver={driverData} className="hover-lift" />
    </div>
  );
})
        )}
      </div>
    </>
  );
}