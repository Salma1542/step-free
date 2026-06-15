import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import { useEffect, memo } from "react";
import L from "leaflet";
import styles from "./ExploreMap.module.css";

const placeTypes = {
  Restaurant: { icon: "ti-tools-kitchen-2", color: "#378ADD" },
  Hospital: { icon: "ti-building-hospital", color: "#D85A30" },
  Mall: { icon: "ti-building-store", color: "#7F77DD" },
  Hotel: { icon: "ti-bed", color: "#BA7517" },
  Cafe: { icon: "ti-coffee", color: "#639922" },
  Bank: { icon: "ti-building-bank", color: "var(--primary-color)" },
};

function createCustomIcon(type, isSelected = false) {
  const config = placeTypes[type] || {
    icon: "ti-map-pin",
    color: "#888780",
  };

  const size = isSelected ? 56 : 44;

  return L.divIcon({
    className: "",
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${config.color};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 3px solid white;
      ">
        <i class="ti ${config.icon}" style="color:white;font-size:${
      isSelected ? 24 : 20
    }px;"></i>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

/* ⭐ NEW: Fit Egypt bounds */
function FitEgyptBounds() {
  const map = useMap();

  useEffect(() => {
    const egyptBounds = [
      [31.9167, 24.7000], // north-west
      [22.0000, 36.9000], // south-east
    ];

    map.fitBounds(egyptBounds, {
      padding: [30, 30],
    });
  }, [map]);

  return null;
}

/* Keep your fly-to behavior */
function FlyToPlace({ selectedPlace }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace?.lat && selectedPlace?.lng) {
      map.flyTo([selectedPlace.lat, selectedPlace.lng], 17);
    }
  }, [selectedPlace, map]);

  return null;
}

function CustomZoom() {
  const map = useMap();

  return (
    <div className={styles.zoomControls}>
      <button className={styles.zoomBtn} onClick={() => map.zoomIn()}>
        <i className="ti ti-plus" />
      </button>

      <button className={styles.zoomBtn} onClick={() => map.zoomOut()}>
        <i className="ti ti-minus" />
      </button>
    </div>
  );
}

function NearMeButton({ userLocation, sortByDistance, setSortByDistance }) {
  const map = useMap();

  if (!userLocation) return null;

  const handleNearMe = () => {
    setSortByDistance(true);

    setTimeout(() => {
      map.flyTo([userLocation.lat, userLocation.lng], 17);
    }, 200);
  };

  return (
    <button
      className={`${styles.nearMeBtn} ${
        sortByDistance ? styles.active : ""
      }`}
      onClick={handleNearMe}
    >
      📍
    </button>
  );
}

function ExploreMap({
  places,
  setSelectedPlace,
  selectedPlace,
  loading,
  userLocation,
  sortByDistance,
  setSortByDistance,
}) {
  const center = [26.8206, 30.8025]; // Egypt fallback center

  return (
    <div className={styles.mapBox} style={{ position: "relative" }}>
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: 1000,
          }}
        >
          <div className="spinner-border spinner-border-sm" />
        </div>
      )}

      <MapContainer
        center={center}
        zoom={6}
        className={styles.map}
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* ⭐ IMPORTANT */}
        <FitEgyptBounds />

        <FlyToPlace selectedPlace={selectedPlace} />
        <CustomZoom />

        {userLocation && (
          <>
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={L.icon({
                iconUrl:
                  "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
                shadowUrl:
                  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })}
            >
              <Popup>Your Location</Popup>
            </Marker>

            <Circle
              center={[userLocation.lat, userLocation.lng]}
              radius={500}
              pathOptions={{
                color: "#006d67",
                fill: true,
                opacity: 0.2,
              }}
            />
          </>
        )}

        {places?.map((place) => (
          <Marker
            key={place._id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon(
              place.type,
              selectedPlace?._id === place._id
            )}
            eventHandlers={{
              click: () => setSelectedPlace(place),
            }}
          >
            <Popup>
              <b>{place.name}</b>
              <br />
              {place.type} ·{" "}
              {place.calculatedDistance?.toFixed(1) || place.distance} km
            </Popup>
          </Marker>
        ))}

        {userLocation && (
          <NearMeButton
            userLocation={userLocation}
            sortByDistance={sortByDistance}
            setSortByDistance={setSortByDistance}
          />
        )}
      </MapContainer>
    </div>
  );
}

export default memo(ExploreMap);