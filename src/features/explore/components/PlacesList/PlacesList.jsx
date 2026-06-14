import { useState } from "react";
import PlaceCard from "../PlaceCard/PlaceCard";
import styles from "./PlacesList.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PlacesList({ places, selectedPlace, setSelectedPlace, loading }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

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

  // Calculate pagination
  const totalPages = Math.ceil(places.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visiblePlaces = places.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle place card click with scroll to top
  const handlePlaceCardClick = (place) => {
    setSelectedPlace(place);
    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
            onClick={() => handlePlaceCardClick(place)}
          />
        </div>
      ))}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <button
            className={`${styles.paginationBtn} ${currentPage === 0 ? styles.disabled : ""}`}
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            title="Previous page"
          >
            <FaChevronLeft /> Previous
          </button>

          <span className={styles.pageInfo}>
            Page {currentPage + 1} of {totalPages}
          </span>

          <button
            className={`${styles.paginationBtn} ${currentPage === totalPages - 1 ? styles.disabled : ""}`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
            title="Next page"
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}

export default PlacesList;