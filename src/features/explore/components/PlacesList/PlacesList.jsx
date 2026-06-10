import { useState } from "react";
import PlaceCard from "../PlaceCard/PlaceCard";
import styles from "./PlacesList.module.css";

function PlacesList({ places, selectedPlace, setSelectedPlace, loading }) {
  const [showAll, setShowAll] = useState(false);

  if (loading) {
    return (
      <div className={styles.list}>
        <div className={styles.header}>
          <span className={styles.title}>Nearby Verified Places</span>
          <span className={styles.count}>Loading...</span>
        </div>
        <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>
          Loading places...
        </p>
      </div>
    );
  }

  if (!places || places.length === 0) {
    return (
      <div className={styles.empty}>
        <i className="ti ti-map-pin-off" aria-hidden="true" />
        <p>No places found in this category.</p>
      </div>
    );
  }

  const visiblePlaces = showAll ? places : places.slice(0, 4);

  return (
    <div className={styles.list}>
      <div className={styles.header}>
        <span className={styles.title}>Nearby Verified Places</span>
        <span className={styles.count}>{places.length} found</span>
      </div>

      {visiblePlaces.map((place, index) => (
        <div
          key={place._id}
          data-aos="fade-left"
          data-aos-duration="700"
          data-aos-delay={index * 200}
          data-aos-easing="ease-in-out"
        >
          <PlaceCard
            place={place}
            isSelected={selectedPlace?._id === place._id}
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