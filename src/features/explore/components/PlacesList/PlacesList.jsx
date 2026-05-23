import { useState } from "react";
import PlaceCard from "../PlaceCard/PlaceCard";
import styles from "./PlacesList.module.css";

function PlacesList({ places, selectedPlace, setSelectedPlace }) {
  const [showAll, setShowAll] = useState(false);

  if (places.length === 0) {
    return (
      <div className={styles.empty}>
        <i className="ti ti-map-pin-off" aria-hidden="true" />
        <p>No places found in this category.</p>
      </div>
    );
  }

  // لو showAll = false يظهر أول 4 بس
  const visiblePlaces = showAll ? places : places.slice(0, 4);

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <span className={styles.title}>Nearby Verified Places</span>
        <span className={styles.count}>{places.length} found</span>
      </div>

    {visiblePlaces.map((place, index) => (
  <div
    key={place.id}
    data-aos="fade-left"
    data-aos-duration="700"
    data-aos-delay={index * 200}
    data-aos-easing="ease-in-out"
  >
    <PlaceCard
      place={place}
      isSelected={selectedPlace?.id === place.id}
      onClick={() => setSelectedPlace(place)}
    />
  </div>
))}

      {places.length > 4 && (
        <button
          className={styles.moreBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "More"}
        </button>
      )}
    </div>
  );
}

export default PlacesList;