
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import styles from "./ExploreMap.module.css";

const placeTypes = {
  Restaurant: { icon: "ti-tools-kitchen-2", color: "#378ADD" },
  Hospital:   { icon: "ti-building-hospital", color: "#D85A30" },
  Mall:       { icon: "ti-building-store", color: "#7F77DD" },
  Hotel:      { icon: "ti-bed", color: "#BA7517" },
  Cafe:       { icon: "ti-coffee", color: "#639922" },
  Bank:       { icon: "ti-building-bank", color: "#1D9E75" },
};

function createCustomIcon(type, isSelected = false) {
  const config = placeTypes[type] || { icon: "ti-map-pin", color: "#888780" };
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
        transition: all 0.2s;
      ">
        <i class="ti ${config.icon}" style="color: white; font-size: ${isSelected ? 24 : 20}px;"></i>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2) - 4],
  });
}

function FlyToPlace({ selectedPlace }) {
  const map = useMap();
  useEffect(() => {
    if (selectedPlace) {
      map.flyTo([selectedPlace.lat, selectedPlace.lng], 15);
    }
  }, [selectedPlace, map]);
  return null;
}

function CustomZoom() {
  const map = useMap();
  return (
    <div className={styles.zoomControls}>
      <button
        className={styles.zoomBtn}
        onClick={() => map.zoomIn()}
        aria-label="Zoom in"
      >
        <i className="ti ti-plus" aria-hidden="true" />
      </button>
      <button
        className={styles.zoomBtn}
        onClick={() => map.zoomOut()}
        aria-label="Zoom out"
      >
        <i className="ti ti-minus" aria-hidden="true" />
      </button>
    </div>
  );
}

function ExploreMap({ places, setSelectedPlace, selectedPlace }) {
  const center = [30.0444, 31.2357];

  return (
    <div
      className={styles.mapBox}
      data-aos="fade-right"
      data-aos-duration="900"
      data-aos-easing="ease-in-out"
    >
      <MapContainer
        center={center}
        zoom={12}
        className={styles.map}
        zoomControl={false}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToPlace selectedPlace={selectedPlace} />
        <CustomZoom />

        {places.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCustomIcon(
              place.type,
              selectedPlace?.id === place.id
            )}
            eventHandlers={{
              click: () => setSelectedPlace(place),
            }}
          >
            <Popup>
              <b>{place.name}</b>
              <br />
              {place.type} · {place.distance}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default ExploreMap;